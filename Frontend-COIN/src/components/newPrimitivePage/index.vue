<template>
  <div class="background1">
    <p class="mesg">定义新图元</p>
    <!-- 返回按钮 -->
    <el-button
      type="primary"
      icon="el-icon-back"
      plain
      @click="backToSecond"
    ></el-button>

    <el-button type="primary" plain @click="pushNewPrimitive">新建</el-button>
    <p></p>
    <el-input v-model="name" placeholder="图元名" id="primitiveName"></el-input>
    <p></p>
    <el-select v-model="color" placeholder="颜色" id="colorName">
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
    <el-select v-model="shape" placeholder="形状" id="shape">
      <el-option
        v-for="item in shapeList"
        :key="item"
        :label="item"
        :value="item"
      >
        {{ item }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { newPrimitive } from "../../tool/MapHelper";
import { mapActions } from "vuex";
export default {
  name: "NewPrimitive",
  data() {
    return {
      id: "",
      name: "",
      color: "",
      shape: "",
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
    ...mapActions(["addPrimitive"]),
    backToSecond() {
      // this.$emit("backToSecond")
      this.$router.push("/main");
    },
    async pushNewPrimitive() {
      let newPrimitive1 = {
        primitiveName: this.name,
        primitiveColor: this.color,
        primitiveShape: this.shape,
      };
      this.id = await this.addPrimitive(newPrimitive1);
      await newPrimitive(this.id, this.color, this.shape, this.name);
      this.backToSecond();
    },
  },
};
</script>

<style>
#primitiveName {
  width: 500px;
}
</style>