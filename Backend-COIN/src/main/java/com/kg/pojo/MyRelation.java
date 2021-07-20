package com.kg.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@TableName("relation")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyRelation implements Serializable {

    @TableId(type = IdType.AUTO)
    private int relationId;

    private int relationStart;

    private int relationEnd;

    private String relationName;

    private String solid;
}
