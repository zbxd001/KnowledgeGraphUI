<template>
  <div class="background1">
    <p class="mesg">修改关系</p>
    <!-- 返回按钮 -->
    <el-button
      type="primary"
      icon="el-icon-back"
      plain
      @click="backToSecond"
    ></el-button>
    <el-button
      type="primary"
      @click="updateAllChangedRelations"
      style="padding-left: 20px"
      >更新</el-button
    >
    <Item
      v-for="oneRelation in relationList"
      :oneRelation="oneRelation"
      :key="oneRelation.ID"
      @onRelationChange="
        (changedRelation) => handleRelationChange(changedRelation, oneRelation)
      "
    />
  </div>
</template>

<script>
import { getRelationList } from "../../tool/MapHelper";
import Item from "./components/Item";
import { mapActions } from "vuex";

export default {
  name: "WriteRelation",
  components: {
    Item,
  },
  data() {
    return {
      relationList: getRelationList(),
      changedRelations: [],
    };
  },
  methods: {
    ...mapActions(["updateRelation"]),
    backToSecond() {
      // this.$emit("backToSecond");
      this.$router.push("/main")
    },
    handleRelationChange(changedRelation, oneRelation) {
      this.changedRelations.push({ changedRelation, oneRelation });
    },
    updateAllChangedRelations() {
      for (let { changedRelation, oneRelation } of this.changedRelations) {
        oneRelation.name = changedRelation.name;
        oneRelation.start = changedRelation.start;
        oneRelation.end = changedRelation.end;
        oneRelation.isSolidline = changedRelation.isSolidline;
        let Mysoild = "";
        if (changedRelation.isSolidline == true) {
          Mysoild = "实线";
        } else {
          Mysoild = "虚线";
        }
        let updateRelation = {
          relationId: changedRelation.ID,
          relationStart: changedRelation.start,
          relationEnd: changedRelation.end,
          relationName: changedRelation.name,
          solid: Mysoild,
        };
        this.updateRelation(updateRelation);
      }
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