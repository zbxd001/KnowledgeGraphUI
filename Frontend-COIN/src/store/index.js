import Vue from 'vue';
import Vuex from 'vuex'
import MyObject from './components/MyObject'
import Primition from './components/Primitive'
import Relation from './components/Relation'
import getters from "./getters"
import User from "./components/User"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        token: '',
        userInfo: JSON.parse(sessionStorage.getItem("userInfo"))
    },
    mutations:{
        // set
        SET_TOKEN: (state, token) => {
            state.token = token
            localStorage.setItem("token", token)
        },
        SET_USERINFO: (state, userInfo) => {
            state.userInfo = userInfo
            sessionStorage.setItem("userInfo", JSON.stringify(userInfo))
        },
        REMOVE_INFO: (state) => {
            state.token = ''
            state.userInfo = {}
            localStorage.setItem("token", '')
            sessionStorage.setItem("userInfo", JSON.stringify(''))
        }
    },
    actions:{
    },
    modules: {
        MyObject,
        Primition,
        Relation,
        User
    },
    getters:{
        getUser: state => {
            return state.userInfo
        }
    }
})