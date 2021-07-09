import canvasClass from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';
import Polygon from './Polygon';
import { canvas } from './canvas';
import { getShiftXZ } from './services';


function chooseDraggingElement(
    potentialDraggingPolygons: Array<Polygon>
    ): Polygon {

    let draggingPolygon = potentialDraggingPolygons[0];

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
    id: string
    ): void {

    const shift = getShiftXZ(e);
    let draggingPolygon = canvasClass.clone(id);
    draggingPolygon.isDragging = true;
    draggingPolygon.position = new Point(e.pageX - shift.x - left, e.pageY - shift.z - top);
}

function checkPolygon(
    e: MouseEvent, 
    left: number, 
    top: number
    ): void {

    const currentMouseX = e.pageX - left
    const currentMouseZ = e.pageY - top;
    const potentialDraggingPolygons = canvasClass.polygons.filter((polygon) => {
        return inPolygon(new Point(currentMouseX, currentMouseZ), polygon);
    });
    if (potentialDraggingPolygons.length) {
        let draggingPolygon = chooseDraggingElement(potentialDraggingPolygons);
        draggingPolygon.isDragging = true;
    }
}
  
export default function mousedown(
    e: MouseEvent
    ): void {

    const shift = getShiftXZ(e);
    const id = (e.target as HTMLElement).id;
    const menuPolygon = canvasClass.polygons.find((polygon) => polygon.id === id);
    const { left, top } = canvas.getBoundingClientRect();

    if (menuPolygon && inPolygon(new Point(shift.x, shift.z), menuPolygon)) {
        clonePolygon(e, left, top, id);
    } else {
        checkPolygon(e, left, top);
   }
}