package com.kg.service.serviceImpl;

import com.kg.mapper.PrimitiveMapper;
import com.kg.pojo.MyPrimitive;
import com.kg.service.PrimitiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrimitiveServiceImpl implements PrimitiveService {

    @Autowired
    PrimitiveMapper primitiveMapper;

    @Override
    public int addPrimitive(MyPrimitive Primitive) {
        MyPrimitive myPrimitive = new MyPrimitive();
        myPrimitive.setPrimitiveShape(Primitive.getPrimitiveShape());
        myPrimitive.setPrimitiveColor(Primitive.getPrimitiveColor());
        myPrimitive.setPrimitiveName(Primitive.getPrimitiveName());
        primitiveMapper.insert(myPrimitive);
        return myPrimitive.getPrimitiveId();
    }

    @Override
    public void delPrimitive(int id) {
        primitiveMapper.deleteById(id);
    }

    @Override
    public void updataPrimitive(MyPrimitive myPrimitive) {
        primitiveMapper.updateById(myPrimitive);
    }

    @Override
    public MyPrimitive searchPrimitive(int id) {
        return primitiveMapper.selectById(id);
    }

    @Override
    public List<MyPrimitive> getAllPrimitive() {
        return primitiveMapper.selectList(null);
    }
}
