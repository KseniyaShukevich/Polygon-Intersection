import { canvas } from './canvas';
import Point from './Point';
import { v4 as uuidv4 } from 'uuid';
import Circle from './Circle';

export default class Polygon {
    id: string;
    coordinates: Array<Point>;
    circleData: Circle;
    ctx: any;
    priority: number;
    isDragging: boolean;
    arrIntersections: Array<string | never>;
    isCloned: boolean;
    isCircle: boolean;
    _position: Point;

    constructor(
        coordinates: Array<Point>, 
        isCloned: boolean = false, 
        circleData: Circle = new Circle(0, 0, 0), 
        position: Point = new Point(0, 0),
        isCircle: boolean = false
        ) {

        this.id = uuidv4();;
        this.coordinates = coordinates;
        this.circleData = circleData;
        this.ctx = canvas.getContext('2d');
        this.priority = 0;
        this.isDragging = false;
        this.arrIntersections = [];
        this.isCloned = isCloned;
        this.isCircle = isCircle;
        this._position = position;
    }

    _drawCircle(
        polygon: Polygon
        ): void {

        polygon.ctx.arc(
            polygon.position.x, 
            polygon.position.z, 
            polygon.circleData.r, 
            polygon.circleData.startAngle, 
            polygon.circleData.endAngle);
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

    _drawPolygon(): void {

        if (this.isCircle) {
            this._drawCircle(this);
        } else {
            this._drawLines(this);
        }

    }

    draw() {      
        this.ctx.beginPath();
        this._drawPolygon();

        if (this.arrIntersections.length) {
            this.ctx.fillStyle = 'red';
            this.ctx.fill(); 
        }

        this.ctx.stroke();
    }

    // Здесь считаются координаты полигона в зависимости от позиции(x, z)
    // Меняем позицию и сразу высчитываются координаты
    set position(
        newPosition : Point
        ) {
        (!this.isCircle) && (this.coordinates = this.coordinates.map((point) => {
            return new Point(
                point.x - this._position.x + newPosition.x, 
                point.z - this._position.z + newPosition.z
                )
        }))
        
        this._position = newPosition;
    }

    get position() {
        return this._position;
    }
}