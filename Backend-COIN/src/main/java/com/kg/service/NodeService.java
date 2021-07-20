package com.kg.service;

import com.kg.pojo.MyObject;

import java.util.List;

public interface NodeService {

    /**
     * 添加节点
     */
    int addNode(MyObject myObject);

    /**
     * 删除节点
     */
    void delNode(int id);

    /**
     * 修改节点
     */
    void updateNode(MyObject myObject);

    /**
     * 查询节点
     */
    MyObject searchNode(int id);

    /**
     * 返回所有节点数据
     * @return List<MyObject></>
     */
    List<MyObject> getAll();
}
