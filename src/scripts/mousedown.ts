import Canvas from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';
import Polygon from './Polygon';

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
  
export default function mousedown(
    e: React.MouseEvent<HTMLCanvasElement>,
    canvas: Canvas
    ): void {

    const { left, top } = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const currentMouseX = e.pageX - left
    const currentMouseZ = e.pageY - top;
    const potentialDraggingPolygons = canvas.polygons.filter((polygon) => {
        return inPolygon(new Point(currentMouseX, currentMouseZ), polygon);
    });

   if (potentialDraggingPolygons.length) {
        const draggingPolygon = chooseDraggingElement(potentialDraggingPolygons);
        draggingPolygon.isDragging = true;
   }
}