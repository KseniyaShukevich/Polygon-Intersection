import Point from './Point';
import Line from './Line';

function calcCoefficients(line: Line): Array<number> {
  const xDifference: number = line.point2.x - line.point1.x;
  const k: number = (line.point2.z - line.point1.z) / xDifference;
  const b: number = line.point1.z - (line.point1.x * k);
  return [k, b];
}

function getMaxAndMinXZ(line: Line): Array<number> {
  const maxX: number = Math.max(line.point1.x, line.point2.x);
  const minX: number = Math.min(line.point1.x, line.point2.x);
  const maxZ: number = Math.max(line.point1.z, line.point2.z);
  const minZ: number = Math.min(line.point1.z, line.point2.z);
  return [maxX, minX, maxZ, minZ];
}

function checkPoint(line: Line, xCross: number, zCross: number): boolean {
  const [maxX, minX, maxZ, minZ] = getMaxAndMinXZ(line);

  if ((xCross <= maxX) && (xCross >= minX) &&
     (zCross <= maxZ) && (zCross >= minZ)) {
    return true;
  }

  return false;
}

function checkSuperimposition(line: Line, z1: number, z2: number): boolean {
    if (line.point1.z === z1 || line.point1.z === z2 || 
        line.point2.z === z1 || line.point2.z === z2) {
      return true;
    }

    return false;
}

function calcPointCrossAlongOrdinates(lineAlongOrdinates: Line, line: Line): Array<number> {
  const xCross: number = lineAlongOrdinates.point1.x;
  const [k, b] = calcCoefficients(line);
  const zCross: number = k * xCross + b;
  return [xCross, zCross];
}

function findMinZs(line1: Line, line2: Line): Array<number> {
  const allZ: Array<number> = [
    line1.point1.z, line1.point2.z, 
    line2.point1.z, line2.point2.z
  ];
  const minZ1: number = Math.min(...allZ);
  allZ.splice(allZ.indexOf(minZ1), 1);
  const minZ2: number = Math.min(...allZ);
  return [minZ1, minZ2];
}

function checkLinesAlongOrdinates(line1: Line, line2: Line): boolean {
  if (line1.point1.x !== line2.point1.x) {
    return false;
  }

  const [minZ1, minZ2] = findMinZs(line1, line2);

  if (checkSuperimposition(line1, minZ1, minZ2) &&
      checkSuperimposition(line2, minZ1, minZ2)) {
      return true;
  }
  return false;
}

function calcPointCrossLines(line1: Line, line2: Line, k1: number, k2: number, b1: number): Array<number> {
  const kDifference: number = k1 - k2;
  const xCross: number = (line2.point1.z - line2.point1.x * k2 - line1.point1.z + line1.point1.x * k1) / kDifference;
  const zCross: number = k1 * xCross + b1;
  return [xCross, zCross];
}

export default function isIntersection(line1: Line, line2: Line): boolean {
  let xCross: number;
  let zCross: number;
  const xDifference1: number = line1.point2.x - line1.point1.x;
  const xDifference2: number = line2.point2.x - line2.point1.x;

  if ((xDifference1 === 0) && (xDifference2 !== 0)) {
    [xCross, zCross] = calcPointCrossAlongOrdinates(line1, line2);
  } else if ((xDifference1 !== 0) && (xDifference2 === 0)) {
    [xCross, zCross] = calcPointCrossAlongOrdinates(line2, line1);
  } else if ((xDifference1 === 0) && (xDifference2 === 0)) {
    return checkLinesAlongOrdinates(line1, line2);
  } else {
      const [k1, b1] = calcCoefficients(line1);
      const [k2, b2] = calcCoefficients(line2);
      const kDifference: number = k1 - k2;

      if ((line1.point1.z / line2.point1.z) === (k1 / k2) 
            && ((k1 / k2) === (b1 / b2))) {
          return true;
      }

      if (kDifference === 0) {
        return false;
      }
  
      [xCross, zCross] = calcPointCrossLines(line1, line2, k1, k2, b1);
  }

  if (checkPoint(line1, xCross, zCross) &&
      checkPoint(line2, xCross, zCross)) {
    return true;
  }

  return false;
}