import polygons from './polygons';
import isIntersection from './isIntersection';
import general from './general';

function crossLines(draggingPolygon, polygon) {
    if (!draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.push(polygon.id);
        draggingPolygon.isCrossLine = true;
    }
    if (!polygon.arrIntersections.includes(draggingPolygon.id)) {
        polygon.arrIntersections.push(draggingPolygon.id);
        polygon.isCrossLine = true;
        general.priority += 1;
        draggingPolygon.priority = general.priority;
    }
}

function isCrossedLines(draggingPolygon, nextDraggingIndex, draggingPoint, polygon) {
    let isCrossed = false;
    polygon.coordinates.forEach((point, index) => {
        let nextIndexCoordinates = index + 1;
        if (!polygon.coordinates[nextIndexCoordinates]) {
            return;
        }

        const draggingLine = [draggingPoint, draggingPolygon.coordinates[nextDraggingIndex]];
        const polygonLine = [point, polygon.coordinates[nextIndexCoordinates]];
        if (isIntersection(draggingLine, polygonLine)) {
            isCrossed = true;
            return;
        }
    });

    return isCrossed;
}

function checkAndDeleteConnection(draggingPolygon, polygon){
    if (draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.splice(draggingPolygon.arrIntersections.indexOf(polygon.id), 1);
        polygon.arrIntersections.splice(polygon.arrIntersections.indexOf(draggingPolygon.id), 1);
    }
};

function checkAndChangeCrossLine(draggingPolygon, polygon) {
    if (!draggingPolygon.arrIntersections.length) {
        draggingPolygon.isCrossLine = false;
    }

    if (!polygon.arrIntersections.length) {
        polygon.isCrossLine = false;
    }
}

function changeProperties(draggingPolygon, polygon) {
    checkAndDeleteConnection(draggingPolygon, polygon);
    checkAndChangeCrossLine(draggingPolygon, polygon);
}

function isCrossedPolygons(draggingPolygon, polygon, draggingPoint, nextDraggingIndex, arrIntersections ) {
    let isCrossed = false;
    if ((draggingPolygon.id !== polygon.id) && !arrIntersections.includes(polygon.id)) {
        if (!isCrossed) {
            isCrossed = isCrossedLines(draggingPolygon, nextDraggingIndex, draggingPoint, polygon);
            if (isCrossed) {
                crossLines(draggingPolygon, polygon);
                arrIntersections.push(polygon.id);
            } else {
                changeProperties(draggingPolygon, polygon);
            }
        }   
    }

    return isCrossed;
}

function mapDraggingCoordinates(draggingPolygon, polygons) {
    const arrIntersections = [];
    draggingPolygon.coordinates.forEach((draggingPoint, index) => {
        let nextDraggingIndex = index + 1;
        if (!draggingPolygon.coordinates[nextDraggingIndex]) {
            return;
        }
        polygons.forEach((polygon) => {
            isCrossedPolygons(draggingPolygon, polygon, draggingPoint, nextDraggingIndex, arrIntersections);
        });
    })
}

export default function mouseup() {
    general.changeOldMousePosition(null, null);
    const draggingPolygon = polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        draggingPolygon.isDragging = false;
        mapDraggingCoordinates(draggingPolygon, polygons);
        draggingPolygon.clear();
        polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        }).forEach((polygon) => {
            polygon.draw();
        });
    }
}
