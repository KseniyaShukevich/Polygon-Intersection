import arrObjPolygons from './polygons';
import isIntersection from './isIntersection';
import general from './general';

function crossLines(dragElem, obj) {
    if (!dragElem.arrIntersections.includes(obj.id)) {
        dragElem.arrIntersections.push(obj.id);
        dragElem.isCrossLine = true;
    }
    if (!obj.arrIntersections.includes(dragElem.id)) {
        obj.arrIntersections.push(dragElem.id);
        obj.isCrossLine = true;
        general.priority += 1;
        dragElem.priority = general.priority;
    }
}

function isCrossedLines(dragElem, nextIndexElem, elem, obj) {
    let isCrossed = false;
    obj.coords.forEach((coord, indexCoords) => {
        let nextIndexCoords = indexCoords + 1;
        if (!obj.coords[nextIndexCoords]) {
            return;
        }
        if (isIntersection([elem, dragElem.coords[nextIndexElem]], [coord, obj.coords[nextIndexCoords]])) {
            isCrossed = true;
            return;
        }
    });

    return isCrossed;
}

function checkAndDeleteConnection(dragElem, obj){
    if (dragElem.arrIntersections.includes(obj.id)) {
        dragElem.arrIntersections.splice(dragElem.arrIntersections.indexOf(obj.id), 1);
        obj.arrIntersections.splice(obj.arrIntersections.indexOf(dragElem.id), 1);
    }
};

function checkAndChangeIsCrossLine(dragElem, obj) {
    if (!dragElem.arrIntersections.length) {
        dragElem.isCrossLine = false;
    }

    if (!obj.arrIntersections.length) {
        obj.isCrossLine = false;
    }
}

function changeElemProps(dragElem, obj) {
    checkAndDeleteConnection(dragElem, obj);
    checkAndChangeIsCrossLine(dragElem, obj);
}

function checkObjIsCrossed(dragElem, obj, elem, nextIndexElem, arrIntersections ) {
    let isCrossed = false;
    if ((dragElem.id !== obj.id) && !arrIntersections.includes(obj.id)) {
        if (!isCrossed) {
            isCrossed = isCrossedLines(dragElem, nextIndexElem, elem, obj);
            if (isCrossed) {
                crossLines(dragElem, obj);
                arrIntersections.push(obj.id);
            } else {
                changeElemProps(dragElem, obj);
            }
        }   
    }

    return isCrossed;
}

function mapDragElemCoords(dragElem, arrObj) {
    const arrIntersections = [];
    dragElem.coords.forEach((elem, indexElem) => {
        let nextIndexElem = indexElem + 1;
        if (!dragElem.coords[nextIndexElem]) {
            return;
        }
        arrObj.forEach((obj) => {
            checkObjIsCrossed(dragElem, obj, elem, nextIndexElem, arrIntersections);
        });
    })
}

export default function mouseup() {
    general.changeOldMousePos(null, null);
    const dragElem = arrObjPolygons.find((elem) => elem.isDrag);
    if (dragElem) {
        dragElem.isDrag = false;
        mapDragElemCoords(dragElem, arrObjPolygons);
        dragElem.clear();
        arrObjPolygons.sort((elem1, elem2) => {
            return elem1.priority - elem2.priority;
        }).forEach((elem) => {
            elem.draw();
        });
    }
}
