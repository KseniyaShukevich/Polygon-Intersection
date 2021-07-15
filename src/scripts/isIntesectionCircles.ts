import Polygon from "./Polygon";

export default function isIntersectionCircles(
    polygon1: Polygon, 
    polygon2: Polygon
    ): boolean {

    const differenceX: number = Math.abs(polygon2.position.x - polygon1.position.x);
    const differenceZ: number = Math.abs(polygon2.position.z - polygon1.position.z);
    const sumRadius: number = polygon1.circleData.r + polygon2.circleData.r;
    const lengthToRadiuses: number = Math.sqrt(differenceX * differenceX + differenceZ * differenceZ);
    if (lengthToRadiuses < sumRadius) {
        return true;
    }

    return false;
}