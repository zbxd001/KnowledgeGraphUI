import { getAngle, getStartbyshape, getEndbyshape, } from "./CalculateTool"
import {
    //drawRealObject, 
    drawRelation,
    realObjectDraw,
    modRealObject,
    searchRelation
} from "./DrawTool"
import { drawself, squareSelf, circleSelf } from "./DrawBasicTool"
import { getLocationbyID, getShapebyID } from "./MapHelper";


function paintRealObjet(realobject) {
    realObjectDraw(realobject);
    //let centerpoint = getLocation(realobject.ID);
    //drawRealObject(realobject, centerpoint);
}

// eslint-disable-next-line no-unused-vars
function modifyRealObject(realobject, r, i, size) {
    modRealObject(realobject, r, i, size);
}

function paintRelation(relation) {

    let center1 = getLocationbyID(relation.start);

    let center2 = getLocationbyID(relation.end);

    let shape1 = getShapebyID(relation.start);
    let shape2 = getShapebyID(relation.end);

    if (center1.x === center2.x && center1.y === center2.y) {

        if (shape1 === "rectangle") drawself(center1, relation.isSolidline, relation.name)
        if (shape1 === "square") squareSelf(center1, relation.isSolidline, relation.name)
        if (shape1 === "circle") circleSelf(center1, relation.isSolidline, relation.name)

        return;
    }

    let start = getStartbyshape(center1, center2, shape1);
    let end = getEndbyshape(center1, center2, shape2);
    let angle = getAngle(start, end);

    drawRelation(start, end, relation.isSolidline, relation.name, angle)

}

function searchRelation2(relation) {
    let center1 = getLocationbyID(relation.start);
    let center2 = getLocationbyID(relation.end);
    let shape1 = getShapebyID(relation.start);
    let shape2 = getShapebyID(relation.end);
    if (center1.x === center2.x && center1.y === center2.y) {
        if (shape1 === "rectangle") drawself(center1, relation.isSolidline, relation.name)
        if (shape1 === "square") squareSelf(center1, relation.isSolidline, relation.name)
        if (shape1 === "circle") circleSelf(center1, relation.isSolidline, relation.name)
    }
    let start = getStartbyshape(center1, center2, shape1);
    let end = getEndbyshape(center1, center2, shape2);
    let angle = getAngle(start, end);
    searchRelation(start, end, relation.isSolidline, relation.name, angle)
}

function paint(realObjectList, relationList) {
    let relationListLength = relationList.length;
    for (let i = 0; i < relationListLength; i++) {
        let relation = relationList[i];
        paintRelation(relation);
    }

    let ObjectListLength = realObjectList.length;
    for (let i = 0; i < ObjectListLength; i++) {
        let realObject = realObjectList[i];
        paintRealObjet(realObject);
    }
}


export {
    paintRealObjet,
    paintRelation,
    paint,
    searchRelation2
}