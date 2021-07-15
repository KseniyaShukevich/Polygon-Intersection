import isIntersection from './isIntersection';
import Point from './Point';
import Line from './Line';
import Polygon from './Polygon';
import { getLines } from './services';

function checkCircle(
    mousePoint: Point, 
    polygon: Polygon,
): boolean {

    const differenceX: number = mousePoint.x - polygon.circleData.x;
    const differenceZ: number = mousePoint.z - polygon.circleData.z;
    const lengthLine: number = Math.sqrt(differenceX * differenceX + differenceZ * differenceZ);

    return lengthLine < polygon.circleData.r;
}

function calcCountCrossed(
    mousePoint: Point,
    polygon: Polygon,
): number {
    
    const xCoordinates: Array<number> = polygon.coordinates.map((point) => point.x);
    const lines: Array<Line> = getLines(polygon);
    const maxX: number = Math.max(...xCoordinates);

    return  lines.reduce((count, line) => {
                const testLine: Line = new Line(mousePoint, new Point(maxX + 1, mousePoint.z));

                if (isIntersection(line, testLine)) {
                        return count += 1;
                    }
                
                return count;
            }, 0);

}

function checkPolygon(
    mousePoint: Point, 
    polygon: Polygon,
): boolean {

    const countCrossed: number = calcCountCrossed(mousePoint, polygon);

    if (polygon.coordinates.some((point) => point.z === mousePoint.z)) {

        return countCrossed % 4 !== 0;
    }

    return countCrossed % 2 !== 0;
}
 
export default function inPolygon(
    mousePoint: Point, 
    polygon: Polygon,
): boolean {

    if (polygon.isCircle) {

        return checkCircle(mousePoint, polygon);
    } else {

        return checkPolygon(mousePoint, polygon);
    }
}