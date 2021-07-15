import canvasClass from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';
import Polygon from './Polygon';
import { canvas } from './canvas';
import { getShiftXZ } from './services';


function chooseDraggingElement(
    potentialDraggingPolygons: Array<Polygon>,
): Polygon {

    let draggingPolygon: Polygon = potentialDraggingPolygons[0];

    potentialDraggingPolygons.forEach((polygon) => {
        if (draggingPolygon.priority < polygon.priority) {
            draggingPolygon = polygon;
        }
    });

    return draggingPolygon;
}

function clonePolygon(
    e: MouseEvent, 
    left: number, 
    top: number, 
    id: string,
): void {

    const shift: Point = getShiftXZ(e);
    const positionX: number = e.pageX - shift.x - left;
    const positionZ: number = e.pageY - shift.z - top;
    const draggingPolygon: Polygon = canvasClass.clone(id);

    draggingPolygon.isDragging = true;
    draggingPolygon.calcCoordinates(new Point(positionX, positionZ));
}

function checkPolygon(
    e: MouseEvent, 
    left: number, 
    top: number,
): void {

    const currentMouseX: number = e.pageX - left
    const currentMouseZ: number = e.pageY - top;  
    const potentialDraggingPolygons: Array<Polygon> = canvasClass.polygons.filter((polygon) => {
        return inPolygon(new Point(currentMouseX, currentMouseZ), polygon);
    });

    if (potentialDraggingPolygons.length) {
        let draggingPolygon = chooseDraggingElement(potentialDraggingPolygons);
        
        draggingPolygon.isDragging = true;
    }
}
  
export default function mousedown(
    e: MouseEvent,
): void {

    const shift: Point = getShiftXZ(e);
    const id: string = (e.target as HTMLElement).id;
    const menuPolygon: Polygon = canvasClass.polygons.find((polygon) => polygon.id === id);
    const { left, top } = canvas.getBoundingClientRect();
    const shiftPoint: Point = new Point(shift.x, shift.z);

    if (menuPolygon && inPolygon(shiftPoint, menuPolygon)) {
        clonePolygon(e, left, top, id);
    } else {
        checkPolygon(e, left, top);
   }
}