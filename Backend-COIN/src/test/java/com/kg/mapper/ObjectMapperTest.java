package com.kg.mapper;

import com.kg.pojo.MyObject;
import com.kg.pojo.MyObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class ObjectMapperTest {

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void test() {
        MyObject mObject = new MyObject();
        mObject.setNodeName("zb");
        mObject.setNodeType("type");
        int insert = objectMapper.insert(mObject);

        System.out.println(insert);
    }

}