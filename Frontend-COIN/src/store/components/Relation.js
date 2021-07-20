import {
    addRelationAPI,
    // eslint-disable-next-line no-unused-vars
    delRelationAPI,
    // eslint-disable-next-line no-unused-vars
    updateRelationAPI,
    // eslint-disable-next-line no-unused-vars
    searchRelationAPI,
    getAllRelationAPI
} from "../../api/Relation";

import {Message} from 'element-ui'
import {message} from "ant-design-vue";


const MyRelation = {
    state: {
    },
    mutations: {
    },

    actions:{

        // eslint-disable-next-line no-unused-vars
        addRelation: async ({state,commit}, data) =>{
            console.log(data)
            const  res = await addRelationAPI(data)
            console.log(res)
            if (res) {
                Message.success('添加成功')
            }
            return res
        },

        // eslint-disable-next-line no-unused-vars
        updateRelation: async ({state,commit},data) =>{
            console.log("测试导出数据")
            console.log(data)
            const res = await updateRelationAPI(data)
            if (res){
                message.success("更新成功")
            }
        },

        // eslint-disable-next-line no-unused-vars
        delRelation: async({state,commit},id)=>{
            const res = await delRelationAPI(id)
            if(res){
                message.success("删除成功")
            }
        },

        // eslint-disable-next-line no-unused-vars
        getAllRelation: async({state,commit})=>{
            const res = await getAllRelationAPI()
            return res
        }

    }
}
export default MyRelation