<template id="temp">
  <div class="back">

    <div class="topbox">

      <div class="ribbon">
        <a><span style="color: white" @click="Paint">Paint</span></a>
        <a><span style="color: white" @click="Home">Home</span></a>
        <a><span style="color: white" @click="Info">MyInfo</span></a>
      </div>
      <h1 class="msg2">智慧图谱导入</h1>
      <a href="/">
        <input type="button" class="Logout" value="Logout" />
      </a>
    </div>

    <el-input
      id="inputtext"
      type="textarea"
      :rows="20"
      placeholder="请输入内容"
      style="padding-left: 350px"
      v-model="textarea"
    >
    </el-input>
    <!-- 读入按钮 -->
    <p></p>
    <el-button type="primary" plain @click="draw" id="drawbutton">
      绘图
    </el-button>
  </div>
</template>

<script>
import { setData } from "./../../tool/MapHelper";

export default {
  name: "FirstPage",
  data() {
    return {
      textarea: "",
    };
  },
  methods: {
    Info(){
      this.$router.push("/userInfo")
    },
    Paint(){
      this.$router.push("/paint")
    },
    Home(){
      this.$router.push("/main")
    },
    draw() {
      setData(this.textarea);
      this.$router.push("/main");
    },

  },
  // mounted() {
  //   this.$router.push("/main");
  // },
};
</script>

<style>
  .msg2{
    position: relative;
    top:55px;
    font: 600 50px "Comic Sans MS";
    color: #000000;
  }


#inputtext {
  width: 1000px;
  position: relative;
  top: 100px;
  background-color: rgba(43, 43, 43, 0.25);
  background-attachment: fixed;
  -webkit-text-fill-color: black;
}
#drawbutton {
  position: relative;
  top: 100px;
  right: 20px;
  background-image: linear-gradient(
    to right,
    #e4afcb 0%,
    #b8cbb8 0%,
    #6f7a6f 0%,
    #e2c58b 30%,
    #c2ce9c 64%,
    #7edbdc 100%
  );
  color: #0a106e;
}
.back {
  background-image: url("背景.jpg");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover;
  background-position: center;
}
.logout {
  background-image: linear-gradient(
    to right,
    #e4afcb 0%,
    #b8cbb8 0%,
    #6f7a6f 0%,
    #e2c58b 30%,
    #c2ce9c 64%,
    #7edbdc 100%
  );
}
</style>