package com.project.gym_management.auth.application.imp;

import com.project.gym_management.auth.application.AuthMailVerification;
import com.project.gym_management.auth.domain.OtpVerificationTable;
import com.project.gym_management.auth.domain.ResetPasswordTable;
import com.project.gym_management.auth.domain.enums.OtpPurpose;
import com.project.gym_management.auth.infrastructure.OtpVerificationRepository;
import com.project.gym_management.auth.infrastructure.PasswordResetRepo;
import com.project.gym_management.common.captcha.CaptchaTokenUtil;
import com.project.gym_management.support.api.SupportMailService;
import com.project.gym_management.user.domain.UserTable;
import com.project.gym_management.user.infrastructure.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthMailVerificationImp implements AuthMailVerification {

    @Value("${client.server}")
    private String client;

    private final UserRepository userRepository;
    private final PasswordResetRepo resetRepo;
    private final SupportMailService supportMailService;
    private final OtpVerificationRepository otpVerificationRepository;

    private static final long OTP_RESEND_COOLDOWN_SECONDS = 60;


    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthMailVerificationImp(UserRepository userRepository, PasswordResetRepo resetRepo, SupportMailService supportMailService, OtpVerificationRepository otpVerificationRepository) {
        this.userRepository = userRepository;
        this.resetRepo = resetRepo;
        this.supportMailService = supportMailService;
        this.otpVerificationRepository = otpVerificationRepository;
    }

    @Override
    public void sendResetPasswordLink(String email) throws MessagingException {
        UserTable user=userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            System.out.println("No user found with this email");
            throw new IllegalArgumentException("No user found with this email");
        };
        String token = CaptchaTokenUtil.generateToken();                         //generate a token
        String tokenHash = passwordEncoder.encode(token);                        //hash token for more secure


        String resetUrl = client + "/reset-password?token=" + token; // pass token to url and not tokenHash
        ResetPasswordTable resetTokenTable= ResetPasswordTable.builder()
                .email(email)
                .user(user)
                .token(tokenHash)
                .expiryTime(LocalDateTime.now().plusMinutes(3))
                .build();
        //make expire time (3 min)
        resetRepo.save(resetTokenTable);                                         // save detail of reset token to db

        String mailBody = "<h3>Reset Password Request</h3>" +
                "<p>Click the button below to reset your password:</p>" +
                "<a href='" + resetUrl + "' " +
                "style='display:inline-block;padding:10px 20px;" +
                "background:#4CAF50;color:#fff;text-decoration:none;" +
                "border-radius:5px;'>Reset Password</a>" +
                "<p>This link is valid for 3 minutes.</p>";

        try{
            supportMailService.generalMailSender(email, "Password Reset OTP", mailBody);
        }catch (MailException e){
            resetRepo.delete(resetTokenTable);

            throw e;
        }
    }

    @Override
    public void sendSignupOtp(UserTable user) {
        SecureRandom random = new SecureRandom();

        int otp = 10000 + random.nextInt(90000);
        String otpString = String.valueOf(otp);

        String otpHash = passwordEncoder.encode(otpString);

        OtpVerificationTable otpTable = OtpVerificationTable.builder()
                .user(user)
                .otpHash(otpHash)
                .purpose(OtpPurpose.SIGNUP)
                .attempts(0)
                .expiresAt(LocalDateTime.now().plusMinutes(3))
                .verified(false)
                .createdAt(LocalDateTime.now())
                .build();

        otpVerificationRepository.save(otpTable);

        String mailBody = "Verify Your Email" +
                "<p>Hi there use the one-time code below to finish setting up your DinoFitClub trainer account.</p>" +
                "<div style='width:100%;display:flex;padding:10px 40px;background-color:#ffcc73;font-size:30px'>"+otpString+"</div>"+
                "<p>This code expires in 3 minutes</p>";

        try{
            supportMailService.generalMailSender(user.getEmail(),
                    "Verify your email to activate your DinoFitClub account", mailBody);
        }catch (MailException e){
            otpVerificationRepository.delete(otpTable);

            throw e;
        }
    }

    @Override
    public void ResendSignupOtp(UserTable user) {
        try{
            this.checkResendCooldown(user);
        }catch(Exception e){
            throw new IllegalStateException(
                    e.getMessage()
            );
        }
        this.sendSignupOtp(user);
    }

    private void checkResendCooldown(UserTable user){
        Optional<OtpVerificationTable> latestOtp =
                otpVerificationRepository
                        .findTopByUser_IdAndPurposeOrderByCreatedAtDesc(
                                user.getId(),
                                OtpPurpose.SIGNUP
                        );
        if (latestOtp.isEmpty()) {
            return; // No previous OTP, so resend is allowed
        }
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime createdAt = latestOtp.get().getCreatedAt();

        long secondsPassed = Duration.between(createdAt, now).getSeconds();

        if (secondsPassed < OTP_RESEND_COOLDOWN_SECONDS) {

            long remainingSeconds =
                    OTP_RESEND_COOLDOWN_SECONDS - secondsPassed;

            throw new IllegalStateException(
                    "Please wait " + remainingSeconds + " seconds before requesting another OTP."
            );
        }
    }

}
