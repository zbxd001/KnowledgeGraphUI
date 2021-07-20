import { getLocation } from "./CalculateTool";

let realObjectList = [];
let relationList = [];
let primitiveList = [];
let successUserList = [];

function getObjectbyPoint(p) {
    let length = realObjectList.length;
    for (let index = length - 1; index >= 0; index--) {
        let realObject = realObjectList[index];
        // 检查
        if (realObjectSelected(realObject, p)) {
            return realObject;
        }
    }
}

function realObjectSelected(realObject, p) {
    let a = true;
    let shape = getPrimitivebyID(realObject.primitiveID).shape;

    if (p.x > realObject.x + 32 && shape === "square") a = false;
    if (p.x < realObject.x - 32 && shape === "square") a = false;
    if (p.y > realObject.y + 32 && shape === "square") a = false;
    if (p.y < realObject.y - 32 && shape === "square") a = false;

    if (p.x > realObject.x + 25 && shape === "rectangle") a = false;
    if (p.x < realObject.x - 25 && shape === "rectangle") a = false;
    if (p.y > realObject.y + 40 && shape === "rectangle") a = false;
    if (p.y < realObject.y - 40 && shape === "rectangle") a = false;

    if (Math.pow((p.y - realObject.y), 2) + Math.pow((p.x - realObject.x), 2) > 4096 && shape === "circle") a = false;

    return a;
}

//迭代一旧方法
function setData(txt) {
    try {
        let data = JSON.parse(txt);
        realObjectList = data.realObjectList || [];
        relationList = data.relationList || [];
    } catch (e) {
        console.log(e)
    }
}
//迭代一旧方法
function getAll() {
    return JSON.stringify({
        realObjectList,
        relationList
    })
}

//为图元创造id
function createPrimitiveId() {
    let id = 0;
    let used = true;
    while (used) {
        used = false;
        for (let primitive of primitiveList) {
            if (primitive.ID === "" + id) {
                id++;
                used = true;
            }
        }
    }
    return id + "";

}
//为实体创造id
function createObjectId() {
    let id = 0;
    let used = true;
    while (used) {
        used = false;
        for (let object of realObjectList) {
            if (object.SID === "" + id) {
                id++;
                used = true;
            }
        }
    }
    return id + "";

}
//为关系创造id
function createRelationId() {
    let id = 0;
    let used = true;
    while (used) {
        used = false;
        for (let relation of relationList) {
            if (relation.ID === "L" + id) {
                id++;
                used = true;
            }
        }
    }
    return "L" + id;
}

function newPrimitive(id, color, shape, name) {
    // eslint-disable-next-line no-unused-vars
    let sid = createPrimitiveId();
    let primitive = {
        "ID": id,
        "color": color,
        "shape": shape,
        "name": name
    };
    primitiveList.push(primitive);
    return primitive;
}

function newRelation(id, start, end, name, isSolidline) {
    // eslint-disable-next-line no-unused-vars
    let sid = createRelationId();
    let relation = {
        "ID": id,
        "start": start,
        "end": end,
        "name": name,
        "isSolidline": isSolidline
    };
    relationList.push(relation);
    return relation;

}

function newObject(color, name) {
    let id = createObjectId();
    let object = {
        "ID": id,
        "color": color,
        "name": name
    };
    realObjectList.push(object);
    return object;
}

function newSuccUser(id,username,email) {
    successUserList = []
    let succUser = {
        "ID": id,
        "userName": username,
        "email": email
    };
    console.log("信息加入")
    successUserList.push(id);
    successUserList.push(username);
    successUserList.push(email);
    console.log(successUserList)
    return successUserList
}

function newObjectByPrimitive(id, name, primitive, fontsize, radius, i) {

    let sid = createObjectId();
    let location = getLocation(sid);

    let object = {
        "ID": id,
        "SID": sid,
        "primitiveID": primitive.ID,
        "name": name,
        "x": location.x,
        "y": location.y,
        "fontsize1": fontsize,
        "radius1": radius,
        "i": i
    };
    realObjectList.push(object);
    return object;
}

function importObjectByPrimitive(id, name, primitiveID, x, y) {
    let object = {
        "ID": id,
        "primitiveID": primitiveID,
        "name": name,
        "x": x,
        "y": y,
        "fontsize1": "10px",
        "radius1": "35",
        "i": 1
    };
    realObjectList.push(object);
    return object;
}

function newObjectByPrimitive1(id, name, primitiveID, fontsize, radius, i) {

    let sid = createObjectId();
    let location = getLocation(sid);

    let object = {
        "ID": id,
        "SID": sid,
        "primitiveID": primitiveID,
        "name": name,
        "x": location.x,
        "y": location.y,
        "fontsize1": fontsize,
        "radius1": radius,
        "i": i,
    };
    realObjectList.push(object);
    return object;
}

//根据id获取图元
function getPrimitivebyID(id) {
    let primitiveListLength = primitiveList.length;
    for (let index = 0; index < primitiveListLength; index++) {
        let primitive = primitiveList[index];
        if (primitive.ID == id) {
            return primitive;
        }
    }
}


//根据id获取实体
function getRealObjectbyID(id) {
    let realObjectListLength = realObjectList.length;
    for (let index = 0; index < realObjectListLength; index++) {
        let object = realObjectList[index];
        if (object.ID == id) {
            return object;
        }
    }
}

//根据id获取图元的位置信息
function getLocationbyID(id) {
    const realObject = getRealObjectbyID(id);
    return { x: realObject.x, y: realObject.y };
}


//根据实体id获取图元的形状
function getShapebyID(id) {
    const realObject = getRealObjectbyID(id)
    let primitive = getPrimitivebyID(realObject.primitiveID);
    return primitive.shape;
}


function deleteRelation(id) {
    let index;
    let relationListLength = relationList.length;
    for (index = 0; index < relationListLength; index++) {
        let relation = relationList[index];
        if (relation.ID === id) {
            break;
        }
    }
    relationList.splice(index, 1);
}

function deletePrimitive(id) {
    let index;
    let primitiveListLength = primitiveList.length;
    for (index = 0; index < primitiveListLength; index++) {
        let primitive = primitiveList[index];
        if (primitive.ID === id) {
            break;
        }
    }
    primitiveList.splice(index, 1)
}

function deleteObject(id) {
    let index;
    let realObjectListLength = realObjectList.length;
    for (index = 0; index < realObjectListLength; index++) {
        let realObject = realObjectList[index];
        if (realObject.ID === id) {
            break;
        }
    }
    realObjectList.splice(index, 1);

}

function getPrimitiveList() {
    return primitiveList;
}

function clearLoginList() {
    console.log("没有调用这个")
    successUserList = []
}

function getRelationList() {
    return relationList;
}

function getObjectList() {
    return realObjectList;
}

function getSuccUserList() {
    console.log("测试登陆表")
    console.log(successUserList)
    return successUserList;
}
function clearData() {
    realObjectList = [];
    relationList = [];
    primitiveList = [];
}

export {
    getRealObjectbyID,
    clearData,
    newObjectByPrimitive,
    getAll,
    createPrimitiveId,
    getPrimitiveList,
    setData,
    newRelation,
    newObject,
    deleteRelation,
    deleteObject,
    getRelationList,
    getObjectList,
    createObjectId,
    createRelationId,
    getLocationbyID,
    newPrimitive,
    getShapebyID,
    deletePrimitive,
    getObjectbyPoint,
    getPrimitivebyID,
    newObjectByPrimitive1,
    getSuccUserList,
    newSuccUser,
    clearLoginList,
    importObjectByPrimitive
}