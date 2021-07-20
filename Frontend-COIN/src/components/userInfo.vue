
<template>
    <div style="background-color:#FCFCFC;font-family:'宋体';height:1000px;width: 100%">
        <div class="ribbon">
            <a><span style="color: white" @click="Paint">Paint</span></a>
            <a><span style="color: white" @click="Home">Home</span></a>
            <a><span style="color: white" @click="Info">MyInfo</span></a>
        </div>
        <div style="margin-top:35px;margin-left:80px;">
            <el-row :gutter="10">
                <el-col :span="2">
                    <div style="background-color:#FFEBCD;width:60px;height:60px;display:inline-block;border-radius:50%;overflow:hidden;">
                        <el-image :src="src" style="width:60px;height:60px;"></el-image>
                    </div>
                    <div style="margin-top:50px;margin-left:1px;"><el-button type="text" style="font-size:15px;color:#4D4D4D;"  @click="infomationClick()">个人信息<span style="color:#B0E0E6;" v-show="infomationShow" class="el-icon-s-promotion"></span></el-button></div>
                    <div style="margin-top:10px;margin-left:1px;"><el-button type="text" style="font-size:15px;color:#4D4D4D;" @click="passwordClick()">修改密码<span style="color:#B0E0E6;" v-show="passwordShow" class="el-icon-s-promotion"></span></el-button></div>
                </el-col>

                <el-col :span="21">
                    <el-row :gutter="10" style="margin-top:20px;">
                        <el-col :span="2"><div style="text-align:right;"><span>用户名：</span></div></el-col>
                        <el-col :span="5">{{succUserList[1]}}</el-col>
                    </el-row>
                    <!-- 个人信息 -->
                    <el-row v-show="infomationShow">
                        <el-card style="margin-top:30px; background-color: rgba(173,173,173,0.42)">
                            <el-row>
                                <el-col :span="6">
                                    <el-row :gutter="12" style="margin-top:50px;">
                                        <el-col :span="8"><div style="text-align:right;"><span>用户名：</span></div></el-col>
                                        <el-col :span="16">{{succUserList[1]}}</el-col>
                                    </el-row>
                                    <el-row :gutter="12" style="margin-top:50px;">
                                        <el-col :span="8"><div style="text-align:right;"><span>电子邮箱：</span></div></el-col>
                                        <el-col :span="16">{{succUserList[2]}}</el-col>
                                    </el-row>
                                    <el-row :gutter="12" style="margin-top:50px;">
                                        <el-col :span="8"><div style="text-align:right;"><span>图谱：</span></div></el-col>
                                        <el-col :span="16">某某项目</el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="18">
                                    <el-row>
                                        <el-col>
                                            <el-timeline>
                                                <el-timeline-item timestamp="图谱一" placement="top">
                                                    <el-card>
                                                        <div><span><span style="font-family:'宋体';font-size:15px;"><strong>图谱名称</strong></span></span></div>
                                                        <div><span>图谱创建时间</span>/<span>图谱完成时间</span>/<span>角色</span>/<span>周期</span></div>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item timestamp="图谱二" placement="top">
                                                    <el-card>
                                                        <div><span><span style="font-family:'宋体';font-size:15px;"><strong>图谱名称</strong></span></span></div>
                                                        <div><span>图谱创建时间</span>/<span>图谱完成时间</span>/<span>角色</span>/<span>周期</span></div>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item timestamp="图谱三" placement="top">
                                                    <el-card>
                                                        <div><span><span style="font-family:'宋体';font-size:15px;"><strong>图谱名称</strong></span></span></div>
                                                        <div><span>图谱创建时间</span>/<span>图谱完成时间</span>/<span>角色</span>/<span>周期</span></div>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item timestamp="图谱四" placement="top">
                                                    <el-card>
                                                        <div><span><span style="font-family:'宋体';font-size:15px;"><strong>图谱名称</strong></span></span></div>
                                                        <div><span>图谱创建时间</span>/<span>图谱完成时间</span>/<span>角色</span>/<span>周期</span></div>
                                                    </el-card>
                                                </el-timeline-item>
                                                <el-timeline-item timestamp="图谱五" placement="top">
                                                    <el-card>
                                                        <div><span><span style="font-family:'宋体';font-size:15px;"><strong>图谱名称</strong></span></span></div>
                                                        <div><span>图谱创建时间</span>/<span>图谱完成时间</span>/<span>角色</span>/<span>周期</span></div>
                                                    </el-card>
                                                </el-timeline-item>
                                            </el-timeline>
                                        </el-col>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-row>
                    <!-- 修改密码 -->
                    <el-row v-show="passwordShow">
                        <el-card style="margin-top:30px; background-color: rgba(173,173,173,0.42)">
                            <el-form :model="personalForm">
                                <el-row :gutter="12" style="margin-top:20px;">
                                    <el-col :span="6">
                                        <div style="text-align:right;"><span>用户名：</span></div>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="account">
                                            <el-input type="text" v-model="personalForm.username" placeholder="请输入您的用户名" ></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="12" style="margin-top:1px;">
                                    <el-col :span="6">
                                        <div style="text-align:right;"><span>邮箱：</span></div>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="phone_num">
                                            <el-input type="text" v-model="personalForm.email" placeholder="绑定的邮箱" ></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="12" style="margin-top:1px;">
                                    <el-col :span="6">
                                        <div style="text-align:right;"><span>密码：</span></div>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="password1">
                                            <el-input type="password" show-password v-model="personalForm.password1" placeholder="请输入新的密码" ></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="12" style="margin-top:1px;">
                                    <el-col :span="6">
                                        <div style="text-align:right;"><span>确认密码：</span></div>
                                    </el-col>
                                    <el-col :span="5">
                                        <el-form-item prop="password2">
                                            <el-input type="password" show-password v-model="personalForm.password2" placeholder="请再次输入新的密码" ></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="12" style="margin-top:10px;">
                                    <el-col :span="17" style="text-align:center;">
                                        <el-button type="primary" plain round size="medium" @click="submit()">修改</el-button>
                                    </el-col>
                                </el-row>
                            </el-form>
                        </el-card>
                    </el-row>
                </el-col>
            </el-row>
        </div>

        <div>

        </div>
    </div>
