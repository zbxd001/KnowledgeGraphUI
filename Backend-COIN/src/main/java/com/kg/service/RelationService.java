package com.kg.service;

import com.kg.pojo.MyRelation;

import java.util.List;

public interface RelationService {
    /**
     * 增加关系
     */
    int addRelation(MyRelation myRelation);

    /**
     * 删除关系
     */
    void delRelation(int id);

    /**
     * 更新关系
     */
    void updateRelation(MyRelation myRelation);

    /**
     * 查询关系
     */
    MyRelation searchRelation(int id);

    /**
     * 返回所有关系属性
     */
    List<MyRelation> getAllRelation();
}
