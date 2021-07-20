<template>
    <div class="main">
        <!-- 整个注册盒子 -->
        <div class="loginbox">
            <!-- 左侧的注册盒子 -->
            <div class="loginbox-in">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item class="userbox">
                        <el-input  class="input1"  v-model="ruleForm.username" placeholder="用户名"/>
                    </el-form-item>
                    <br>
                    <el-form-item class="pwdbox">
                        <el-input  class="input1"  v-model="ruleForm.password" type="password"  placeholder="密码"/>
                    </el-form-item>
                    <br>
                    <button type="primary"  class="login_btn" @click.prevent="login('ruleForm')">Login</button>
                    <br>
                    <br>
                    <span class="message1">Not Register ? </span><el-link class="toregister" @click="Register">Register</el-link>
                </el-form>
            </div>

            <!-- 右侧的注册盒子 -->
            <div class="background">
                <div class="title">Welcome to Our Knowledge Graph</div>
            </div>

        </div>
    </div>
</template>


<script>
    import {getSuccUser, getSuccUserList, newSuccUser,clearLoginList} from "../../tool/MapHelper";

    export default {
        name: "LoginPage",
        data() {
            return {

                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请选择密码', trigger: 'change' }
                    ]
                },
                 succUserList: getSuccUserList(),
            };
        },
        methods:
            {
                 login(formName){
                    this.$refs[formName].validate((valid)=> {
                        if (valid) {
                            this.$axios.post('/login', this.ruleForm).then(res => {
                                console.log(res.data)
                                const jwt = res.headers['authorization']
                                const userInfo = res.data.data

                                newSuccUser(userInfo.id,userInfo.username,userInfo.email)
                                console.log("查看用户登录信息")
                                let user = this.succUserList1[1]
                                console.log(user)
                                this.$store.commit("SET_TOKEN", jwt)
                                this.$store.commit("SET_USERINFO", userInfo)

                                console.log(this.$store.getters.getUser)

                                this.$router.push("/main")
                            })
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                    // this.$emit('login')
                },
                Register(){
                    this.$router.push("/register")
                    // this.$emit('Register')
                }
            },
        mounted() {
            this.succUserList1 = getSuccUserList();
        },
    }
</script>

<style>
    body{
        margin: 0px;
        padding: 0px;
        border:0px;
    }
    .main{
        background:url("背景.jpg");
        width:100%;
        height:100%;
        position:fixed;
        background-size:cover;
        background-position: center;
    }
    .loginbox{
        display:flex;
        position: absolute;
        width:800px;
        height:400px;
        top:40%;
        left:50%;
        transform:translate(-50%,-50%);
        box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
    }
    .loginbox-in{
        background-color:#89AB9E;
        width:240px;
    }
    .userbox{
        margin-top:120px ;
        height:30px;
        width:200px;
        display: flex;
        margin-left:25px;
    }
    .pwdbox{
        height:30px;
        width:200px;
        display: flex;
        margin-left:25px;
    }

    .background{
        width:570px;
        background-image:url('登陆页面图.jpg');
        background-size:cover;
        font-family:sans-serif;
    }
    .title{
        margin-top:320px;
        font-weight:bold;
        font-size:30px;
        color: white;
        text-shadow: 0 0 20px #fdec84,
        10px -10px 30px #ffae35,
        20px -20px 40px #ec760c,
        -20px -60px 50px #cd4607,
        0px -80px 60px #973717,
        10px -40px 70px #451b0e;

    }
    .title:hover{
        font-size:21px;
        transition: all 0.4s ease-in-out;
        cursor: pointer;
    }

    .input1{
        outline-style: none ;
        border: 0;
        border-bottom:1px solid #E9E9E9;
        background-color:transparent;
        height:20px;
        font-family:sans-serif;
        font-size:15px;
        color:#445b53;
        font-weight:bold;
    }
    /* input::-webkit-input-placeholder{
       color:#E9E9E9;
    } */
    .input1:focus{
        border-bottom:2px solid #445b53;
        background-color:transparent;
        transition: all 0.2s ease-in;
        font-family:sans-serif;
        font-size:15px;
        color:#445b53;
        font-weight:bold;

    }
    .input1:hover{
        border-bottom:2px solid #445b53;
        background-color:transparent;
        transition: all 0.2s ease-in;
        font-family:sans-serif;
        font-size:15px;
        color:#445b53;
        font-weight:bold;

    }

    .input1:-webkit-autofill {
        /* 修改默认背景框的颜色 */
        box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
        /* 修改默认字体的颜色 */
        -webkit-text-fill-color: #445b53;
    }

    .input1:-webkit-autofill::first-line {
        /* 修改默认字体的大小 */
        font-size: 15px;
        /* 修改默认字体的样式 */
        font-weight:bold;
    }

    .login_btn{
        width: 150px;
        background-color: #5f8276; /* Green */
        border: none;
        color: #FAFAFA;
        padding: 10px 22px;
        text-align: center;
        text-decoration: none;
        font-size: 15px;
        border-radius: 20px;
        outline:none;
    }

    .login_btn:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
        background-color: #0b5137;
        transition: all 0.2s ease-in;
    }
    .message1{
        margin-top: 15px;
        color: #fff;
        font-size: 15px;
    }
    .toregister{
        color: #ff0e11;
        font-size: 15px;
    }
</style>