package com.kg.controller;

import com.kg.common.ResponseVO;
import com.kg.pojo.MyObject;
import com.kg.service.NodeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/Object")
public class NodeController {

    @Autowired
    NodeService nodeService;

    @PostMapping("/addNode")
    public ResponseVO addNode(@RequestBody MyObject myObject){

        return ResponseVO.buildSuccess(nodeService.addNode(myObject));
    }

    @PostMapping("/delNode/{id}")
    public ResponseVO delNode(@PathVariable("id")int id)
    {
        nodeService.delNode(id);
        return ResponseVO.buildSuccess("删除成功");
    }

    @PostMapping("/updateNode")
    public ResponseVO updateNode(@RequestBody MyObject myObject){
        System.out.println(myObject);
        nodeService.updateNode(myObject);
        return ResponseVO.buildSuccess("更新成功");
    }

    @PostMapping("/searchNode/{id}")
    public ResponseVO searchNode(@PathVariable("id")int id){
        nodeService.searchNode(id);
        return ResponseVO.buildSuccess("查询成功");
    }

    @GetMapping("/getAllObject")
    public ResponseVO getNodeList() {
        return ResponseVO.buildSuccess(nodeService.getAll());
    }
}
