package com.kg.common;

import ch.qos.logback.core.pattern.util.RegularEscapeUtil;
import lombok.Data;

import java.io.Serializable;

@Data
public class ResponseVO implements Serializable {
    private Boolean success;

    private String code;

    private String message;

    private Object content;

    public static ResponseVO buildSuccess(){
        ResponseVO responseVO =new ResponseVO();
        responseVO.setSuccess(true);
        return responseVO;
    }

    public static ResponseVO succ(Object content){
        ResponseVO responseVO = new ResponseVO();
        responseVO.setCode("0");
        responseVO.setContent(content);
        responseVO.setMessage("操作成功");
        return responseVO;
    }

    public static ResponseVO succ(String mess, Object content){
        ResponseVO responseVO = new ResponseVO();
        responseVO.setCode("0");
        responseVO.setContent(content);
        responseVO.setMessage(mess);
        return responseVO;
    }

    public static ResponseVO buildSuccess(Object content){
        ResponseVO responseVO =new ResponseVO();
        responseVO.setContent(content);
        responseVO.setSuccess(true);
        return responseVO;
    }

    public static ResponseVO buildFailure(String message){
        ResponseVO responseVO =new ResponseVO();
        responseVO.setSuccess(false);
        responseVO.setMessage(message);
        System.out.println(message);
        return responseVO;
    }

    public static ResponseVO fail(String mess){
        ResponseVO responseVO  = new ResponseVO();
        responseVO.setCode("-1");
        responseVO.setContent(null);
        responseVO.setMessage(mess);
        return responseVO;
    }

    public static ResponseVO fail(String mess, Object content){
        ResponseVO responseVO = new ResponseVO();
        responseVO.setCode("-1");
        responseVO.setContent(content);
        responseVO.setMessage(mess);
        return responseVO; 
    }
}
