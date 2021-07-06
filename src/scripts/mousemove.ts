import canvasClass from './CanvasClass';
import Point from './Point';
import Polygon from './Polygon';

export default function mousemove(
    e: MouseEvent
    ): void {
        
    const draggingPolygon: Polygon = canvasClass.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        canvasClass.move(new Point(e.movementX, e.movementY), draggingPolygon);
    }
}