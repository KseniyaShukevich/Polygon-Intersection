import isIntersection from './isIntersection';
import Point from './Point';
import Line from './Line';

export default function inPolygon(mousePoint, polygon) {
    const xCoordinates = polygon.coordinates.map((point) => point.x);
    const maxX = Math.max(...xCoordinates);
    let countCrossed = 0;
    polygon.coordinates.forEach((point, index) => {
        let nextIndex = index + 1;
        if (!polygon.coordinates[nextIndex]) {
            return;
        }
     
        const polygonLine = new Line(point, polygon.coordinates[nextIndex]);
        const testLine = new Line(mousePoint, new Point(maxX + 1, mousePoint.z));
        if (isIntersection(polygonLine, testLine)) {
            countCrossed += 1;
        }
    });
        
    return ((countCrossed % 2 !== 0));
}