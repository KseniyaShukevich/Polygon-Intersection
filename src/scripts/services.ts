import Point from "./Point";

function getCoordinates(elem: HTMLElement) { 
    const box = elem.getBoundingClientRect();
    const x = box.left + pageXOffset;
    const z = box.top + pageYOffset;
    return new Point(x, z);
}

export function getShiftXZ(e: any) {
  const coords = getCoordinates(e.target as HTMLElement);
  const shiftX = e.pageX - coords.x;
  const shiftZ = e.pageY - coords.z;
  return [shiftX, shiftZ];
}