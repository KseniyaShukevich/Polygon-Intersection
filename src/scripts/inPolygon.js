export default function inPolygon(x, y, xCoords, yCoords){
    let polygonXLength = xCoords.length;
    let j = polygonXLength - 1;
    let result = false;
    for (let i = 0; i < polygonXLength; i++){
        if ((((yCoords[i] <= y) && (y < yCoords[j])) ||
           ((yCoords[j] <= y) && (y < yCoords[i]))) &&
          (x > (xCoords[j] - xCoords[i]) * (y - yCoords[i]) / (yCoords[j] - yCoords[i]) + xCoords[i])) {
         result = !result
         }
         j = i;
    }
  return result;
  }