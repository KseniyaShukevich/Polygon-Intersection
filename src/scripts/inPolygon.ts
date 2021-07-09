import isIntersection from './isIntersection';
import Point from './Point';
import Line from './Line';
import Polygon from './Polygon';
import { getLines } from './services';

function haveSameZ(coordinates: Array<Point>, mousePoint: Point) {
    let isSame = false;
    coordinates.forEach((point) => {
        if (point.z === mousePoint.z) {
            isSame = true;
        }
    });

    return isSame;
}
 
export default function inPolygon(
    mousePoint: Point, 
    polygon: Polygon
    ): boolean {
        
    const xCoordinates: Array<number> = polygon.coordinates.map((point) => point.x);
    const maxX: number = Math.max(...xCoordinates);
    let countCrossed: number = 0;

    const lines = getLines(polygon);
    lines.forEach((line) => {
        const testLine: Line = new Line(mousePoint, new Point(maxX + 1, mousePoint.z));
        if (isIntersection(line, testLine)) {
                countCrossed += 1;
            }
    })

    if (haveSameZ(polygon.coordinates, mousePoint)) {
        return ((countCrossed % 4 !== 0));
    }

    return ((countCrossed % 2 !== 0));
}