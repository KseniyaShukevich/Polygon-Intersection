import polygons from './polygons';
import Polygon from './Polygon';
import Point from './Point';
import { canvas } from './canvas';

class Canvas {
    polygons: Array<Polygon>;
    images: Array<any>;

    constructor(polygons: Array<Polygon>) {
        this.polygons = polygons;
        this.images = [];
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
        this.polygons[0].ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw(): void {
        this.clear();
        this._sort();

        this.polygons.forEach((polygon) => {
            if (polygon.isCloned) {
                polygon.ctx.beginPath();

                this._drawLines(polygon);
                
                if (polygon.arrIntersections.length) {
                    polygon.ctx.fillStyle = 'red';
                    polygon.ctx.fill(); 
                }
            
                polygon.ctx.stroke();
            }
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

    clone(id: string): Polygon {
        const polygon = this.polygons.find((elem) => elem.id === id);
        if (polygon) {
            const newPolygon: Polygon = new Polygon(polygon.coordinates, true);
            this.polygons.push(newPolygon);
            return newPolygon;
        }
    }

    initDraw(): void {
        canvas.height = 60;
        canvas.width = 60;
        polygons.forEach((polygon) => {
            polygon.draw();
            this.images.push({
                id: polygon.id,
                data: canvas.toDataURL()
            });
            this.clear();
        });
        canvas.height = document.body.clientHeight - 50;
        canvas.width = document.body.clientWidth - 250;
    }
}

const canvasClass: Canvas = new Canvas(polygons);
canvasClass.initDraw();

export default canvasClass;
