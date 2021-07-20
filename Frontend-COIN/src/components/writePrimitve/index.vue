<template>
  <div class="background1">
    <p class="mesg">修改图元定义</p>
    <!-- 返回按钮 -->
    <el-button
      type="primary"
      icon="el-icon-back"
      plain
      @click="backToSecond"
      style="padding-left: 20px"
    ></el-button>
    <el-button
      type="primary"
      @click="updateAllChangedPrimitives"
      style="padding-left: 20px"
      >更新</el-button
    >
    <Item
      v-for="onePrimitive in primitiveList"
      :onePrimitive="onePrimitive"
      :key="onePrimitive.ID"
      @onPrimitiveChange="
        (changedPrimitive) =>
          handlePrimitiveChange(changedPrimitive, onePrimitive)
      "
    />
  </div>
</template>

<script>
import { getPrimitiveList } from "../../tool/MapHelper";
import Item from "./components/Item";
import { mapActions } from "vuex";

export default {
  name: "WritePrimitive",
  components: {
    Item,
  },
  data() {
    return {
      primitiveList: getPrimitiveList(),
      changedPrimitives: [],
    };
  },
  methods: {
    ...mapActions(["updatePrimitive"]),
    handlePrimitiveChange(changedPrimitive, onePrimitive) {
      this.changedPrimitives.push({ changedPrimitive, onePrimitive });
    },
    updateAllChangedPrimitives() {
      for (let { changedPrimitive, onePrimitive } of this.changedPrimitives) {
        onePrimitive.name = changedPrimitive.name;
        onePrimitive.color = changedPrimitive.color;
        onePrimitive.shape = changedPrimitive.shape;

        let updatePrimitive = {
          primitiveId: changedPrimitive.ID,
          primitiveName: changedPrimitive.name,
          primitiveColor: changedPrimitive.color,
          primitiveShape: changedPrimitive.shape,
        };
        this.updatePrimitive(updatePrimitive);
      }
      // this.$emit("backToSecond");
      this.$router.push("/main")
    },
    backToSecond() {
      // this.$emit("backToSecond");
      this.$router.push("/main")
    },
  },
};
</script>

<style>
  .background1{
    overflow: auto;
  }
</style>