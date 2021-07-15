import canvasClass from './CanvasClass';
import isIntersection from './isIntersection';
import Line from './Line';
import Polygon from './Polygon';
import { getLines } from './services';
import isIntersectionCircle from './isIntersectionCircle';
import isIntersectionCircles from './isIntesectionCircles';

let priority = 0;

function crossPolygons(
    draggingPolygon: Polygon, 
    polygon: Polygon,
): void {

    if (!draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.push(polygon.id);
    }

    if (!polygon.arrIntersections.includes(draggingPolygon.id)) {
        polygon.arrIntersections.push(draggingPolygon.id);
        draggingPolygon.priority = ++priority;
    }
}

function deleteConnection(
    draggingPolygon: Polygon, 
    polygon: Polygon,
): void {

    if (draggingPolygon.arrIntersections.includes(polygon.id)) {
        draggingPolygon.arrIntersections.splice(draggingPolygon.arrIntersections.indexOf(polygon.id), 1);
        polygon.arrIntersections.splice(polygon.arrIntersections.indexOf(draggingPolygon.id), 1);
    }
};

function managePolygons(
    draggingPolygon: Polygon,
    polygon: Polygon,
    arrIntersections: Array<string | never>,
    callback: any,
    firstArgument: any,
): void {

    if ((draggingPolygon.id !== polygon.id) && !arrIntersections.includes(polygon.id)) {
        let isCrossed: boolean = false;

        isCrossed = callback(firstArgument, polygon);

        if (isCrossed) {
            crossPolygons(draggingPolygon, polygon);
            arrIntersections.push(polygon.id);
        } else {
            deleteConnection(draggingPolygon, polygon);
        }

    }
}

function isCrossedLines(
    draggingLine: Line, 
    polygon: Polygon,
): boolean {

    if (polygon.isCircle) {

        return isIntersectionCircle(draggingLine, polygon);
    }

    const lines: Array<Line> = getLines(polygon);

    return lines.some((line) => isIntersection(line, draggingLine));
}

function isCrossedCircle(
    draggingPolygon: Polygon,
    polygon: Polygon,
): boolean {

    if (draggingPolygon.isCircle && polygon.isCircle) {
        
        return isIntersectionCircles(draggingPolygon, polygon);
    }

    const lines: Array<Line> = getLines(polygon);
    
    return lines.some((line) => isIntersectionCircle(line, draggingPolygon));
}

function mapDraggingCoordinates(
    draggingPolygon: Polygon, 
    polygons: Array<Polygon>,
    arrIntersections: Array<string | never>, 
): void {

    const linesDragging: Array<Line> = getLines(draggingPolygon);

    linesDragging.forEach((line) => {
        polygons.forEach((polygon) => {
            if (polygon.isCloned) {

                managePolygons(
                    draggingPolygon, 
                    polygon, 
                    arrIntersections, 
                    isCrossedLines, 
                    line,
                );
            }
        });
    });
}

function mapPolygons(
    draggingPolygon: Polygon, 
    polygons: Array<Polygon>,
    arrIntersections: Array<string | never>,
): void {

    polygons.forEach((polygon) => {
        if (polygon.isCloned) {

            managePolygons(
                draggingPolygon, 
                polygon, 
                arrIntersections, 
                isCrossedCircle, 
                draggingPolygon,
            );
        }
    });
}

export default function mouseup(): void {
    const draggingPolygon: Polygon = canvasClass.polygons.find((polygon) => polygon.isDragging);

    if (draggingPolygon) {
        const arrIntersections: Array<string | never> = [];

        draggingPolygon.isDragging = false;

        if (draggingPolygon.isCircle) {
            mapPolygons(draggingPolygon, canvasClass.polygons, arrIntersections);
        } else {
            mapDraggingCoordinates(draggingPolygon, canvasClass.polygons, arrIntersections);
        }

        canvasClass.draw();
    }
}
