package com.kg.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@TableName("object")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyObject implements Serializable {

    @TableId(type = IdType.AUTO)
    private int nodeId;

    private String nodeType;

    private String nodeName;

    private Integer nodeX;

    private Integer nodeY;

}


