package com.kg.service.serviceImpl;

import com.kg.mapper.ObjectMapper;
import com.kg.pojo.MyObject;
import com.kg.service.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NodeServiceImpl implements NodeService {

    @Autowired
    ObjectMapper objectMapper;


    @Override
    public int addNode(MyObject object) {
        MyObject myObject = new MyObject();
        myObject.setNodeName(object.getNodeName());
        myObject.setNodeType(object.getNodeType());
        myObject.setNodeX(object.getNodeX());
        myObject.setNodeY(object.getNodeY());
        try {
            objectMapper.insert(myObject);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        return myObject.getNodeId();
    }

    @Override
    public void delNode(int id) {
        objectMapper.deleteById(id);
    }

    @Override
    public void updateNode(MyObject myObject) {
        objectMapper.updateById(myObject);
    }

    @Override
    public MyObject searchNode(int id) {
       return objectMapper.selectById(id);
    }

    @Override
    public List<MyObject> getAll() {
        return  objectMapper.selectList(null);
    }

}
