import isIntersection from './isIntersection';

export default function inPolygon(x, y, polygon) {
    const xCoordinates = polygon.coordinates.map((point) => point[0]);
    const maxX = Math.max(...xCoordinates);
    let countCrossed = 0;
    polygon.coordinates.forEach((point, index) => {
        let nextIndex = index + 1;
        if (!polygon.coordinates[nextIndex]) {
            return;
        }
      
        const polygonLine = [point, polygon.coordinates[nextIndex]];
        const testLine = [[x, y], [maxX + 1, y]];
        if (isIntersection(polygonLine, testLine)) {
            countCrossed += 1;
        }
    });
        
    return ((countCrossed % 2 !== 0));
}