<template>
  <div class="question-answer-wrapper">
    <el-autocomplete
      popper-class="my-autocomplete"
      v-model="question"
      :fetch-suggestions="querySearch"
      placeholder="有问题请问智能小助手"
      select-when-unmatched
      @select="askQuestion"
      @change="askQuestion"
    >
      <i class="el-icon-user el-input__icon" slot="suffix" @click="askQuestion">
      </i>

      <template slot-scope="{ item }">
        <div class="name">{{ item.value }}</div>
      </template>
    </el-autocomplete>
    <el-button
          @click="onReadClick"
          icon="el-icon-headset"
          class="read-btn2"
          circle
  ></el-button>
  </div>
</template>

<script>
import {
  getObjectList,
  getPrimitiveList,
  getRelationList,
  getRealObjectbyID,
  getSuccUserList,
} from "../../../tool/MapHelper";
import { readInfo } from "./baidu_tts_cors";
export default {
  data() {
    return {
      questions: [],
      question: "",
      succUser: getSuccUserList(),
      readMessage: "请问小助手问题"
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var questions = this.questions;
      var results = queryString
        ? questions.filter(this.createFilter(queryString))
        : questions;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (question) => {
        return (
          question.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    loadAll() {
      return [
        { value: "我想知道图元的数量。" },
        { value: "我想知道节点的数量。" },
        { value: "我想知道关系的数量。" },
        { value: "我想看看图元的列表？" },
        { value: "我想看看节点的列表？" },
        { value: "我想看看关系的列表？" },
      ];
    },
    askQuestion() {
      if (!this.question) {
        return;
      }
      if (this.question.includes("图元")) {
        if (this.question.includes("列表")) {
          this.showPrimitiveList();
        } else {
          this.showPrimitiveCount();
        }
      } else if (this.question.includes("节点")) {
        if (this.question.includes("列表")) {
          this.showRealObjectList();
        } else {
          this.showRealObjectCount();
        }
      } else if (this.question.includes("关系")) {
        if (this.question.includes("列表")) {
          this.showRelationList();
        } else {
          this.showRelationCount();
        }
      } else if(this.question.includes("邮箱")){
        this.showEmail();
      }
      else if(this.question.includes("用户名")||this.question.includes("帐号")){
        this.showUsername();
      }
      else if(this.question.includes("我的") || this.question.includes("个人") || this.question.includes("信息")){
        this.showInfo();
      }
      else {
        this.iDontKnow();
      }
    },
    showPrimitiveList() {
      let primitiveList = getPrimitiveList();
      let message = `
      <div class="notify-content">
      <div class="notify-content-title">图元列表</div>
      <br>
      `;
      this.readMessage = `当前图元数量为${primitiveList.length},分别是`
      let primitiveCount = primitiveList.length;
      for (let i = 0; i < primitiveCount; i++) {
        let primitive = primitiveList[i];
        message =
          message +
          `<div class="real-object-info"><strong>${
            i + 1
          }. </strong><br/><strong>名字：</strong>${
            primitive.name
          }<br/><strong>形状：</strong>${
            primitive.shape
          }<br/><strong>颜色：</strong><span style="color:${primitive.color}">${
            primitive.color
          }</span></div>`;
        this.readMessage = this.readMessage + `${primitive.name}`
        if (i!==primitiveCount-1){
          this.readMessage = this.readMessage + `和`
        }
      }

      message = message + "</div>";
      this.notify(message);
    },
    showPrimitiveCount() {
      let primitiveList = getPrimitiveList();
      let info = `<div class="tips">当前图元数量为${primitiveList.length}。</div>`;
      this.readMessage = `当前图元数量为${primitiveList.length}`
      this.notify(info);
    },
    showRealObjectList() {
      let objectList = getObjectList();
      let message = `
      <div class="notify-content">
      <div class="notify-content-title">节点列表</div>
      <br>
      `;
      this.readMessage = `当前节点数量为${objectList.length},分别是`
      let realObjectCount = objectList.length;
      for (let i = 0; i < realObjectCount; i++) {
        let realObject = objectList[i];
        message =
          message +
          `<div class="real-object-info"><strong>${i + 1}. </strong>${
            realObject.name
          }</div>`;
        this.readMessage = this.readMessage + `${realObject.name}`
        if (i!==realObjectCount-1){
          this.readMessage = this.readMessage + `和`
        }
      }
      message = message + "</div>";
      this.notify(message);
    },
    showRealObjectCount() {
      let objectList = getObjectList();
      let info = `<div class="tips">当前节点数量为${objectList.length}.</div>`;
      this.readMessage = `当前节点数量为${objectList.length}`
      this.notify(info);
    },
    showRelationList() {
      let relationList = getRelationList();
      let message = `
      <div class="notify-content">
      <div class="notify-content-title">关系列表</div>
      <br>
      `;
      this.readMessage = `当前关系数量为${relationList.length},分别是`
      let relationCount = relationList.length;
      for (let i = 0; i < relationCount; i++) {
        let relation = relationList[i];
        let start = getRealObjectbyID(relation.start);
        let end = getRealObjectbyID(relation.end);
        this.readMessage = this.readMessage + `名字为${relation.name},起点为${start.name},终点为${end.name}  `;
        message =
          message +
          `<div class="real-object-info"><strong>${
            i + 1
          }. </strong><strong>名字：</strong>${
            relation.name
          } | <strong>起点：</strong>${
            start.name
          } | <strong>终点：</strong>${end.name}</div>`;
      }
      message = message + "</div>";
      this.notify(message);
    },
    showRelationCount() {
      let relationList = getRelationList();
      let info = `<div class="tips">当前关系数量为${relationList.length}。</div>`
      this.readMessage = `当前关系数量为${relationList.length}`
      this.notify(info);
    },
    showEmail(){
      let info = `<div class="tips">您注册的邮箱是${this.succUser[2]}.</div>`;
      this.readMessage = `您注册的邮箱是${this.succUser[2]}`
      this.notify(info);
    },
    showUsername(){
      let info = `<div class="tips">您注册的用户名是${this.succUser[1]}.</div>`;
      this.readMessage = `您注册的用户名是${this.succUser[1]}`
      this.notify(info)
    },
    showInfo(){
      let message = `<div class="tips">您注册的用户名是${this.succUser[1]}.<br>您注册的邮箱是${this.succUser[2]}.</div>`;
      this.notify(message)
    },
    iDontKnow() {
      this.readMessage = `请问和本系统有关的问题`
      this.notify("抱歉，我没有听懂");
    },
    onReadClick(){
      readInfo(this.readMessage);
    },
    notify(message) {
      this.$notify({
        dangerouslyUseHTMLString: true,
        message,
        position: "bottom-right",
        offset: 200,
      });
    },
  },
  mounted() {
    this.questions = this.loadAll();
  },
};
</script>

<style>
.question-answer-wrapper {
  position: fixed;
  right: 25px;
  bottom: 150px;
}
.notify-content-title {
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.81);
  margin: 10px 0;
  font-size: 40px;
}
.real-object-info {
  line-break: anywhere;
  color: #0a106e;
  font-size: 10px;
}
.tips{
    font-size: 20px;
    color: rgba(21, 21, 21, 0.82);
  }
.read-btn2 {
  position: fixed;
  right: 25px;
  bottom: 50px;
}

</style>