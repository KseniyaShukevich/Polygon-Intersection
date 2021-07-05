function calcCoefficients(line) {
  const xDifference = line[1].x - line[0].x;
  const k = (line[1].z - line[0].z) / xDifference;
  const b = line[0].z - (line[0].x * k);
  return [k, b];
}

function getMaxAndMinXZ(line) {
  const maxX = Math.max(line[0].x, line[1].x);
  const minX = Math.min(line[0].x, line[1].x);
  const maxZ = Math.max(line[0].z, line[1].z);
  const minZ = Math.min(line[0].z, line[1].z);
  return [maxX, minX, maxZ, minZ];
}

function checkPoint(line, xCross, zCross) {
  const [maxX, minX, maxZ, minZ] = getMaxAndMinXZ(line);

  if ((xCross <= maxX) && (xCross >= minX) &&
     (zCross <= maxZ) && (zCross >= minZ)) {
    return true;
  }

  return false;
}

function checkSuperimposition(line, z1, z2) {
    if (line[0].z === z1 || line[0].z === z2 || 
        line[1].z === z1 || line[1].z === z2) {
      return true;
    }

    return false;
}

function calcPointCrossAlongOrdinates(lineAlongOrdinates, line) {
  const xCross = lineAlongOrdinates[0].x;
  const [k, b] = calcCoefficients(line);
  const zCross = k * xCross + b;
  return [xCross, zCross];
}

function findMinZs(line1, line2) {
  const allZ = [
    line1[0].z, line1[1].z, 
    line2[0].z, line2[1].z
  ];
  const minZ1 = Math.min(...allZ);
  allZ.splice(allZ.indexOf(minZ1), 1);
  const minZ2 = Math.min(...allZ);
  return [minZ1, minZ2];
}

function checkLinesAlongOrdinates(line1, line2) {
  if (line1[0].x !== line2[0].x) {
    return false;
  }

  const [minZ1, minZ2] = findMinZs(line1, line2);

  if (checkSuperimposition(line1, minZ1, minZ2) &&
      checkSuperimposition(line2, minZ1, minZ2)) {
      return true;
  }
  return false;
}

function calcPointCrossLines(line1, line2, k1, k2, b1) {
  const kDifference = k1 - k2;
  const xCross = (line2[0].z - line2[0].x * k2 - line1[0].z + line1[0].x * k1) / kDifference;
  const zCross = k1 * xCross + b1;
  return [xCross, zCross];
}

export default function isIntersection(line1, line2) {
  let xCross;
  let zCross;
  const xDifference1 = line1[1].x - line1[0].x;
  const xDifference2 = line2[1].x - line2[0].x;

  if ((xDifference1 === 0) && (xDifference2 !== 0)) {
    [xCross, zCross] = calcPointCrossAlongOrdinates(line1, line2);
  } else if ((xDifference1 !== 0) && (xDifference2 === 0)) {
    [xCross, zCross] = calcPointCrossAlongOrdinates(line2, line1);
  } else if ((xDifference1 === 0) && (xDifference2 === 0)) {
    return checkLinesAlongOrdinates(line1, line2);
  } else {
      const [k1, b1] = calcCoefficients(line1);
      const [k2, b2] = calcCoefficients(line2);
      const kDifference = k1 - k2;

      if ((line1[0].z / line2[0].z) === (k1 / k2) 
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