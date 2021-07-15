import Line from "./Line";
import Point from "./Point";
import Polygon from "./Polygon";
import isIntersection from "./isIntersection";
import inPolygon from "./inPolygon";
import { calcCoefficients } from './services';

function checkAlongOrdinates(
    line: Line, 
    polygon: Polygon,
): boolean {

    const xCross: number = line.point2.x;
    const zCross: number = polygon.circleData.z;
    const point1: Point = new Point(polygon.circleData.x, zCross); 
    const point2: Point = new Point(xCross, zCross);
    const testLine: Line = new Line(point1, point2);
    const lengthToCenter: number = Math.abs(line.point2.x - polygon.circleData.x);
    const isRadiusLonger: boolean = polygon.circleData.r > lengthToCenter;

    return isIntersection(line, testLine) && isRadiusLonger;
}


function checkAlongAbscissa(
    line: Line, 
    polygon: Polygon,
): boolean {

    const xCross: number = polygon.circleData.x;
    const zCross: number = line.point1.z;
    const point1: Point = new Point(xCross, polygon.circleData.z);
    const point2: Point = new Point(xCross, zCross);
    const testLine: Line = new Line(point1, point2);
    const isPointInCircle: boolean = inPolygon(line.point1, polygon) || inPolygon(line.point2, polygon);

    return isIntersection(line, testLine) || isPointInCircle;
}

function checkCircleAndLine(
    line: Line, 
    polygon: Polygon,
    k1: number,
    b1: number,
): boolean {

    const b2: number = polygon.circleData.z + (polygon.circleData.x * k1);
    const xCross: number = (b2 - b1) / (2 * k1);
    const zCross: number = b2 - (k1 * xCross);
    const point1: Point = new Point(polygon.circleData.x, polygon.circleData.z);
    const point2: Point = new Point(xCross, zCross);
    const testLine: Line = new Line(point1, point2);
    const isPointInCircle: boolean = inPolygon(line.point1, polygon) || inPolygon(line.point2, polygon);

    return isIntersection(line, testLine) || isPointInCircle;

}

function checkRestCases(
    line: Line, 
    polygon: Polygon,
): boolean {

    const [k1, b1] = calcCoefficients(line);
    const dividend: number = Math.abs(k1 * polygon.circleData.x - polygon.circleData.z + b1);
    const lengthToCenter: number = dividend / Math.sqrt(k1 * k1 + 1);
    const isRadiusLonger: boolean = polygon.circleData.r > lengthToCenter;

    if (isRadiusLonger) {
        if (k1 === 0) {
            
            return checkAlongAbscissa(line, polygon);
        }

        return checkCircleAndLine(line, polygon, k1, b1);
    }

    return false;
}

export default function isIntersectionCircle(
    line: Line, 
    polygon: Polygon,
): boolean {

    if ((line.point2.x - line.point1.x) === 0) {

        return checkAlongOrdinates(line, polygon);
    } else {

        return checkRestCases(line, polygon);
    }
}
