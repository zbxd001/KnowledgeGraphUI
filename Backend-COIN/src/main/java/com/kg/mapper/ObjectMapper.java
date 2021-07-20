package com.kg.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.kg.pojo.MyObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public interface ObjectMapper extends BaseMapper<MyObject> {
}
