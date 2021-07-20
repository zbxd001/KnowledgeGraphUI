<template>
  <div class="background1">
      <search-node></search-node>
      <smart-search></smart-search>
      <div class="topbox">

          <div class="ribbon">
              <a><span style="color: white" @click="Paint">Paint</span></a>
              <a><span style="color: white" @click="Home">Home</span></a>
              <a><span style="color: white" @click="Info">MyInfo</span></a>
          </div>
          <h1 class="msg">智慧图谱展示</h1>
          <a href="/">
              <input type="button" class="Logout" value="Logout" />
          </a>
      </div>
      <div id="buttons">

      <!-- 导出数据 -->
      <el-radio v-model="type" label="数据形式" style="padding-left: 10px">数据形式</el-radio>
          <el-radio v-model="type" label="图片形式" >图片形式</el-radio>
          <el-button type="primary" plain @click="download">导出</el-button>

      <el-button type="primary" plain @click="toNewPrimitivePage">
        新增图元
      </el-button>
      <el-button type="primary" plain @click="toWritePrimitivePage">
        修改图元
      </el-button>
      <el-button type="primary" plain @click="toNewObjectPage">
        新增实体
      </el-button>
      <el-button type="primary" plain @click="toWriteRealObjectPage">
        修改实体
      </el-button>
      <el-button type="primary" plain @click="toNewRelationPage">
        新增关系
      </el-button>
      <el-button type="primary" plain @click="toWriteRelationPage">
        修改关系
      </el-button>

      <!-- 子组件 -->
      <Picture />
    </div>
<!--    <Read />-->
    <QuestionAnswer />
  </div>
</template>

<script>
import Picture from "./components/Picture";
import { saveAs } from "file-saver";
import {clearLoginList} from "../../tool/MapHelper";
import {
  getAll,
  getObjectList,
  getPrimitiveList,
  // eslint-disable-next-line no-unused-vars
  getRelationList, newObjectByPrimitive1, newPrimitive, getSuccUserList,

} from "../../tool/MapHelper";
import SearchNode from "./components/searchNode";
// import Read from "./components/Read";
import QuestionAnswer from "./components/QuestionAnswer";
import SmartSearch from "./components/smartSearch";

export default {
  name: "showPage",
  components: {
      SmartSearch,
    // Read,
    SearchNode,
    Picture,
    QuestionAnswer,
  },
  data() {
    return {
      type: "数据形式",
      objectList: getObjectList(),
      primitiveList: getPrimitiveList(),
      relationList: getRelationList(),
      succUserList: getSuccUserList(),
      searchHistory: [],
      searchText: "",
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
    download() {
      if (this.type === "数据形式") {
        var file = new File([getAll()], "关系文件.json");
        saveAs(file);
      } else {
        var canvas = document.getElementById("canvas");
        canvas.toBlob(function (blob) {
          saveAs(blob, "关系图谱.png");
        });
      }
    },
    logout() {
      // this.$emit("logout");
        clearLoginList();
        this.$router.push("/login")
    },
    // backToFirst() {
    //   // this.$emit("backToFirst");
    //     this.$router.push("/")
    // },
    toNewObjectPage() {
      // this.$emit("toNewObjectPage");
      this.$router.push("/addObject");
    },
    toNewRelationPage() {
      // this.$emit("toNewRelationPage");
      this.$router.push("/addRelation");
    },
    toWriteRealObjectPage() {
      // this.$emit("toWriteRealObjectPage");
      this.$router.push("/modObject");
    },
    toWriteRelationPage() {
      // this.$emit("toWriteRelationPage");
      this.$router.push("/modRelation");
    },
    toWritePrimitivePage() {
      // this.$emit("toWritePrimitivePage");
      this.$router.push("/modPrimitive");
    },
    toNewPrimitivePage() {
      // this.$emit("toNewPrimitivePage");
      this.$router.push("/addPrimitive");
    },
  },
};
</script>

<style>
.background1 {
  background-image: url("背景.png");
  width: 100%;
  height: 100%;
  position: fixed;
  background-size: cover;
  background-position: center;
  overflow: auto;
}
#text {
  font: 100 25px "Comic Sans MS";
  color: rgba(0, 0, 0, 0.67);
  /*text-shadow: 0 0 20px #fdec84, 10px -10px 30px #ffae35,*/
  /*  20px -20px 40px #ec760c, -20px -60px 50px #cd4607, 0px -80px 60px #973717,*/
  /*  10px -40px 70px #451b0e;*/
  }

  #buttons{
      position: absolute;
      margin-top: 70px;
      width: 100%;
  }

  /*.topbox h1{*/
  /*    font: 700 40px "Comic Sans MS";*/
  /*    color: rgba(30, 30, 30, 0.59);*/
  /*    !*text-shadow: 0 0 20px #fdec84,*!*/
  /*    !*10px -10px 30px #ffae35,*!*/
  /*    !*20px -20px 40px #ec760c,*!*/
  /*    !*-20px -60px 50px #cd4607,*!*/
  /*    !*0px -80px 60px #973717,*!*/
  /*    !*10px -40px 70px #451b0e;*!*/
  /*}*/
  .msg{
      position: relative;
      top:55px;
      right: 20px;
  }

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
  .Logout{
      position: absolute;
      right: 0px;
      top: 0px;
      width: 100px;
      height: 35px;
      font-size: 20px;
      font-weight: 400;
      color: #fff;
      border: 0;
      background-color:  rgba(255, 210, 4, 0.62);
  }

#buttons {
  position: absolute;
  margin-top: 50px;
  width: 100%;
}
.mesg {
  font: 500 50px "Comic Sans MS";
  color: white;
  text-shadow: 0 0 20px #fdec84, 10px -10px 30px #ffae35,
    20px -20px 40px #ec760c, -20px -60px 50px #cd4607, 0px -80px 60px #973717,
    10px -40px 70px #451b0e;
}
</style>
