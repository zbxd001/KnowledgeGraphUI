import {
    addObjectAPI,
    // eslint-disable-next-line no-unused-vars
    delObjectAPI,
    updateObjectAPI,
    // eslint-disable-next-line no-unused-vars
    searchObjectAPI,
    getAllObjectAPI
} from "../../api/Object";

import {Message} from 'element-ui'
import {message} from "ant-design-vue";

const MyObject = {
    state: {
    },
    mutations: {
    },

    actions:{

        // eslint-disable-next-line no-unused-vars
        addObject: async ({state,commit}, data) =>{
            const  res = await addObjectAPI(data)
            console.log(res)
            if (res) {
                Message.success('添加成功')
            }
            return res
        },

        // eslint-disable-next-line no-unused-vars
        updateObject: async ({state,commit}, data) =>{
            const res = await updateObjectAPI(data)
            if (res){
                message.success("更新成功")
            }
        },

        // eslint-disable-next-line no-unused-vars
        delObject: async ({state,commit},data)=>{
            const res = await delObjectAPI(data)
            if (res){
                message.success("删除成功")
            }
        },

        // eslint-disable-next-line no-unused-vars
        getAllObject: async ({state,commit})=> {
            const res = await getAllObjectAPI()
            return res
        }
    }
}
export default MyObject