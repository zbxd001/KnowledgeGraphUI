package com.kg.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.kg.pojo.User;

public interface UsersService extends IService<User> {
/**
     * 增加用户
     */
    Long addUser(User user);

    /**
     * 删除用户
     */
    void delUser(int id);

    /**
     * 更新用户信息
     */
    void updateUser(User user);

    /**
     * 获取用户信息
     */
    User getInfo(int id);
}
