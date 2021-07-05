function calcCoefficients(line) {
  const xDifference = line[1][0] - line[0][0];
  const k = (line[1][1] - line[0][1]) / xDifference;
  const b = line[0][1] - ((line[0][0]) * k);
  return [k, b];
}

function getMaxAndMinXY(line) {
  const maxX = Math.max(line[0][0], line[1][0]);
  const minX = Math.min(line[0][0], line[1][0]);
  const maxY = Math.max(line[0][1], line[1][1]);
  const minY = Math.min(line[0][1], line[1][1]);
  return [maxX, minX, maxY, minY];
}

function checkPoint(line, xCross, yCross) {
  const [maxX, minX, maxY, minY] = getMaxAndMinXY(line);

  if ((xCross <= maxX) && (xCross >= minX) &&
     (yCross <= maxY) && (yCross >= minY)) {
    return true;
  }

  return false;
}

function checkSuperimposition(line, y1, y2) {
    if (line[0][1] === y1 || line[0][1] === y2 || 
        line[1][1] === y1 || line[1][1] === y2) {
      return true;
    }

    return false;
}

function calcPointCrossAlongOrdinates(lineAlongOrdinates, line) {
  const xCross = lineAlongOrdinates[0][0];
  const [k, b] = calcCoefficients(line);
  const yCross = k * xCross + b;
  return [xCross, yCross];
}

function findMinYs(line1, line2) {
  const allY = [
    line1[0][1], line1[1][1], 
    line2[0][1], line2[1][1]
  ];
  const minY1 = Math.min(...allY);
  allY.splice(allY.indexOf(minY1), 1);
  const minY2 = Math.min(...allY);
  return [minY1, minY2];
}

function checkLinesAlongOrdinates(line1, line2) {
  if (line1[0][0] !== line2[0][0]) {
    return false;
  }

  const [minY1, minY2] = findMinYs(line1, line2);

  if (checkSuperimposition(line1, minY1, minY2) &&
      checkSuperimposition(line2, minY1, minY2)) {
      return true;
  }
  return false;
}

function calcPointCrossLines(line1, line2, k1, k2, b1) {
  const kDifference = k1 - k2;
  const xCross = (line2[0][1] - line2[0][0] * k2 - line1[0][1] + line1[0][0] * k1) / kDifference;
  const yCross = k1 * xCross + b1;
  return [xCross, yCross];
}

export default function isIntersection(line1, line2) {
  let xCross;
  let yCross;
  const xDifference1 = line1[1][0] - line1[0][0];
  const xDifference2 = line2[1][0] - line2[0][0];

  if ((xDifference1 === 0) && (xDifference2 !== 0)) {
    [xCross, yCross] = calcPointCrossAlongOrdinates(line1, line2);
  } else if ((xDifference1 !== 0) && (xDifference2 === 0)) {
    [xCross, yCross] = calcPointCrossAlongOrdinates(line2, line1);
  } else if ((xDifference1 === 0) && (xDifference2 === 0)) {
    return checkLinesAlongOrdinates(line1, line2);
  } else {
      const [k1, b1] = calcCoefficients(line1);
      const [k2, b2] = calcCoefficients(line2);
      const kDifference = k1 - k2;

      if ((line1[0][1] / line2[0][1]) === (k1 / k2) 
            && ((k1 / k2) === (b1 / b2))) {
          return true;
      }

      if (kDifference === 0) {
        return false;
      }
  
      [xCross, yCross] = calcPointCrossLines(line1, line2, k1, k2, b1);
  }

  if (checkPoint(line1, xCross, yCross) &&
      checkPoint(line2, xCross, yCross)) {
    return true;
  }

  return false;
}
