<template>
  <el-button
    @click="onReadClick"
    icon="el-icon-headset"
    class="read-btn"
    circle
  ></el-button>
</template>

<script>
import {
  getObjectList,
  getPrimitiveList,
  getRelationList,
} from "../../../tool/MapHelper";
import { readInfo } from "./baidu_tts_cors";

export default {
  name: "Read",
  methods: {
    onReadClick() {
      let primitiveList = getPrimitiveList();
      let objectList = getObjectList();
      let relationList = getRelationList();
      let info = `当前图元数量为${primitiveList.length},节点数量为${objectList.length},关系数量为${relationList.length}`;
      readInfo(info);
    },
  },
};
</script>

<style>
.read-btn {
  position: fixed;
  right: 25px;
  bottom: 0px;
}
</style>