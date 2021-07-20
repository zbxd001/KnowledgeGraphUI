<template>
  <div>
    <p></p>
    实体：
    <p></p>
    <el-input
      v-model="object.name"
      placeholder="实体名"
      @change="onChange"
      style="width: 800px"
    ></el-input>
    <p></p>
    <el-select
      v-model="primitive"
      placeholder="图元"
      value-key="name"
      @change="onPrimitiveChange"
    >
      <el-option
        v-for="item in primitiveList"
        :key="item.ID"
        :label="item.name"
        :value="item"
      />
    </el-select>
    <el-input
      v-model="object.fontsize1"
      placeholder="字体大小"
      style="width: 230px"
      @change="onChange"
    ></el-input>
    <el-input
      v-if="primitive.shape === 'circle'"
      v-model="object.radius1"
      placeholder="半径大小"
      style="width: 230px"
      @change="onChange"
    ></el-input>
    <el-input
      v-else
      v-model="object.i"
      placeholder="按比例放大或缩小"
      style="width: 230px"
      @change="onChange"
    ></el-input>

    <p></p>
    <el-button type="primary" plain @click="dObject">删除</el-button>
  </div>
</template>

<script>
import { deleteObject, getPrimitivebyID } from "../../../tool/MapHelper";
import { mapActions } from "vuex";
export default {
  name: "WriteRealObject",
  props: {
    primitiveList: {
      type: Array,
      required: true,
    },
    oneObject: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      object: { ...this.oneObject },
      primitive: getPrimitivebyID(this.oneObject.primitiveID),
    };
  },
  methods: {
    ...mapActions(["delObject"]),
    onPrimitiveChange(primitive) {
      this.object.primitiveID = primitive.ID;
      this.onChange();
    },
    onChange() {
      this.$emit("onObjectChange", this.object);
    },
    dObject() {
      deleteObject(this.object.ID);
      this.delObject(this.object.ID);
    },
  },
};
</script>

<style>
</style>