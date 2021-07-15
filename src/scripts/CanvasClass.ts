import polygons from './polygons';
import Polygon from './Polygon';
import Point from './Point';
import { canvas } from './canvas';
import Image from './image'

class Canvas {
    polygons: Array<Polygon>;
    ctx: any;
    images: Array<any>;

    constructor(polygons: Array<Polygon>) {
        this.polygons = polygons;
        this.ctx = canvas.getContext('2d');
        this.images = [];
    }

    _sort(): void {
        this.polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        })
    }

    clear(): void {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    _drawLines(
        polygon: Polygon
        ): void {

        for (let i = 0; i < polygon.coordinates.length; i++) {
            if (i == 0) {
                this.ctx.moveTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            } else {
                this.ctx.lineTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            }; 
        }
    }

    _drawCircle(
        polygon: Polygon
        ): void {

        this.ctx.arc(
            polygon.position.x, 
            polygon.position.z, 
            polygon.circleData.r, 
            polygon.circleData.startAngle, 
            polygon.circleData.endAngle
        );
    }

    _fillPolygon(
        polygon: Polygon
        ): void {

        if (polygon.arrIntersections.length) {
            this.ctx.fillStyle = 'red';
            this.ctx.fill(); 
        }
        
    }

    _drawPolygon(
        polygon: Polygon
        ): void {

        this.ctx.beginPath();

        if (polygon.isCircle) {
            this._drawCircle(polygon);
        } else {
            this._drawLines(polygon);
        }
        
        this.ctx.closePath();

        this._fillPolygon(polygon);
        this.ctx.stroke();
    }

    draw(): void {
        this.clear();
        this._sort();

        this.polygons.forEach((polygon) => {
            if (polygon.isCloned) {
                this._drawPolygon(polygon);
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

    clone(
        id: string
        ): Polygon {

        const polygon = this.polygons.find((elem) => elem.id === id);
        if (polygon) {
            let newPolygon: Polygon;

            if (polygon.isCircle) {
                newPolygon = new Polygon([], true, polygon.circleData, polygon.position, true);
            } else {
                newPolygon = new Polygon(polygon.coordinates, true);
            }

            this.polygons.push(newPolygon);
            return newPolygon;
        }
    }

    initDraw(): void {
        canvas.height = 60;
        canvas.width = 60;
        this.polygons.forEach((polygon) => {
            this._drawPolygon(polygon);
            this.images.push(new Image(polygon.id, canvas.toDataURL()));
            this.clear();
        });
        canvas.height = document.body.clientHeight - 50;
        canvas.width = document.body.clientWidth - 250;
    }
}

const canvasClass: Canvas = new Canvas(polygons);
canvasClass.initDraw();

export default canvasClass;
