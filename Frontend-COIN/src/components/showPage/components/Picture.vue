<template>
  <div id="canvasDiv">
    <!-- 画布 -->
    <br />
    <el-button id="importButton" type="primiary" plain @click="importData"
      >导入</el-button
    >
    <el-button
            @click="onClearClick"
            icon="el-icon-magic-stick"
            class="clear-btn"
            circle
    ></el-button>
    <br />
    <canvas
      id="canvas"
      width="1000"
      height="500"
      @mousedown="handleCanvasMouseDown"
    ></canvas>
    <br>
    <span id="text"
    >数据统计： 当前图元数量为{{this.primitiveList.length}}, 当前节点数量为{{this.realObjectList.length}}, 当前关系数量为{{this.relationList.length}}</span>
  </div>
</template>

<script>
import {
  setCanvas,
  drawLine,
  drawSquare,
  drawArrow,
  writeWord,
  getPointbyMouseEvent,
  clearCanvas,
} from "../../../tool/DrawBasicTool";
import { paintRealObjet, paintRelation } from "../../../tool/Order";
import {
  drawRealObject,
  drawRelation,
  modRealObject,
} from "../../../tool/DrawTool";
import {
  clearData,
  getObjectbyPoint,
  getObjectList,
  getPrimitiveList,
  getRelationList,
  importObjectByPrimitive,
  newPrimitive,
  newRelation,
  deleteRelation
} from "../../../tool/MapHelper";
import { mapActions } from "vuex";

