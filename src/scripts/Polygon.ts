import Point from './Point';

export default class Polygon {
    canvas: HTMLCanvasElement
    id: number;
    coordinates: Array<Point>;
    ctx: any;
    priority: number;
    isDragging: boolean;
    arrIntersections: Array<number | never>;
    _position: Point;

    constructor(
        canvas: HTMLCanvasElement, 
        arr: Array<Point>, 
        id: number
        ) {
            
        this.id = id;
        this.coordinates = [new Point(0, 0), ...arr, new Point(0, 0)];
        this.ctx = canvas.getContext('2d');
        this.priority = 0;
        this.isDragging = false;
        this.arrIntersections = [];
        this._position = new Point(0, 0);
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