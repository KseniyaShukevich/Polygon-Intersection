import canvasClass from './CanvasClass';
import isIntersection from './isIntersection';
import Line from './Line';
import Polygon from './Polygon';
import Point from './Point';

let priority = 0;

function crossLines(
    draggingPolygon: Polygon, 
    polygon: Polygon
    ): void {

    if (!draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.push(polygon.id);
    }
    if (!polygon.arrIntersections.includes(draggingPolygon.id)) {
        polygon.arrIntersections.push(draggingPolygon.id);
        draggingPolygon.priority = ++priority;
    }
}

function isCrossedLines(
    draggingPolygon: Polygon, 
    nextDraggingIndex: number, 
    draggingPoint: Point, 
    polygon: Polygon
    ): boolean {

    let isCrossed: boolean = false;

    polygon.coordinates.forEach((point, index) => {
        let nextIndexCoordinates: number = index + 1;
        if (!polygon.coordinates[nextIndexCoordinates]) {
            return;
        }
        const draggingLine: Line = new Line(draggingPoint, draggingPolygon.coordinates[nextDraggingIndex]);
        const polygonLine: Line = new Line(point, polygon.coordinates[nextIndexCoordinates]);
        if (isIntersection(draggingLine, polygonLine)) {
            isCrossed = true;
            return;
        }
    });

    return isCrossed;
}

function deleteConnection(
    draggingPolygon: Polygon, 
    polygon: Polygon
    ): void {

    if (draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.splice(draggingPolygon.arrIntersections.indexOf(polygon.id), 1);
        polygon.arrIntersections.splice(polygon.arrIntersections.indexOf(draggingPolygon.id), 1);
    }
};

function mapPolygon(
    draggingPolygon: Polygon, 
    polygon: Polygon, 
    draggingPoint: Point, 
    nextDraggingIndex: number, 
    arrIntersections: Array<string | never>
    ): void {

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

function mapDraggingCoordinates(
    draggingPolygon: Polygon, 
    polygons: Array<Polygon>
    ): void {
        
    const arrIntersections: Array<string | never> = [];
    draggingPolygon.coordinates.forEach((draggingPoint, index) => {
        let nextDraggingIndex = index + 1;
        if (!draggingPolygon.coordinates[nextDraggingIndex]) {
            return;
        }
        polygons.forEach((polygon) => {
            if (polygon.isCloned) {
                mapPolygon(draggingPolygon, polygon, draggingPoint, nextDraggingIndex, arrIntersections);
            }
        });
    })
}

export default function mouseup(): void {
    const draggingPolygon = canvasClass.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        draggingPolygon.isDragging = false;
        mapDraggingCoordinates(draggingPolygon, canvasClass.polygons);
        canvasClass.draw();
    }
}
