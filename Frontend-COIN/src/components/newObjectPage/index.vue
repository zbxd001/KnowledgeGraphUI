<template>
  <div class="background1">
    <p class="mesg">新增实体</p>
    <!-- 返回按钮 -->
    <el-button
      type="primary"
      icon="el-icon-back"
      plain
      @click="backToSecond"
    ></el-button>

    <el-button type="primary" plain @click="pushNewObject">新建</el-button>
    <p></p>
    <el-input v-model="name" placeholder="实体名" id="objname"></el-input>
    <p></p>
    <el-select
      v-model="primitive"
      placeholder="图元"
      value-key="name"
      id="colname"
    >
      <el-option
        v-for="item in primitiveList"
        :key="item.ID"
        :label="item.name"
        :value="item"
      />
    </el-select>
  </div>
</template>

<script>
import { getPrimitiveList, newObjectByPrimitive } from "../../tool/MapHelper";
import { mapActions } from "vuex";
export default {
  name: "NewRealObject",
  data() {
    return {
      primitiveList: [],
      primitive: {},
      name: "",
      fontsize1: "10px",
      radius1: "35",
      i: 1,
    };
  },

  methods: {
    ...mapActions(["addObject"]),

    backToSecond() {
      // this.$emit("backToSecond");
      this.$router.push("/main");
    },
    async pushNewObject() {
      let obj = await newObjectByPrimitive(
        undefined,
        this.name,
        this.primitive,
        this.fontsize1,
        this.radius1,
        this.i
      );
      let newNode = {
        nodeName: this.name,
        nodeType: this.primitive.ID,
        nodeX: obj.x,
        nodeY: obj.y,
      };
      obj.ID = await this.addObject(newNode);
      this.backToSecond();
    },
  },
  mounted() {
    this.primitiveList = getPrimitiveList();
  },
};
</script>

<style>
#objname {
  width: 500px;
}
#colname {
  width: 500px;
}
</style>