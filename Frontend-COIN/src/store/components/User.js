import {
    registerAPI,
    updateInfoAPI,
    getInfoAPI
} from "../../api/User";

import {Message} from 'element-ui'
import {message} from "ant-design-vue";


const MyUser = {
    state: {
    },
    mutations: {
    },

    actions:{

        // eslint-disable-next-line no-unused-vars
        addUser: async ({state,commit}, data) =>{
            console.log(data)
            const  res = await registerAPI(data)
            if (res) {
                Message.success('添加成功')
            }
            return res
        },

        updateUser: async ({state ,commit},data)=>{
            const res = await updateInfoAPI(data)
            if (res){
                message.success('更新成功')
            }
            return res
        },

        getInfo: async ({stat,commit},id)=>{
            const res = await getInfoAPI(id)
            return res
        }


    }
}
export default MyUser
