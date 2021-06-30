function calcCoefficients(segment) {
  const xDifference = segment[1][0] - segment[0][0];
  const k = (segment[1][1] - segment[0][1]) / xDifference;
  const b = segment[0][1] - ((segment[0][0]) * k);
  return [k, b];
}

function getMaxMinXY(segment) {
  const maxX = Math.max(segment[0][0], segment[1][0]);
  const minX = Math.min(segment[0][0], segment[1][0]);
  const maxY = Math.max(segment[0][1], segment[1][1]);
  const minY = Math.min(segment[0][1], segment[1][1]);
  return [maxX, minX, maxY, minY];
}

function checkPoint(segment, xCross, yCross) {
  const [maxX, minX, maxY, minY] = getMaxMinXY(segment);

  if ((xCross <= maxX) && (xCross >= minX) &&
     (yCross <= maxY) && (yCross >= minY)) {
    return true;
  }

  return false;
}

function checkSuperimposition(segment, y1, y2) {
    if (segment[0][1] === y1 || segment[0][1] === y2 || 
        segment[1][1] === y1 || segment[1][1] === y2) {
      return true;
    }

    return false;
}

function calcCrossAlongOrdinates(segmentAlongOrdinates, segment) {
  const xCross = segmentAlongOrdinates[0][0];
  const [k, b] = calcCoefficients(segment);
  const yCross = k * xCross + b;
  return [xCross, yCross];
}

function findMinYs(segment1, segment2) {
  const allY = [
    segment1[0][1], segment1[1][1], 
    segment2[0][1], segment2[1][1]
  ];
  const minY1 = Math.min(...allY);
  allY.splice(allY.indexOf(minY1), 1);
  const minY2 = Math.min(...allY);
  return [minY1, minY2];
}

function checkLinesAlongOrd(segment1, segment2) {
  if (segment1[0][0] !== segment2[0][0]) {
    return false;
  }

  const [minY1, minY2] = findMinYs(segment1, segment2);

  if (checkSuperimposition(segment1, minY1, minY2) &&
      checkSuperimposition(segment2, minY1, minY2)) {
      return true;
  }
  return false;
}

function calcCrossLines(segment1, segment2, k1, k2, b1) {
  const kDifference = k1 - k2;
  const xCross = (segment2[0][1] - segment2[0][0] * k2 - segment1[0][1] + segment1[0][0] * k1) / kDifference;
  const yCross = k1 * xCross + b1;
  return [xCross, yCross];
}

export default function isIntersection(segment1, segment2) {
  let xCross;
  let yCross;
  const xDifference1 = segment1[1][0] - segment1[0][0];
  const xDifference2 = segment2[1][0] - segment2[0][0];

  if ((xDifference1 === 0) && (xDifference2 !== 0)) {
    [xCross, yCross] = calcCrossAlongOrdinates(segment1, segment2);
  } else if ((xDifference1 !== 0) && (xDifference2 === 0)) {
    [xCross, yCross] = calcCrossAlongOrdinates(segment2, segment1);
  } else if ((xDifference1 === 0) && (xDifference2 === 0)) {
    return checkLinesAlongOrd(segment1, segment2);
  } else {
      const [k1, b1] = calcCoefficients(segment1);
      const [k2, b2] = calcCoefficients(segment2);
      const kDifference = k1 - k2;

      if ((segment1[0][1] / segment2[0][1]) === (k1 / k2) 
            && ((k1 / k2) === (b1 / b2))) {
          return true;
      }

      if (kDifference === 0) {
        return false;
      }
  
      [xCross, yCross] = calcCrossLines(segment1, segment2, k1, k2, b1);
  }

  if (checkPoint(segment1, xCross, yCross) &&
      checkPoint(segment2, xCross, yCross)) {
    return true;
  }

  return false;
}
