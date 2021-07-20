import {
    addPrimitiveAPI,
    // eslint-disable-next-line no-unused-vars
    delPrimitiveAPI,
    updatePrimitiveAPI,
    // eslint-disable-next-line no-unused-vars
    searchPrimitiveAPI,
    getAllPrimitiveAPI
} from "../../api/Primitive";

import {Message} from 'element-ui'
import {message} from "ant-design-vue";


const MyPrimitive = {
    state: {
    },
    mutations: {
    },

    actions:{

        // eslint-disable-next-line no-unused-vars
        addPrimitive: async ({state,commit}, data) =>{
            const  res = await addPrimitiveAPI(data)
            if (res) {
                Message.success('添加成功')
            }
            return res
        },

        // eslint-disable-next-line no-unused-vars
        updatePrimitive: async ({state,commit}, data)=>{
            const  res = await updatePrimitiveAPI(data)
            if (res){
                message.success("更新成功")
            }
        },

        // eslint-disable-next-line no-unused-vars
        delPrimitive: async ({state, commit}, id)=>{
            const res = await delPrimitiveAPI(id)
            if (res){
                message.success("删除成功")
            }
        },

        // eslint-disable-next-line no-unused-vars
        getAllPrimitive: async ({state,commit})=>{
            const res = await getAllPrimitiveAPI()
            return res
        }
    }
}
export default MyPrimitive