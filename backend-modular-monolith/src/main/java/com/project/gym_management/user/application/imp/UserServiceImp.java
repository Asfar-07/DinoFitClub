package com.project.gym_management.user.application.imp;


import com.project.gym_management.user.api.response.AccountDTO;
import com.project.gym_management.user.api.response.ProfileDTO;
import com.project.gym_management.user.application.UserService;
import com.project.gym_management.user.domain.UpdateUserPrint;
import com.project.gym_management.user.domain.UserProfileTable;
import com.project.gym_management.user.domain.UserTable;
import com.project.gym_management.user.infrastructure.ProfileRepository;
import com.project.gym_management.user.infrastructure.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImp implements UserService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProfileRepository profileRepository;
    
    public Object[] FetchMe(long id){
        UserTable user = userRepository.findByIdWithProfile(id).orElse(null);
        AccountDTO responseAccount = new AccountDTO();
        if(user != null){
            responseAccount.setName((user.getUsername()));
            responseAccount.setEmail(user.getEmail());
            responseAccount.setPicture(user.getProfile().getAvatar());
            responseAccount.setTrainer(user.getProfile().isTrainer());
            return new Object[]{true,responseAccount};
        }
        return  new Object[]{false};

    }
    public Object[] FetchUser(long id){
        UserTable user = userRepository.findByIdWithProfile(id).orElse(null);
        if(user!= null){
            ProfileDTO resProfile = ProfileDTO.builder()
                    .id(user.getId())
                    .username(user.getUsername())
                    .email(user.getEmail())
                    .createdAt(user.getCreatedAt())
                    .phone_no(user.getProfile().getPhone_on())
                    .about(user.getProfile().getAbout())
                    .address(user.getProfile().getAddress())
                    .dob(user.getProfile().getDob())
                    .avatar(user.getProfile().getAvatar())
                    .gender(user.getProfile().getGender())
                    .available(user.getProfile().isAvailable())
                    .trainer(user.getProfile().isTrainer())
                    .build();
            return new Object[]{true, "User Available",resProfile};
        }else {
            return new Object[]{false, "Not Available"};
        }
    }

    public boolean UpdateUser(long id, UpdateUserPrint update_user){
        UserTable user=userRepository.findByIdWithProfile(id).orElse(null);
        if(user != null){
            
            //filtering received data and set to userdata_from_db for remove vanishing data from DB
            if(update_user.getName() != null && !update_user.getName().equals(user.getUsername())) {
                user.setUsername(update_user.getName());
                userRepository.save(user);
            }
            UserProfileTable profile = getUserProfileTable(update_user, user);
            profileRepository.save(profile);
            return  true;
        }else{
            return false;
        }
    }

    private static UserProfileTable getUserProfileTable(UpdateUserPrint update_user, UserTable user) {
        UserProfileTable profile= user.getProfile();
//            if(update_user.getEmail() != null && !update_user.getEmail().equals(user.getEmail())) {user.setEmail(update_user.getEmail());}
        if(update_user.getAddress() != null && !update_user.getAddress().equals(user.getProfile().getAddress())) {profile.setAddress(update_user.getAddress());}
        if(update_user.getGender() != null && !update_user.getGender().equals(user.getProfile().getGender())) {profile.setGender(update_user.getGender());}
        if(update_user.getPhone_no() != null && !update_user.getPhone_no().equals(user.getProfile().getPhone_on())) {profile.setPhone_on(update_user.getPhone_no());}
        if(update_user.isAvailable() != user.getProfile().isAvailable()) {profile.setAvailable(update_user.isAvailable());}
        if(update_user.getAbout() != null && !update_user.getAbout().equals(user.getProfile().getAbout())) {profile.setAbout(update_user.getAbout());}
        return profile;
    }

    @Transactional
    public boolean DeleteService(long id){
        UserTable userdata_from_db = userRepository.findById(id).orElse(null);
        if(userdata_from_db != null) {
            userRepository.delete(userdata_from_db);
            return true;
        }
        return false;
    }
}
