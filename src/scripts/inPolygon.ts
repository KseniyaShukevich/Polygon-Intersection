import isIntersection from './isIntersection';
import Point from './Point';
import Line from './Line';
import Polygon from './Polygon';

export default function inPolygon(mousePoint: Point, polygon: Polygon): boolean {
    const xCoordinates: Array<number> = polygon.coordinates.map((point) => point.x);
    const maxX: number = Math.max(...xCoordinates);
    let countCrossed: number = 0;
    polygon.coordinates.forEach((point, index) => {
        let nextIndex: number = index + 1;
        if (!polygon.coordinates[nextIndex]) {
            return;
        }
     
        const polygonLine: Line = new Line(point, polygon.coordinates[nextIndex]);
        const testLine: Line = new Line(mousePoint, new Point(maxX + 1, mousePoint.z));
        if (isIntersection(polygonLine, testLine)) {
            countCrossed += 1;
        }
    });
        
    return ((countCrossed % 2 !== 0));
}