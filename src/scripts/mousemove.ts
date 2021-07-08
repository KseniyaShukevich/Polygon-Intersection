import Canvas from './CanvasClass';
import Point from './Point';
import Polygon from './Polygon';

export default function mousemove(
    e: React.MouseEvent<HTMLCanvasElement>,
    canvas: Canvas
    ): void {
        
    const draggingPolygon: Polygon = canvas.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        canvas.move(new Point(e.movementX, e.movementY), draggingPolygon);
    }
}