import canvasClass from './CanvasClass';
import Point from './Point';

export default function mousemove(e: MouseEvent) {
    const draggingPolygon = canvasClass.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        canvasClass.move(new Point(e.movementX, e.movementY), draggingPolygon);
    }
}