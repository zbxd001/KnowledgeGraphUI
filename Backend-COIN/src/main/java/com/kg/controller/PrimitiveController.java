package com.kg.controller;

import com.kg.common.ResponseVO;
import com.kg.pojo.MyPrimitive;
import com.kg.service.PrimitiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/primitive")
public class PrimitiveController {

    @Autowired
    PrimitiveService primitiveService;

    @PostMapping("/add_primitive")
    public ResponseVO addPrimitive(@RequestBody MyPrimitive myPrimitive){
        return  ResponseVO.buildSuccess(primitiveService.addPrimitive(myPrimitive));
    }

    @PostMapping("/delPrimitive/{id}")
    public ResponseVO delPrimitive(@PathVariable("id")int id){
        primitiveService.delPrimitive(id);
        return ResponseVO.buildSuccess("删除成功");
    }

    @PostMapping("/updatePrimitive")
    public ResponseVO updatePrimitive(@RequestBody MyPrimitive myPrimitive){
        System.out.println(myPrimitive);
        primitiveService.updataPrimitive(myPrimitive);
        return ResponseVO.buildSuccess("更新成功");
    }

    @PostMapping("/searchPrimitive/{id}")
    public ResponseVO searchPrimitive(@PathVariable("id")int id){
        return ResponseVO.buildSuccess(primitiveService.searchPrimitive(id));
    }

    @GetMapping("/getAllPrimitive")
    public ResponseVO getAllPrimitive(){
        return ResponseVO.buildSuccess(primitiveService.getAllPrimitive());
    }

}