export default {
  name: "Picture",
  data() {
    return {
      planning: false,
      primitiveList: getPrimitiveList(),
      realObjectList: getObjectList(),
      relationList: getRelationList(),
      selectedObject: undefined,
    };
  },
  methods: {
    // initCanvas() {
    //   // 1. 实例化canvas 画布
    //   var canvas = new fabric.Canvas("canvas");
    //
    //
    //   // 鼠标滚动放大缩小画布
    //   //
    //   if (document.getElementById("canvas")) {
    //     // IE9, Chrome, Safari, Opera
    //     document.addEventListener("mousewheel", function(e) {
    //       if (e.target.className == "upper-canvas ") {
    //         var zoom = (event.deltaY > 0 ? -0.1 : 0.1) + canvas.getZoom();
    //         zoom = Math.max(0.1, zoom); //最小为原来的1/10
    //         zoom = Math.min(3, zoom); //最大是原来的3倍
    //         var zoomPoint = new fabric.Point(event.pageX, event.pageY);
    //         canvas.zoomToPoint(zoomPoint, zoom);
    //       }
    //     });
    //   }
    // },
    ...mapActions([
      "getAllObject",
      "getAllPrimitive",
      "getAllRelation",
      "updateObject",
      "delRelation"
    ]),
    onClearClick() {
      let relationList = getRelationList();
      for (let i = relationList.length - 1; i >= 0; i--) {
        let relation = relationList[i];
        deleteRelation(relation.ID);
        this.delRelation(relation.ID);
      }
      // 清空关系后刷新
      this.importData();
    },


    prepareDrawing() {
      var canvas = document.getElementById("canvas");
      setCanvas(canvas);
    },
    handleCanvasMouseDown(e) {
      let point = getPointbyMouseEvent(e);
      this.selectedObject = getObjectbyPoint(point);
      if (this.selectedObject !== undefined) {
        document.addEventListener("mousemove", this.handleDocumentMouseMove);
        document.addEventListener("mouseup", this.handleDocumentMouseUp);
      }
    },
    handleDocumentMouseMove(e) {
      let point = getPointbyMouseEvent(e);
      this.selectedObject.x = point.x;
      this.selectedObject.y = point.y;

      clearCanvas();
      this.drawRealObjects();
      this.drawRelations();
    },
    handleDocumentMouseUp(e) {
      this.handleDocumentMouseMove(e);

      let updateObject = {
        nodeId: this.selectedObject.ID,
        nodeName: this.selectedObject.name,
        nodeType: this.selectedObject.primitiveID,
        nodeX: this.selectedObject.x,
        nodeY: this.selectedObject.y,
      };
      //运行更新关系的接口
      this.updateObject(updateObject);
      //结束鼠标的响应
      document.removeEventListener("mousemove", this.handleDocumentMouseMove);
      document.removeEventListener("mouseup", this.handleDocumentMouseUp);
    },
    testDrawing() {
      // 测试
      for (let i = 0; i <= 15; i++) {
        paintRealObjet({
          ID: "" + i,
          color: "#00ff00",
          name: "实体" + i,
        });
      }
      for (let i = 0; i <= 15; i++) {
        for (let j = 0; j <= 15; j++) {
          if (i !== j) {
            paintRelation({
              ID: "L" + i + "-" + "j",
              start: "" + i,
              end: "" + j,
              name: "关系" + i + "-" + "j",
              isSolidline: true,
            });
          }
        }
      }
    },
    testDrawBasicTool() {
      // 画图工具类测试代码
      drawLine({ x: 100, y: 100 }, { x: 200, y: 100 }, true);
      drawLine({ x: 200, y: 100 }, { x: 300, y: 100 }, false);
      drawSquare({ x: 200, y: 200 }, { x: 250, y: 250 }, "#00ff00");
      drawArrow({ x: 350, y: 350 }, 0);
      drawArrow({ x: 350, y: 350 }, 90);
      drawArrow({ x: 350, y: 350 }, 180);
      drawArrow({ x: 350, y: 350 }, 270);
      writeWord({ x: 250, y: 250 }, "成功");
    },
    testDrawTool() {
      //画图逻辑层工具测试代码
      drawRealObject(
        { ID: "1", color: "#ff00ff", name: "实体" },
        { x: 400, y: 400 }
      );
      drawRelation(
        { x: 100, y: 100 },
        { x: 100, y: 200 },
        false,
        "我是你爹",
        90
      );
    },
    drawRealObjects() {
      let objects = getObjectList();
      for (let object of objects) {
        paintRealObjet(object);
      }
    },
    modifyRealObjects() {
      let objects = getObjectList();
      for (let object of objects) {
        modRealObject(object);
      }
    },
    drawRelations() {
      let relations = getRelationList();
      for (let relation of relations) {
        paintRelation(relation);
      }
    },

    testDrawSelfRelation() {
      paintRelation({
        ID: "L" + 1,
        start: "" + 1,
        end: "" + 1,
        name: "关系" + 1 + "-" + 1,
        isSolidline: true,
      });
    },

    async importData() {
      clearData();
      clearCanvas();
      let primitiveRes = await this.getAllPrimitive();
      for (let i of primitiveRes) {
        await newPrimitive(
          i.primitiveId,
          i.primitiveColor,
          i.primitiveShape,
          i.primitiveName
        );
      }
      let objectRes = await this.getAllObject();
      for (let j of objectRes) {
        importObjectByPrimitive(
          j.nodeId,
          j.nodeName,
          j.nodeType,
          j.nodeX,
          j.nodeY
        );
      }
      let relationRes = await this.getAllRelation();
      for (let j of relationRes) {
        let isSolid = true;
        if (j.solid === "实线") {
          isSolid = true;
        } else {
          isSolid = false;
        }
        newRelation(
          j.relationId,
          j.relationStart,
          j.relationEnd,
          j.relationName,
          isSolid
        );
      }

      this.prepareDrawing();

      this.drawRealObjects();
      this.drawRelations();
      this.modifyRealObjects();
    },
  },
  mounted() {
    // 画图准备
    // this.initCanvas();
    this.prepareDrawing();

    this.drawRealObjects();
    this.drawRelations();
    this.modifyRealObjects();

    //drawCircle({x: 50, y:50},'#ffff00');
    // this.testDrawing();
    // this.testDrawBasicTool();
    // this.testDrawTool();
    //this.testDrawSelfRelation();
  },
};
</script>

<style scoped>
#importButton {
  background-image: linear-gradient(
    to right,
    #e4afcb 0%,
    #b8cbb8 0%,
    #6f7a6f 0%,
    #e2c58b 30%,
    #c2ce9c 64%,
    #7edbdc 100%
  );
  color: #0a106e;
}
#canvas {
  border: thin solid black;
}
#canvasDiv {
  position: center;
}

#text {
  font: 100 25px "Comic Sans MS";
  color: rgba(0, 0, 0, 0.6);
  top: 50px;
}
.clear-btn {
  position: fixed;
  right: 100px;
  bottom: 50px;
}
</style>