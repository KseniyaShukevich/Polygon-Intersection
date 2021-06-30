import isIntersection from './isIntersection';

export default function inPolygon(x, y, polygon) {
    const xCoords = polygon.coords.map((elem) => elem[0]);
    const maxX = Math.max(...xCoords);
    let countCrossed = 0;
    polygon.coords.forEach((coord, index) => {
        let nextIndex = index + 1;
        if (!polygon.coords[nextIndex]) {
            return;
        }
      
        if (isIntersection([coord, polygon.coords[nextIndex]], [[x, y], [maxX + 1, y]])) {
            countCrossed += 1;
        }
    });
        
    return ((countCrossed % 2 !== 0));
}