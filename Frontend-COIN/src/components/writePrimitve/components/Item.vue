<template>
  <div>
    <p></p>
    图元：
    <p></p>
    <el-input
      v-model="primitive.name"
      placeholder="图元名"
      id="primitiveName"
      @change="onChange"
    ></el-input>
    <p></p>
    <el-select v-model="primitive.color" placeholder="颜色" @change="onChange">
      <el-option
        v-for="item in colorList"
        :key="item"
        :label="item"
        :value="item"
        :style="{ color: item }"
      >
        {{ item }}
      </el-option>
    </el-select>
    <el-select v-model="primitive.shape" placeholder="形状" @change="onChange">
      <el-option
        v-for="item in shapeList"
        :key="item"
        :label="item"
        :value="item"
      >
        {{ item }}
      </el-option>
    </el-select>
    <p></p>
    <el-button type="primary" plain @click="dPrimitive">删除</el-button>
  </div>
</template>

<script>
import { deletePrimitive } from "../../../tool/MapHelper";
import { mapActions } from "vuex";

export default {
  name: "WriteRealPrimitive",
  props: {
    onePrimitive: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      primitive: { ...this.onePrimitive },
      colorList: [
        "#FFC0CB",
        "#DB7093",
        "#FF1493",
        "#DC143C",
        "#DDA0DD",
        "#DA70D6",
        "#FF00FF",
        "#9370DB",
        "#800080",
        "#6495ED",
        "#4169E1",
        "#0000FF",
        "#87CEEB",
        "#E1FFFF",
        "#00FFFF",
        "#7FFFAA",
        "#00FF7F",
        "#008000",
        "#FFFFE0",
        "#FFFF00",
        "#FFD700",
        "#F5DEB3",
        "#FFA500",
        "#CD5C5C",
      ],
      shapeList: ["square", "rectangle", "circle"],
    };
  },
  methods: {
    ...mapActions(["delPrimitive"]),
    onChange() {
      this.$emit("onPrimitiveChange", this.primitive);
    },
    dPrimitive() {
      deletePrimitive(this.primitive.ID);
      this.delPrimitive(this.primitive.ID);
    },
  },
};
</script>

<style>
#primitiveName {
  width: 800px;
}
</style>