package com.project.gym_management.support.application;

import com.project.gym_management.support.api.SupportMailService;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSendException;

@Service
public class SupportMailServiceImpl implements SupportMailService {

    private final Resend resend;

    public SupportMailServiceImpl(
            @Value("${mail.resend.api.key}") String apiKey
    ) {
        this.resend = new Resend(apiKey);
    }

    @Override
    public void generalMailSender(
            String email,
            String subject,
            String body
    ) throws MailException {

        try {

            CreateEmailOptions params = CreateEmailOptions.builder()
                    .from("DinoFitClub <noreply@asfarmuhammed.space>")
                    .to(email)
                    .subject(subject)
                    .html(body)
                    .build();

            resend.emails().send(params);

        } catch (ResendException e) {

            throw new MailSendException(
                    "Failed to send email",
                    e
            );
        }
    }
}