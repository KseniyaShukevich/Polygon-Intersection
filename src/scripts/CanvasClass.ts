import Polygon from './Polygon';
import Point from './Point';

export default class Canvas {
    canvas: HTMLCanvasElement;
    polygons: Array<Polygon>;

    constructor(
        canvas: HTMLCanvasElement, 
        polygons: Array<Polygon>
        ) {
            
        this.polygons = polygons;
        this.canvas = canvas;
    }

    _sort(): void {
        this.polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        })
    }

    _drawLines(
        polygon: Polygon
        ): void {

        for (let i = 0; i < polygon.coordinates.length; i++) {
            if (i == 0) {
                polygon.ctx.moveTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            } else {
                polygon.ctx.lineTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            }; 
        }
    }

    clear(): void {
        this.polygons[0].ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    draw(): void {
        this.clear();
        this._sort();

        this.polygons.forEach((polygon) => {
            polygon.ctx.beginPath();

            this._drawLines(polygon);

            if (polygon.arrIntersections.length) {
                polygon.ctx.fillStyle = 'red';
                polygon.ctx.fill(); 
            }

            polygon.ctx.stroke();
        });
    }

    move(
        point: Point, 
        draggingPolygon: Polygon
        ): void {

        draggingPolygon.position = new Point(
            draggingPolygon.position.x + point.x, 
            draggingPolygon.position.z + point.z
            );
        this.draw();
    }

    initDraw(
        calcPosition: (
            value: Array<Point>) => Array<any>
        ): void {
            
        this.polygons.forEach((polygon, index) => {
            const [position, func] = calcPosition(polygon.coordinates);
            polygon.position = position;
            calcPosition = func;
        })

        this.draw();
    }
}
