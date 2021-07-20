<template>
  <div class="background1">
    <p class="mesg">新增关系</p>
    <!-- 返回按钮 -->

    <el-button
      type="primary"
      icon="el-icon-back"
      plain
      @click="backToSecond"
    ></el-button>
    <el-radio v-model="isSolidline" :label="true" style="padding-left: 20px"
      >实线</el-radio
    >
    <el-radio v-model="isSolidline" :label="false">虚线</el-radio>
    <p></p>
    <el-input v-model="name" placeholder="关系名" id="relationname"></el-input>
    <p></p>
    <el-button type="primary" plain @click="pushNewRelation">新建</el-button>
    <el-select
      v-model="start"
      placeholder="起点"
      value-key="name"
      style="padding-left: 20px"
    >
      <el-option
        v-for="object in objectList"
        :key="object.ID"
        :label="object.name"
        :value="object"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="end"
      placeholder="终点"
      value-key="name"
      style="padding-left: 20px"
    >
      <el-option
        v-for="object in objectList"
        :key="object.ID"
        :label="object.name"
        :value="object"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { newRelation, getObjectList } from "../../tool/MapHelper";
import { mapActions } from "vuex";
export default {
  name: "NewRelation",
  data() {
    return {
      name: "",
      isSolidline: true,
      objectList: getObjectList(),
      start: {},
      end: {},
    };
  },

  methods: {
    ...mapActions(["addRelation"]),
    backToSecond() {
      // this.$emit("backToSecond");
      this.$router.push("/main");
    },
    TestNewRelation() {
      console.log(newRelation("2", "3", "我真帅", false));
    },
    async pushNewRelation() {
      let mySoild = "";
      if (this.isSolidline == true) {
        mySoild = "实线";
      } else {
        mySoild = "虚线";
      }
      let startID = this.start.ID;
      let endID = this.end.ID;
      let newRelation1 = {
        relationStart: startID,
        relationEnd: endID,
        relationName: this.name,
        solid: mySoild,
      };
      this.id = await this.addRelation(newRelation1);
      await newRelation(this.id, startID, endID, this.name, this.isSolidline);
      this.backToSecond();
    },
  },
  mounted() {
    // 测试新增实体
    // this.TestNewRelation();
  },
};
</script>

<style>
#relationname {
  width: 600px;
}
</style>