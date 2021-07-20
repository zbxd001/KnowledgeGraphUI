//用于定位关系名字的位置，输入两个点，输出这两个点的中点
function getCenterPoint(start, end) {
    let a = (start.x + end.x) / 2;
    let b = (start.y + end.y) / 2;
    return { x: a, y: b }
}

function getStartbyshape(start, end, shape) {
    let a = start.x - end.x;
    let b = start.y - end.y;
    let L1 = 40;
    if (shape === "circle") L1 = 35;
    if (shape === "square") L1 = 32
    let L2 = 25;
    if (shape === "circle") L2 = 35;
    if (shape === "square") L1 = 32

    let c = 0;
    let d = 0;

    if (a < 50) c = 1;
    if (a > 50) c = -1;
    if (b < 50) d = 1;
    if (b > 50) d = -1;
    return { x: start.x + c * L1, y: start.y + d * L2 };
}

function getEndbyshape(start, end, shape) {
    let L1 = 40;
    if (shape === "circle") L1 = 35;
    if (shape === "square") L1 = 32
    let L2 = 25;
    if (shape === "circle") L2 = 35;
    if (shape === "square") L1 = 32
    let a = start.x - end.x;
    let b = start.y - end.y;
    let c = 0;
    let d = 0;

    if (a < 50) c = -1;
    if (a > 50) c = 1;

    if (b < 50) d = -1;
    if (b > 50) d = 1;
    return { x: end.x + c * L1, y: end.y + d * L2 };
}

function getAngle(start, end) {
    let a = start.x - end.x;
    let b = start.y - end.y;
    if (a > 0) return 180;
    if (a < 0) return 0;
    if (a == 0 && b > 0) return 90;
    if (a == 0 && b > 0) return 270;
    return 0;

}

//为实体发放位置 目前暂定大小为16个 number范围为0-15 画布大小为800*500
function getLocation(number) {
    let canvasWidth = 800;
    let canvasHeight = 500;
    let oneWidth = canvasWidth / 5;
    let oneHeight = canvasHeight / 5
    let a = (number % 4 + 1) * oneWidth;
    let b = Math.floor(number / 4 + 1) * oneHeight;

    return { x: a, y: b }
}

//根据实体位置确定连接点，目前实体大小为80*50
function getStart(start, end) {
    let a = start.x - end.x;
    let b = start.y - end.y;
    let c;
    let d;
    if (a == 0) c = 0;
    if (a < 0) c = 1;
    if (a > 0) c = -1;
    if (b == 0) d = 0;
    if (b < 0) d = 1;
    if (b > 0) d = -1;
    return { x: start.x + c * 40, y: start.y + d * 25 };
}

function getEnd(start, end) {
    let a = start.x - end.x;
    let b = start.y - end.y;
    let c;
    let d;
    if (a == 0) c = 0;
    if (a < 0) c = -1;
    if (a > 0) c = 1;
    if (b == 0) d = 0;
    if (b < 0) d = -1;
    if (b > 0) d = 1;
    return { x: end.x + c * 40, y: end.y + d * 25 };
}


export {
    getCenterPoint,
    getStart,
    getEnd,
    getStartbyshape,
    getEndbyshape,
    getLocation,
    getAngle
}