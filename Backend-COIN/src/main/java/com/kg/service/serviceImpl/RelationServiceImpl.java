package com.kg.service.serviceImpl;

import com.kg.mapper.RelationMapper;
import com.kg.pojo.MyRelation;
import com.kg.service.RelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RelationServiceImpl implements RelationService {

    @Autowired
    RelationMapper relationMapper;

    @Override
    public int addRelation(MyRelation Relation) {
        MyRelation myRelation = new MyRelation();
        myRelation.setRelationName(Relation.getRelationName());
        myRelation.setRelationStart(Relation.getRelationStart());
        myRelation.setRelationEnd(Relation.getRelationEnd());
        myRelation.setSolid(Relation.getSolid());
        try{
            relationMapper.insert(myRelation);
        }catch(Exception e){
            System.out.println(e.getMessage());
        }
        return myRelation.getRelationId();
    }

    @Override
    public void delRelation(int id) {
        relationMapper.deleteById(id);
    }

    @Override
    public void updateRelation(MyRelation myRelation) {
        relationMapper.updateById(myRelation);
    }

    @Override
    public MyRelation searchRelation(int id) {
        return relationMapper.selectById(id);
    }

    @Override
    public List<MyRelation> getAllRelation() {
        return relationMapper.selectList(null);
    }
}
