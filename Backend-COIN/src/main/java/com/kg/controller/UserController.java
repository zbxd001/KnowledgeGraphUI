package com.kg.controller;

import com.kg.common.ResponseVO;
import com.kg.common.lang.Result;
import com.kg.pojo.MyObject;
import com.kg.pojo.User;
import com.kg.service.UsersService;
import org.apache.shiro.authz.annotation.RequiresAuthentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author 张博
 * @since 2020-06-02
 */
@RestController
@RequestMapping("/api/User")
public class UserController {

    @Autowired
    UsersService userService;

    @RequiresAuthentication
    @GetMapping("/index")
    public Result index() {
        User user = userService.getById(1L);
        return Result.succ(user);
    }


    @PostMapping("/register")
    public ResponseVO addNode(@RequestBody User user){
        return ResponseVO.buildSuccess(userService.addUser(user));
    }

    @PostMapping("/updateUser")
    public ResponseVO updateInfo(@RequestBody User user){
        System.out.println(user);
        userService.updateUser(user);
        return ResponseVO.buildSuccess("更新成功");
    }

    @GetMapping("/getUser/{id}")
    public ResponseVO getInfo(@PathVariable("id") int id){
        return ResponseVO.buildSuccess(userService.getInfo(id));
    }
}
