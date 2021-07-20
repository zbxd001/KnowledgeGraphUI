import {
    writeWord,
    drawSquare,
    drawLine,
    drawArrow,
    drawCircle,
    modCircle,
    modSquare,
    modWord,
    searchTag,
    searchWord
} from "./DrawBasicTool"
import { getCenterPoint } from "./CalculateTool"
import { getPrimitivebyID } from "./MapHelper";

//迭代二画长方形 80*50
//迭代二画圆形   r=35 
//迭代二画正方形 64*64
function realObjectDraw(Realobject) {
    let primitive = getPrimitivebyID(Realobject.primitiveID);
    if (primitive.shape === "circle") {
        drawCircle({ x: Realobject.x, y: Realobject.y }, primitive.color)
        console.log("测试画圆")
        writeWord({ x: Realobject.x, y: Realobject.y }, Realobject.name);
    }
    if (primitive.shape === "rectangle") {
        drawSquare({ x: Realobject.x - 40, y: Realobject.y - 25 }, { x: Realobject.x + 40, y: Realobject.y + 25 }, primitive.color)
        writeWord({ x: Realobject.x, y: Realobject.y }, Realobject.name);
    }
    if (primitive.shape === "square") {
        drawSquare({ x: Realobject.x - 32, y: Realobject.y - 32 }, { x: Realobject.x + 32, y: Realobject.y + 32 }, primitive.color)
        writeWord({ x: Realobject.x, y: Realobject.y }, Realobject.name);
    }

}

//修改节点的半径及文字大小,r代表圆的半径，i代表长方形的变化
// eslint-disable-next-line no-unused-vars
export function modRealObject(Realobject) {
    let primitive = getPrimitivebyID(Realobject.primitiveID);
    if (primitive.shape === "circle") {
        modCircle({ x: Realobject.x, y: Realobject.y }, primitive.color, Realobject.radius1)
    }
    if (primitive.shape === "rectangle") {
        modSquare({ x: Realobject.x - 40, y: Realobject.y - 25 }, { x: Realobject.x + 40, y: Realobject.y + 25 }, primitive.color, Realobject.i)
    }
    if (primitive.shape === "square") {
        modSquare({ x: Realobject.x - 32, y: Realobject.y - 32 }, { x: Realobject.x + 32, y: Realobject.y + 32 }, primitive.color, Realobject.i)

    }
    modWord({ x: Realobject.x, y: Realobject.y }, Realobject.name, Realobject.fontsize1);
}

function searchTag2(Realobject) {
    searchTag({ x: Realobject.x, y: Realobject.y }, Realobject.name, Realobject.fontsize1)
}

//绘制关系的方法
function drawRelation(start, end, isSolidline, name, angle) {
    // if (start.x === end.x && start.y === end.y) {

    //     drawself(start, isSolidline, name);
    //     return;
    // }
    drawLine(start, end, isSolidline);
    let centerpoint = getCenterPoint(start, end);
    writeWord(centerpoint, name);
    drawArrow(end, angle)

}

function searchRelation(start, end, isSolidline, name, angle) {
    drawLine(start, end, isSolidline);
    let centerpoint = getCenterPoint(start, end);
    searchWord(centerpoint, name);
    drawArrow(end, angle)
}


//实体在迭代一的的大小是80*50

function drawRealObject(Realobject, centerpoint) {

    drawSquare({ x: centerpoint.x - 40, y: centerpoint.y - 25 }, { x: centerpoint.x + 40, y: centerpoint.y + 25 }, Realobject.color)
    writeWord(centerpoint, Realobject.name);
}



export {
    drawRealObject,
    drawRelation,
    realObjectDraw,
    searchTag2,
    searchRelation
}