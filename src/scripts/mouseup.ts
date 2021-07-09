import canvasClass from './CanvasClass';
import isIntersection from './isIntersection';
import Line from './Line';
import Polygon from './Polygon';
import { getLines } from './services';

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
    draggingLine: Line, 
    polygon: Polygon
    ): boolean {

    const lines = getLines(polygon);
    let isCrossed: boolean = false;
   
    lines.forEach((line) => {
        if (isIntersection(draggingLine, line)) {
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
    draggingLine: Line,
    arrIntersections: Array<string | never>
    ): void {

    if ((draggingPolygon.id !== polygon.id) && !arrIntersections.includes(polygon.id)) {
        let isCrossed = false;
        isCrossed = isCrossedLines(draggingLine, polygon);
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
    const linesDragging = getLines(draggingPolygon);
    linesDragging.forEach((line) => {
        polygons.forEach((polygon) => {
            if (polygon.isCloned) {
                mapPolygon(draggingPolygon, polygon, line, arrIntersections);
            }
        });
    });
}

export default function mouseup(): void {
    const draggingPolygon = canvasClass.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        draggingPolygon.isDragging = false;
        mapDraggingCoordinates(draggingPolygon, canvasClass.polygons);
        canvasClass.draw();
    }
}
