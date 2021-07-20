package com.kg.service.serviceImpl;

import cn.hutool.crypto.SecureUtil;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.kg.mapper.UsersMapper;
import com.kg.pojo.User;
import com.kg.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class UserServiceImpl extends ServiceImpl<UsersMapper, User> implements UsersService {

    @Autowired
    UsersMapper usersMapper;

    @Override
    public Long addUser(User myUsers) {
        User user = new User();
        user.setId(myUsers.getId());
        user.setUsername(myUsers.getUsername());
        user.setEmail(myUsers.getEmail());
        user.setPassword(SecureUtil.md5(myUsers.getPassword()));
        try{
            usersMapper.insert(user);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return user.getId();
    }

    @Override
    public void delUser(int id) {
        usersMapper.deleteById(id);
    }

    @Override
    public void updateUser(User user) {
        user.setPassword(SecureUtil.md5(user.getPassword()));
        usersMapper.updateById(user);
    }

    @Override
    public User getInfo(int id) {
        return usersMapper.selectById(id);
    }


}
