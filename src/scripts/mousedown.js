import canvasClass from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';

function chooseDraggingElement(potentialDraggingPolygons) {
    let draggingPolygon = potentialDraggingPolygons[0];

    potentialDraggingPolygons.forEach((polygon) => {
        if (draggingPolygon.priority < polygon.priority) {
            draggingPolygon = polygon;
        }
    });

    return draggingPolygon;
}
  
export default function mousedown(e) {
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