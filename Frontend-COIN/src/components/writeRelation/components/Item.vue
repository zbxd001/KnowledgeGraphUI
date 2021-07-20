<template>
  <div>
    <p></p>
    关系：
    <el-input
      v-model="relation.name"
      placeholder="关系名"
      style="width: 800px"
      @change="onChange"
    ></el-input>
    <p></p>

    <el-select v-model="relation.start" placeholder="起点" @change="onChange">
      <el-option
        v-for="object in objectList"
        :key="object.ID"
        :label="object.name"
        :value="object.ID"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="relation.end"
      placeholder="终点"
      style="padding-left: 20px"
      @change="onChange"
    >
      <el-option
        v-for="object in objectList"
        :key="object.ID"
        :label="object.name"
        :value="object.ID"
      >
      </el-option>
    </el-select>
    <p></p>
    <el-radio v-model="relation.isSolidline" :label="true" @change="onChange"
      >实线</el-radio
    >
    <el-radio v-model="relation.isSolidline" :label="false" @change="onChange"
      >虚线</el-radio
    >
    <el-button type="primary" plain @click="dRelation">删除</el-button>
  </div>
</template>

<script>
import { getObjectList, deleteRelation } from "../../../tool/MapHelper";
import { mapActions } from "vuex";
export default {
  name: "WriteRelationItem",
  props: {
    oneRelation: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      relation: { ...this.oneRelation },
      objectList: getObjectList(),
    };
  },
  methods: {
    ...mapActions(["delRelation"]),
    onChange() {
      this.$emit("onRelationChange", this.relation);
    },
    dRelation() {
      deleteRelation(this.relation.ID);
      this.delRelation(this.relation.ID);
    },
  },
};
</script>

<style>
</style>