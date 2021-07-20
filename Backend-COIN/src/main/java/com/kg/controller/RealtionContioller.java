package com.kg.controller;

import com.kg.common.ResponseVO;
import com.kg.pojo.MyRelation;
import com.kg.service.RelationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/Relation")
public class RealtionContioller {

    @Autowired
    RelationService relationService;

    @PostMapping("/addRelation")
    public ResponseVO addRelation(@RequestBody MyRelation myRelation){
        System.out.println(myRelation);
        return ResponseVO.buildSuccess(relationService.addRelation(myRelation));
    }

    @PostMapping("/delRelation/{id}")
    public ResponseVO delRelation(@PathVariable("id")int id){
        relationService.delRelation(id);
        return ResponseVO.buildSuccess("删除成功");
    }

    @PostMapping("/updateRelation")
    public ResponseVO updateRelation(@RequestBody MyRelation myRelation){
        System.out.println(myRelation);
        relationService.updateRelation(myRelation);
        return ResponseVO.buildSuccess("更新成功");
    }

    @PostMapping("/searchRelation/{id}")
    public ResponseVO searchRelation(@PathVariable("id") int id){
        relationService.searchRelation(id);
        return ResponseVO.buildSuccess("查询成功");
    }

    @GetMapping("/getAllRelation")
    public ResponseVO getAllRelation(){
        return ResponseVO.buildSuccess(relationService.getAllRelation());
    }
}
