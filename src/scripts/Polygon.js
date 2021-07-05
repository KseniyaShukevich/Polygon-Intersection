import { canvas } from './canvas';

export default class Polygon {
    constructor(arr, id) {
        this.id = id;
        this.coordinates = [[0, 0], ...arr, [0, 0]];
        this.ctx = canvas.getContext('2d');
        this.priority = 0;
        this.isCrossed = false;
        this.isDragging = false;
        this.arrIntersections = [];
        this._position = [0, 0];
    }

    // Здесь считаются координаты полигона в зависимости от позиции(x, z)
    // Меняем позицию и сразу высчитываются координаты
    set position(newPosition) {

        this.coordinates = this.coordinates.map((point) => [
            point[0] - this._position[0] + newPosition[0],
            point[1] - this._position[1] + newPosition[1],
        ]);
        
        this._position = newPosition;
    }

    get position() {
        return this._position;
    }
}