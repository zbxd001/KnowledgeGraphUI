import Vue from 'vue'
import VueRouter from "vue-router";
import Login from '../components/LoginPage/index'
import Register from '../components/RegisterPage/index'
import main from '../components/showPage/index'
import addPrimitive from '../components/newPrimitivePage/index'
import addObject from '../components/newObjectPage/index'
import addRelative from '../components/newRelationPage/index'
import writePrimitive from '../components/writePrimitve/index'
import writeObject from '../components/writeRealObject/index'
import writeRelative from '../components/writeRelation/index'
import paint from '../components/firstPage/index'
import userInfo from '../components/userInfo'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect:  "/login"
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/main',
        name: 'main',
        component: main
    },
    {
        path: '/addPrimitive',
        name: 'AddPrimitive',
        component: addPrimitive
    },
    {
        path: '/addObject',
        name: 'AddObject',
        component: addObject
    },
    {
        path: '/addRelation',
        name: 'AddRelation',
        component: addRelative
    },
    {
        path: '/modPrimitive',
        name: 'ModPrimitive',
        component: writePrimitive
    },
    {
        path: '/modObject',
        name: 'ModObject',
        component: writeObject
    },
    {
        path: '/modRelation',
        name: 'ModRelation',
        component: writeRelative
    },
    {
        path: '/paint',
        name: 'Paint',
        component: paint
    },
    {
        path: '/userInfo',
        name: 'UserInfo',
        component: userInfo
    }

]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
