package com.kg.service;

import com.kg.pojo.MyPrimitive;

import java.util.List;

public interface PrimitiveService {

    /**
     * 添加图元
     */
    int addPrimitive(MyPrimitive myPrimitive);

    /**
     * 删除图元
     */
    void delPrimitive(int id);

    /**
     * 更新图元
     */
    void updataPrimitive(MyPrimitive myPrimitive);

    /**
     * 查询图元
     */
    MyPrimitive searchPrimitive(int id);

    /**
     * 返回所有图元属性
     * @Return List<MyPrimitive></>
     */

    List<MyPrimitive> getAllPrimitive();
}
