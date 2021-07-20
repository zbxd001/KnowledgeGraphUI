package com.kg.mapper;


import com.kg.pojo.MyRelation;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class RelationMapperTest {

    @Autowired
    private RelationMapper relationMapper;

    @Test
    public void Test(){

        MyRelation myRelation = new MyRelation();
        myRelation.setRelationName("son");
        myRelation.setRelationEnd(1);
        myRelation.setRelationStart(0);
        myRelation.setSolid("实线");

        int insert = relationMapper.insert(myRelation);
        System.out.println(insert);
    }
}
