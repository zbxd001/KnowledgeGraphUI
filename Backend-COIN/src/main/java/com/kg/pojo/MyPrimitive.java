package com.kg.pojo;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.awt.*;
import java.io.Serializable;

@TableName("primitive")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MyPrimitive implements Serializable {

    @TableId(type = IdType.AUTO)
    private int primitiveId;

    private String primitiveName;

    private String primitiveColor;

    private String primitiveShape;

}
