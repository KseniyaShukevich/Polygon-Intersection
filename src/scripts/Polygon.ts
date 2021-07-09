import { canvas } from './canvas';
import Point from './Point';
import { v4 as uuidv4 } from 'uuid';

export default class Polygon {
    id: string;
    coordinates: Array<Point>;
    ctx: any;
    priority: number;
    isDragging: boolean;
    arrIntersections: Array<string | never>;
    isCloned: boolean;
    _position: Point;

    constructor(coordinates: Array<Point>, isCloned: boolean = false) {
        this.id = uuidv4();;
        this.coordinates = coordinates;
        this.ctx = canvas.getContext('2d');
        this.priority = 0;
        this.isDragging = false;
        this.arrIntersections = [];
        this.isCloned = isCloned;
        this._position = new Point(0, 0);
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

    draw() {      
        this.ctx.beginPath();
        this._drawLines(this);

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

        this.coordinates = this.coordinates.map((point) => {
            return new Point(
                point.x - this._position.x + newPosition.x, 
                point.z - this._position.z + newPosition.z
                )
        });
        
        this._position = newPosition;
    }

    get position() {
        return this._position;
    }
}