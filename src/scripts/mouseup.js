import canvasClass from './CanvasClass';
import isIntersection from './isIntersection';
import general from './general';

function crossLines(draggingPolygon, polygon) {
    if (!draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.push(polygon.id);
    }
    if (!polygon.arrIntersections.includes(draggingPolygon.id)) {
        polygon.arrIntersections.push(draggingPolygon.id);
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

function deleteConnection(draggingPolygon, polygon){
    if (draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.splice(draggingPolygon.arrIntersections.indexOf(polygon.id), 1);
        polygon.arrIntersections.splice(polygon.arrIntersections.indexOf(draggingPolygon.id), 1);
    }
};

function mapPolygon(draggingPolygon, polygon, draggingPoint, nextDraggingIndex, arrIntersections ) {
    if ((draggingPolygon.id !== polygon.id) && !arrIntersections.includes(polygon.id)) {
        let isCrossed = false;
        isCrossed = isCrossedLines(draggingPolygon, nextDraggingIndex, draggingPoint, polygon);
        if (isCrossed) {
            crossLines(draggingPolygon, polygon);
            arrIntersections.push(polygon.id);
        } else {
            deleteConnection(draggingPolygon, polygon);
        }
    }
}

function mapDraggingCoordinates(draggingPolygon, polygons) {
    const arrIntersections = [];
    draggingPolygon.coordinates.forEach((draggingPoint, index) => {
        let nextDraggingIndex = index + 1;
        if (!draggingPolygon.coordinates[nextDraggingIndex]) {
            return;
        }
        polygons.forEach((polygon) => {
            mapPolygon(draggingPolygon, polygon, draggingPoint, nextDraggingIndex, arrIntersections);
        });
    })
}

export default function mouseup() {
    general.changeOldMousePosition(null, null);
    const draggingPolygon = canvasClass.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        draggingPolygon.isDragging = false;
        mapDraggingCoordinates(draggingPolygon, canvasClass.polygons);
        canvasClass.draw();
    }
}