</template>
<script>

    import yu from '../image/Info.jpg'
    import {mapActions} from "vuex";
    import { getSuccUserList, newSuccUser} from "../tool/MapHelper";

    export default {
        data(){
            return {
                src:yu,
                levelName:'',
                isCollapse:false,
                infomationShow:true,
                passwordShow:false,
                isDisabled:false,
                time:60,
                personalForm:{
                    username:"",
                    email:"",
                    password1:"",
                    password2:"",
                },
                succUserList: getSuccUserList()
            }
        },
        methods:{
            ...mapActions([
                'getInfo',
                'updateUser'
            ]),
            Info(){
                this.$router.push("/userInfo")
            },
            Paint(){
                this.$router.push("/paint")
            },
            Home(){
                this.$router.push("/main")
            },
            infomationClick(){    //个人信息事件
                this.infomationShow = true
                this.passwordShow = false
            },

            passwordClick(){     //密码事件
                this.infomationShow = false
                this.passwordShow = true
            },
            submit(){  //提交
                if(this.personalForm.account === ""){
                    this.$message.warning("用户名不能为空")
                }else if(this.personalForm.email === ""){
                    this.$message.warning("邮箱不能为空")
                }else if(this.personalForm.password1 === ""){
                    this.$message.warning("密码不能为空")
                }else if(this.personalForm.password2 === ""){
                    this.$message.warning("密码不能为空")
                }else{
                    if(this.personalForm.password1 === this.personalForm.password2){
                        this.$message.success("修改成功")
                        // const params = {
                        //     account:this.personalForm.account,
                        //     phone_num:this.personalForm.phone_num,
                        //     password1:this.personalForm.password1,
                        //     password2:this.personalForm.password2,
                        //     verification:this.personalForm.verification,
                        // }
                        // console.log(params)
                        // this.$http.post('',params).then(res => {
                        //     console.log(res)
                        // })
                    }else{
                        this.$message.warning("两次输入的密码不一致,请重新输入")
                    }

                }
                let updateUser1 = {
                    id: this.succUserList[0],
                    username: this.personalForm.username,
                    email: this.personalForm.email,
                    password: this.personalForm.password1
                };
                this.updateUser(updateUser1);
            },

        },
    }
</script>

<style>
    .name{ text-align: right; }
    .value{ text-align: left; }
    .ribbon {
        display: flex;
        justify-content: center;
        position: absolute;
        right: 700px;
        top: 0px;
        margin: auto;
    }

    .ribbon:after,
    .ribbon:before {
        margin-top: 0.5em;
        content: "";
        display: flex;
        border: 1.5em solid rgba(33, 47, 214, 0.38);
    }

    .ribbon:after {
        border-right-color: transparent;
    }

    .ribbon:before {
        border-left-color: transparent;
    }

    .ribbon a:link,
    .ribbon a:visited {
        color: rgb(255, 255, 255);
        text-shadow: 0 0 20px #fdec84,
        10px -10px 30px #ffae35,
        20px -20px 40px #ec760c;
        text-decoration: none;
        height: 3.5em;
        overflow: hidden;
    }

    .ribbon span {
        background: rgba(33, 47, 214, 0.38);
        display: inline-block;
        line-height: 3em;
        padding: 0 1.5em;
        margin-top: 0.5em;
        position: relative;
        -webkit-transition: background-color 0.2s, margin-top 0.2s;
        /* Saf3.2+, Chrome */
        -moz-transition: background-color 0.2s, margin-top 0.2s;
        /* FF4+ */
        -ms-transition: background-color 0.2s, margin-top 0.2s;
        /* IE10 */
        -o-transition: background-color 0.2s, margin-top 0.2s;
        /* Opera 10.5+ */
        transition: background-color 0.2s, margin-top 0.2s;
    }

    .ribbon a:hover span {
        background: #FFD204;
        margin-top: 0;
    }

    .ribbon span:before {
        content: "";
        position: absolute;
        top: 3em;
        left: 0;
        border-right: 0.5em solid #9B8651;
        border-bottom: 0.5em solid #fff;
    }

    .ribbon span:after {
        content: "";
        position: absolute;
        top: 3em;
        right: 0;
        border-left: 0.5em solid #9B8651;
        border-bottom: 0.5em solid #fff;
    }

</style>
