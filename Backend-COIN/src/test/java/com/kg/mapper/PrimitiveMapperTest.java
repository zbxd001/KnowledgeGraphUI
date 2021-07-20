package com.kg.mapper;

import com.baomidou.mybatisplus.annotation.TableId;
import com.kg.pojo.MyPrimitive;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PrimitiveMapperTest {

    @Autowired
    private PrimitiveMapper primitiveMapper;

    @Test
    public void test(){

        MyPrimitive myPrimitive = new MyPrimitive();
        myPrimitive.setPrimitiveName("test");
        myPrimitive.setPrimitiveColor("green");
        myPrimitive.setPrimitiveShape("circle");
        int insert = primitiveMapper.insert(myPrimitive);

        System.out.println(insert);

    }
}
