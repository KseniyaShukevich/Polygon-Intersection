import Point from "./Point";
import Polygon from "./Polygon";
import Line from "./Line";

function getCoordinates(
  elem: HTMLElement
  ): Point { 

    const box = elem.getBoundingClientRect();
    const x = box.left + pageXOffset;
    const z = box.top + pageYOffset;
    return new Point(x, z);
}

export function getShiftXZ(e: any): Point {
  const coords = getCoordinates(e.target as HTMLElement);
  const shiftX = e.pageX - coords.x;
  const shiftZ = e.pageY - coords.z;
  return new Point(shiftX, shiftZ);
}

export function getLines(
  polygon: Polygon)
  : Array<Line> {

  return polygon.coordinates.reduce((result, point, index, coordinates) => {
      let nextIndex: number = index + 1;
      if (!coordinates[nextIndex]) {
          return result;
      }

      return [...result, new Line(point, coordinates[nextIndex])];
  }, []);
}

export function calcCoefficients(
  line: Line
  ): Array<number> {
    
  const xDifference: number = line.point2.x - line.point1.x;
  const k: number = (line.point2.z - line.point1.z) / xDifference;
  const b: number = line.point1.z - (line.point1.x * k);
  return [k, b];
}