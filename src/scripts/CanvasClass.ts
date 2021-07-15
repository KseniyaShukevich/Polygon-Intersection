import polygons from './polygons';
import Polygon from './Polygon';
import Point from './Point';
import { canvas } from './canvas';
import Image from './image'
import Circle from './Circle';

class Canvas {
    polygons: Array<Polygon>;
    images: Array<any>;
    _ctx: any;

    constructor(
        polygons: Array<Polygon>,
    ) {
        
        this.polygons = polygons;
        this.images = [];
        this._ctx = canvas.getContext('2d');
    }

    _sort(): void {
        this.polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        })
    }

    _clear(): void {
        this._ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    _drawLines(
        polygon: Polygon,
    ): void {

        for (let i = 0; i < polygon.coordinates.length; i++) {
            if (i == 0) {
                this._ctx.moveTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            } else {
                this._ctx.lineTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            }; 
        }
    }

    _drawCircle(
        polygon: Polygon,
    ): void {

        this._ctx.arc(
            polygon.circleData.x, 
            polygon.circleData.z, 
            polygon.circleData.r, 
            polygon.circleData.startAngle, 
            polygon.circleData.endAngle
        );
    }

    _fillPolygon(
        polygon: Polygon,
    ): void {

        if (polygon.arrIntersections.length) {
            this._ctx.fillStyle = 'red';
            this._ctx.fill(); 
        }
        
    }

    _drawPolygon(
        polygon: Polygon,
    ): void {

        this._ctx.beginPath();

        if (polygon.isCircle) {
            this._drawCircle(polygon);
        } else {
            this._drawLines(polygon);
        }
        
        this._ctx.closePath();

        this._fillPolygon(polygon);
        this._ctx.stroke();
    }

    draw(): void {
        this._clear();
        this._sort();

        this.polygons.forEach((polygon) => {
            if (polygon.isCloned) {
                this._drawPolygon(polygon);
            }
        });
    }

    move(
        movementPoint: Point, 
        draggingPolygon: Polygon,
    ): void {

        draggingPolygon.calcCoordinates(movementPoint);
        this.draw();
    }

    _cloneCircleData(
        polygon: Polygon,
    ): Circle {

        return new Circle(
            polygon.circleData.x, 
            polygon.circleData.z, 
            polygon.circleData.r, 
            polygon.circleData.startAngle, 
            polygon.circleData.endAngle
        );
    }

    clone(
        id: string,
    ): Polygon {

        const polygon = this.polygons.find((elem) => elem.id === id);
        if (polygon) {
            let newPolygon: Polygon;

            if (polygon.isCircle) {
                newPolygon = new Polygon([], true, this._cloneCircleData(polygon), true);
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
            this._clear();
        });
        canvas.height = document.body.clientHeight - 50;
        canvas.width = document.body.clientWidth - 250;
    }
}

const canvasClass: Canvas = new Canvas(polygons);
canvasClass.initDraw();

export default canvasClass;
