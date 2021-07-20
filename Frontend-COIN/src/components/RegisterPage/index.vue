<!--suppress ALL -->
<template>
    <div class="container">
        <div class="main">
            <!-- 整个注册盒子 -->
            <div class="loginbox">
                <!-- 左侧的注册盒子 -->
                <div class="loginbox-in">
                    <div class="userbox">
                        <input class="user" id="user"  v-model="username" placeholder="用户名" @blur="check_username"/>
                        <span class="error_tip" v-show="error_username">{{error_username_message}}</span>
                    </div>
                    <br>
                    <div class="mailBox">
                        <input class="mail" id="mail" v-model="mail" placeholder="邮箱" @blur="check_mail"></input>
                        <span class="error_tip" v-show="error_mail">{{error_mail_message}}</span>
                    </div>
                    <br>
                    <div class="pwdbox">
                        <input  class="pwd"  id="password" v-model="pwd" type="password"  placeholder="密码" @blur="check_password"/>
                        <span class="error_tip" v-show="error_password">{{error_password_message}}</span>
                    </div>
                    <br>
                    <div class="pwdbox">
                        <input  class="pwd"  id="re_password"  v-model="repwd" type="password"  placeholder="确认密码" @blur="check_confirm_password" />
                        <span class="error_tip" v-show="error_confirm">{{error_confirm_message}}</span>
                    </div>

                    <br>
                    <button type="primary"  class="register_btn" @click="register1">Register</button>
                    <br>
                    <br>
                    <span class="message1">Already Register ? </span><el-link class="tologin" @click="login">Login</el-link>
                </div>

                <!-- 右侧的注册盒子 -->
                <div class="background">
                    <div class="title">Welcome to Our Knowledge Graph</div>
                </div>

            </div>
        </div>
    </div>
</template>


<script>
    import {mapActions} from "vuex";
    export default {
        name: "RegPage",
        data(){
            return{
                username: "",
                mail: "",
                pwd: "",
                repwd: "",
                //提示标记
                error_username:false,
                error_password:false,
                error_confirm:false,
                error_mail: false,
                //错误信息展示
                error_username_message:'',
                error_password_message:'',
                error_confirm_message:'',
                error_mail_message:'',
            }
        },
        methods: {
            ...mapActions([
                'addUser'
            ]),
            check_username: function(){
                let re = /^[a-zA-Z0-9_]{5,20}$/;
                if(re.test(this.username)){
                    this.error_username=false;
                }else {
                    this.error_username_message='请输入5-20个字符的用户名';
                    this.error_username=true;
                }
            },

            check_password: function(){
                let re = /^[a-zA-Z0-9]{8,20}$/;
                if(re.test(this.pwd)){
                    this.error_password=false;
                }else {
                    this.error_password_message='请输入8-20个字符密码';
                    this.error_password=true;
                }
            },

            check_mail: function(){
                let re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
                if(re.test(this.mail)){
                    this.error_mail = false
                }
                else{
                    this.error_mail_message="请输入正确的邮箱格式";
                    this.error_mail = true;
                }
            },
            //检测确认密码
            check_confirm_password:function () {
                if(this.repwd != this.pwd){
                    this.error_confirm=true;
                    this.error_confirm_message='两次输入的密码不一致'
                }else{
                    this.error_confirm=false;
                }
            },
            login(){
                this.$router.push("/login")
            },
            async register1(){
                this.check_username();
                this.check_password();
                this.check_confirm_password();
                this.check_mail();
                if(!(this.error_username==true||this.error_password==true||this.error_confirm==true||this.error_mobile==true)){
                    let newUser = {
                        username: this.username,
                        email: this.mail,
                        password: this.pwd,
                        status: 1
                    }
                    console.log("我是爸爸")
                    console.log(newUser)
                    await this.addUser(newUser)
                    this.$router.push("/login")
                }
            }

        }
    }
</script>

<style scoped>
    .loginbox{
        display:flex;
        position:absolute;
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
        margin-top:70px ;
        height:35px;
        width:200px;
        display: flex;
        flex-direction: column;
        margin-left:25px;
    }
    .pwdbox{
        height:35px;
        width:200px;
        display: flex;
        flex-direction: column;
        margin-left:25px;
    }
    .mailBox{
        height: 35px;
        width: 200px;
        display: flex;
        flex-direction: column;
        margin-left:25px;
    }
    .error_tip{
        color: red;
        position: relative;
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

    input{
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

    input:focus{
        border-bottom:2px solid #445b53;
        background-color:transparent;
        transition: all 0.2s ease-in;
        font-family:sans-serif;
        font-size:15px;
        color:#445b53;
        font-weight:bold;

    }
    input:hover{
        border-bottom:2px solid #445b53;
        background-color:transparent;
        transition: all 0.2s ease-in;
        font-family:sans-serif;
        font-size:15px;
        color:#445b53;
        font-weight:bold;

    }

    input:-webkit-autofill {
        /* 修改默认背景框的颜色 */
        box-shadow: 0 0 0px 1000px  #89AB9E inset !important;
        /* 修改默认字体的颜色 */
        -webkit-text-fill-color: #445b53;
    }

    input:-webkit-autofill::first-line {
        /* 修改默认字体的大小 */
        font-size: 15px;
        /* 修改默认字体的样式 */
        font-weight:bold;
    }
    .register_btn{
        background-color: #5f8276; /* Green */
        width: 150px;
        border: none;
        color: #FAFAFA;
        padding: 10px 22px;
        text-align: center;
        text-decoration: none;
        font-size: 15px;
        border-radius: 20px;
        outline:none;
    }
    .register_btn:hover{
        box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
        cursor: pointer;
        background-color: #0b5137;
        transition: all 0.2s ease-in;
    }
    .tologin{
        color: #ff0e11;
        font-size: 15px;
    }
</style>