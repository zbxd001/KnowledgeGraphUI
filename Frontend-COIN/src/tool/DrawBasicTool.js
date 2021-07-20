var context = undefined;
var canvasElement = undefined;

function setCanvas(canvas) {
    var ctx = canvas.getContext("2d");
    canvasElement = canvas;
    context = ctx;
    context.textAlign = 'center';
}

/**
 * 
 * @param { MouseEvent } event 
 * @returns {{ x:Number, y:Number }}
 */
function getPointbyMouseEvent(event) {
    let point = {};
    let rect = canvasElement.getBoundingClientRect();
    point.x = event.clientX - rect.left;
    point.y = event.clientY - rect.top;
    if (point.x <= 0) {
        point.x = 0;
    }
    if (point.y <= 0) {
        point.y = 0;
    }
    if (point.x >= 1000) {
        point.x = 1000;
    }
    if (point.y >= 500) {
        point.y = 500;
    }

    return point;
}

/**
 * 清空画布
 */
function clearCanvas() {
    context.clearRect(0, 0, 1000, 500)
}

//给定起始点和终点，画一条实线或虚线
function drawLine(start, end, isSolidline) {
    if (isSolidline == true) {
        context.beginPath();
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
    }
    if (isSolidline == false) {
        context.beginPath();
        context.setLineDash([5, 2]);
        context.moveTo(start.x, start.y);
        context.lineTo(end.x, end.y);
        context.stroke();
        context.setLineDash([]);
    }

}


//实体在迭代一中的大小是80*50，迭代二中添加正方形实体64*64
function drawSquare(topLeft, downRight, color) {

    context.fillStyle = color;
    context.fillRect(topLeft.x, topLeft.y, downRight.x - topLeft.x, downRight.y - topLeft.y);
    context.fillStyle = 'black';


}

function modSquare(topLeft, downRight, color, i) {

    context.fillStyle = color;
    context.fillRect((topLeft.x) / i, (topLeft.y) / i, (downRight.x - topLeft.x) * i, (downRight.y - topLeft.y) * i);
    context.fillStyle = 'black';


}
//修改半径的方法
function modCircle(center, color, r) {
    //TODO,需要动态调整半径
    context.fillStyle = color;
    context.beginPath();
    context.arc(center.x, center.y, r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.fillStyle = 'black';


}
//添加了画圆的方法，圆的半径是35
function drawCircle(center, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(center.x, center.y, 35, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
    context.fillStyle = 'black';


}
//根据顶点绘制方向箭头
function drawArrow(topPoint, angle) {

    if (angle == 0) {

        context.beginPath();
        context.moveTo(topPoint.x, topPoint.y);
        context.lineTo(topPoint.x - 5, topPoint.y + 3);
        context.lineTo(topPoint.x - 5, topPoint.y - 3);
        context.lineTo(topPoint.x, topPoint.y);
        context.fill();

    }
    if (angle == 90) {
        context.beginPath();
        context.moveTo(topPoint.x, topPoint.y);
        context.lineTo(topPoint.x - 3, topPoint.y - 5);
        context.lineTo(topPoint.x + 3, topPoint.y - 5);
        context.lineTo(topPoint.x, topPoint.y);
        context.fill();
    }
    if (angle == 180) {
        context.beginPath();
        context.moveTo(topPoint.x, topPoint.y);
        context.lineTo(topPoint.x + 5, topPoint.y + 3);
        context.lineTo(topPoint.x + 5, topPoint.y - 3);
        context.lineTo(topPoint.x, topPoint.y);
        context.fill();
    }
    if (angle == 270) {
        context.beginPath();
        context.moveTo(topPoint.x, topPoint.y);
        context.lineTo(topPoint.x + 3, topPoint.y + 5);
        context.lineTo(topPoint.x - 3, topPoint.y + 5);
        context.lineTo(topPoint.x, topPoint.y);
        context.fill();
    }

}
//在指定的位置处写字
function writeWord(location, word) {
    context.strokeStyle = "black"
    context.strokeText(word, location.x, location.y + 4);
}

function searchWord(location, word) {
    console.log("最后一道测试")
    context.strokeStyle = "white"
    context.strokeText(word, location.x, location.y + 4);
}
//修改字体
function modWord(location, word, size) {
    context.font = size + ' 微软雅黑'
    context.strokeStyle = "black"
    context.strokeText(word, location.x, location.y + 4);
}

function searchTag(location, word) {
    console.log("测试颜色")
    context.strokeStyle = "white"
    context.strokeText(word, location.x, location.y + 4)
}

//迭代一长方形实体自我连接的方法
function drawself(start, isSolidline, name) {
    context.beginPath();
    let a = start;
    if (isSolidline == false) { context.setLineDash([5, 2]); }
    context.moveTo(a.x, a.y - 25);
    context.lineTo(a.x, a.y - 50);
    context.lineTo(a.x - 80, a.y - 50);
    context.lineTo(a.x - 80, a.y + 50);
    context.lineTo(a.x, a.y + 50);
    context.lineTo(a.x, a.y + 25);
    context.stroke();
    drawArrow({ x: a.x, y: a.y + 25 }, 270);
    writeWord({ x: a.x - 42, y: a.y - 56 }, name);

}
//迭代二正方形实体自我连接的方法
function squareSelf(start, isSolidline, name) {
    context.beginPath();
    let a = start;
    if (isSolidline == false) { context.setLineDash([5, 2]); }
    context.moveTo(a.x, a.y - 32);
    context.lineTo(a.x, a.y - 50);
    context.lineTo(a.x - 80, a.y - 50);
    context.lineTo(a.x - 80, a.y + 50);
    context.lineTo(a.x, a.y + 50);
    context.lineTo(a.x, a.y + 32);
    context.stroke();
    drawArrow({ x: a.x, y: a.y + 32 }, 270);
    writeWord({ x: a.x - 42, y: a.y - 56 }, name);

}
//迭代二圆形实体自我连接的方法
function circleSelf(start, isSolidline, name) {
    context.beginPath();
    let a = start;
    if (isSolidline == false) { context.setLineDash([5, 2]); }
    context.moveTo(a.x, a.y - 35);
    context.lineTo(a.x, a.y - 50);
    context.lineTo(a.x - 80, a.y - 50);
    context.lineTo(a.x - 80, a.y + 50);
    context.lineTo(a.x, a.y + 50);
    context.lineTo(a.x, a.y + 35);
    context.stroke();
    drawArrow({ x: a.x, y: a.y + 35 }, 270);
    writeWord({ x: a.x - 42, y: a.y - 56 }, name);
}

export {
    setCanvas,
    drawLine,
    drawSquare,
    drawArrow,
    writeWord,
    drawself,
    drawCircle,
    squareSelf,
    circleSelf,
    getPointbyMouseEvent,
    modCircle,
    modSquare,
    modWord,
    searchTag,
    searchWord,
    clearCanvas
}