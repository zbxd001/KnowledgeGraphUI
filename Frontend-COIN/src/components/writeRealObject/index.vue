<template>
  <div class="background1">
    <p class="mesg">修改实体</p>
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
      @click="updateAllChangedObjects"
      style="padding-left: 20px"
      >更新</el-button
    >
    <Item
      v-for="oneObject in objectList"
      :oneObject="oneObject"
      :primitiveList="primitiveList"
      :key="oneObject.ID"
      @onObjectChange="
        (changedObject) => handleObjectChange(changedObject, oneObject)
      "
    />
  </div>
</template>

<script>
import { getObjectList, getPrimitiveList } from "../../tool/MapHelper";
import Item from "./components/Item";
import { mapActions } from "vuex";

export default {
  name: "WriteRealObject",
  components: {
    Item,
  },
  data() {
    return {
      primitiveList: getPrimitiveList(),
      objectList: getObjectList(),
      changedObjects: [],
    };
  },
  methods: {
    ...mapActions(["updateObject"]),
    handleObjectChange(changedObject, oneObject) {
      this.changedObjects.push({ changedObject, oneObject });
    },
    backToSecond() {
      // this.$emit("backToSecond");
      this.$router.push("/main")
    },
    updateAllChangedObjects() {
      for (let { changedObject, oneObject } of this.changedObjects) {
        oneObject.name = changedObject.name;
        oneObject.primitiveID = changedObject.primitiveID;
        oneObject.x = changedObject.x;
        oneObject.y = changedObject.y;
        oneObject.fontsize1 = changedObject.fontsize1;
        oneObject.radius1 = changedObject.radius1;
        oneObject.i = changedObject.i;
        // TODO 更新其他属性
        let updateObject = {
          nodeId: changedObject.ID,
          nodeName: changedObject.name,
          nodeType: changedObject.primitiveID,
          nodeX: changedObject.x,
          nodeY: changedObject.y,
        };
        this.updateObject(updateObject);
      }
      // this.$emit("backToSecond");
      this.$router.push("/main")
    },
  },
  mounted() {
    this.primitiveList = getPrimitiveList();
  },
};
</script>

<style>
</style>