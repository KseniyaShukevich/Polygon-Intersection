import Polygon from "./Polygon";

export default function isIntersectionCircles(
    polygon1: Polygon, 
    polygon2: Polygon
    ): boolean {

    const differenceX: number = Math.abs(polygon2.circleData.x - polygon1.circleData.x);
    const differenceZ: number = Math.abs(polygon2.circleData.z - polygon1.circleData.z);
    const sumRadius: number = polygon1.circleData.r + polygon2.circleData.r;
    const lengthToRadiuses: number = Math.sqrt(differenceX * differenceX + differenceZ * differenceZ);
    if (lengthToRadiuses < sumRadius) {
        return true;
    }

    return false;
}