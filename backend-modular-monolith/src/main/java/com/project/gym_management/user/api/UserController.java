package com.project.gym_management.user.api;


import com.project.gym_management.dashboard.api.responsive.AccountCommunitiesDTO;
import com.project.gym_management.dashboard.application.CommunityService;
import com.project.gym_management.user.api.response.AccountDTO;
import com.project.gym_management.user.api.response.ProfileDTO;
import com.project.gym_management.user.application.UserService;
import com.project.gym_management.user.domain.UpdateUserPrint;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/data")
public class UserController {

    @Autowired
    UserService service;

    @Autowired
    CommunityService communityService;

    @GetMapping(value = "/me")
    public ResponseEntity<?> MeUser(HttpServletRequest request){
        String userId = (String) request.getAttribute("userId");
        Object[] response = service.FetchMe(Long.parseLong(userId));
        if(response[0].equals(true)){
            AccountDTO res = (AccountDTO)response[1];
            return ResponseEntity.ok(response[1]);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping(value = "/account")
    public ResponseEntity<ProfileDTO> CheckUser(HttpServletRequest request){

        String userId = (String) request.getAttribute("userId");
        Object[] response=service.FetchUser(Long.parseLong(userId));
        if(response[0].equals(true)){
            return ResponseEntity.ok((ProfileDTO) response[2]);
        }else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping(value = "/communities")
    public ResponseEntity<AccountCommunitiesDTO> Communities(HttpServletRequest request){
        String userId = (String) request.getAttribute("userId");
        try{
            AccountCommunitiesDTO communitiesDTO = communityService.showCommunities(Long.valueOf(userId));
            return ResponseEntity.ok(communitiesDTO);
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

    }

    @PutMapping(value="/update")
    public ResponseEntity<String> UserUpdate(HttpServletRequest request, @RequestBody UpdateUserPrint new_userdata){

        String userId = (String) request.getAttribute("userId");
        boolean response = service.UpdateUser(Long.parseLong(userId),new_userdata);
        if(response) return ResponseEntity.ok("success");
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @DeleteMapping(value="/delete/account")
    public  ResponseEntity<String> DeleteAccount( HttpServletRequest request){

        String userId = (String) request.getAttribute("userId");
        boolean response = service.DeleteService(Long.parseLong(userId));
        if(response) return ResponseEntity.ok("success");
        return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
