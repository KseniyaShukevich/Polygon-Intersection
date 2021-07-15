import Point from './Point';
import { v4 as uuidv4 } from 'uuid';
import Circle from './Circle';

export default class Polygon {
    id: string;
    coordinates: Array<Point>;
    circleData: Circle;
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
        this.priority = 0;
        this.isDragging = false;
        this.arrIntersections = [];
        this.isCloned = isCloned;
        this.isCircle = isCircle;
        this._position = position;
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