import isIntersection from './isIntersection';
import Point from './Point';
import Line from './Line';
import Polygon from './Polygon';
import { getLines } from './services';

function haveSameZ(
    coordinates: Array<Point>, 
    mousePoint: Point
    ): boolean {

    let isSame = false;
    coordinates.forEach((point) => {
        if (point.z === mousePoint.z) {
            isSame = true;
        }
    });

    return isSame;
}

function checkCircle(
    mousePoint: Point, 
    polygon: Polygon
    ): boolean {

    const differenceX = mousePoint.x - polygon.position.x;
    const differenceZ = mousePoint.z - polygon.position.z;
    const lengthLine = Math.sqrt(differenceX * differenceX + differenceZ * differenceZ);
    if (lengthLine < polygon.circleData.r) {
        return true;
    }
    return false;
}

function calcCountCrossed(
    mousePoint: Point,
    polygon: Polygon
    ): number {
    
    const xCoordinates: Array<number> = polygon.coordinates.map((point) => point.x);
    const lines = getLines(polygon);
    const maxX: number = Math.max(...xCoordinates);
    let countCrossed: number = 0;

    lines.forEach((line) => {
        const testLine: Line = new Line(mousePoint, new Point(maxX + 1, mousePoint.z));
        if (isIntersection(line, testLine)) {
                countCrossed += 1;
            }
    })

    return countCrossed;
}

function checkPolygon(
    mousePoint: Point, 
    polygon: Polygon
    ): boolean {
        
    let countCrossed = calcCountCrossed(mousePoint, polygon);

    if (haveSameZ(polygon.coordinates, mousePoint)) {
        return ((countCrossed % 4 !== 0));
    }

    return ((countCrossed % 2 !== 0));
}
 
export default function inPolygon(
    mousePoint: Point, 
    polygon: Polygon
    ): boolean {

    if (polygon.isCircle) {
        return checkCircle(mousePoint, polygon);
    } else {
        return checkPolygon(mousePoint, polygon)
    }
}