import canvasClass from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';
import Polygon from './Polygon';

function chooseDraggingElement(potentialDraggingPolygons: Array<Polygon>): Polygon {
    let draggingPolygon = potentialDraggingPolygons[0];

    potentialDraggingPolygons.forEach((polygon) => {
        if (draggingPolygon.priority < polygon.priority) {
            draggingPolygon = polygon;
        }
    });

    return draggingPolygon;
}
  
export default function mousedown(e: any): void {
    const currentMouseX = e.pageX - e.target.offsetLeft;
    const currentMouseZ = e.pageY - e.target.offsetTop;
    const potentialDraggingPolygons = canvasClass.polygons.filter((polygon) => {
        return inPolygon(new Point(currentMouseX, currentMouseZ), polygon);
    });

   if (potentialDraggingPolygons.length) {
        const draggingPolygon = chooseDraggingElement(potentialDraggingPolygons);
        draggingPolygon.isDragging = true;
   }
}