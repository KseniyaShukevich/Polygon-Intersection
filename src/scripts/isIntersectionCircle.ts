import Line from "./Line";
import Point from "./Point";
import Polygon from "./Polygon";
import isIntersection from "./isIntersection";
import inPolygon from "./inPolygon";
import { calcCoefficients } from './services';

function checkAlongOrdinates(
    line: Line, 
    polygon: Polygon
    ): boolean {

    const xCross: number = line.point2.x;
    const zCross: number = polygon.position.z;
    const point1: Point = new Point(polygon.position.x, zCross); 
    const point2: Point = new Point(xCross, zCross);
    const testLine: Line = new Line(point1, point2);

    const lengthToCenter: number = Math.abs(line.point2.x - polygon.position.x);
    return (isIntersection(line, testLine) &&
            (polygon.circleData.r > lengthToCenter));
}

function checkAlongAbscissa(
    line: Line, 
    polygon: Polygon,
    lengthToCenter: number
    ): boolean {

    const xCross: number = polygon.position.x;
    const zCross: number = line.point1.z;
    const point1: Point = new Point(xCross, polygon.position.z);
    const point2: Point = new Point(xCross, zCross);
    const testLine: Line = new Line(point1, point2);

    return (polygon.circleData.r > lengthToCenter && 
            (isIntersection(line, testLine) ||
            inPolygon(line.point1, polygon) || 
            inPolygon(line.point2, polygon)));
}

function checkCircleAndLine(
    line: Line, 
    polygon: Polygon,
    k1: number,
    b1: number
    ): boolean {

    const b2: number = polygon.position.z + (polygon.position.x * k1);
    const xCross: number = (b2 - b1) / (2 * k1);
    const zCross: number = b2 - (k1 * xCross);
    const point1: Point = new Point(polygon.position.x, polygon.position.z);
    const point2: Point = new Point(xCross, zCross)

    return (isIntersection(line, new Line(point1, point2)) ||
            inPolygon(line.point1, polygon) || 
            inPolygon(line.point2, polygon));

}

function checkRestCases(
    line: Line, 
    polygon: Polygon
    ): boolean {

    const [k1, b1] = calcCoefficients(line);
    const dividend = Math.abs(k1 * polygon.position.x - polygon.position.z + b1);
    const lengthToCenter: number = dividend / Math.sqrt(k1 * k1 + 1);

    if (k1 === 0) {
        return checkAlongAbscissa(line, polygon, lengthToCenter);
    }

    if (polygon.circleData.r > lengthToCenter) {
        return checkCircleAndLine(line, polygon, k1, b1);
    }

    return false;
}

export default function isIntersectionCircle(
    line: Line, 
    polygon: Polygon
    ): boolean {

    if ((line.point2.x - line.point1.x) === 0) {
        return checkAlongOrdinates(line, polygon);
    } else {
        return checkRestCases(line, polygon);
    }
}
