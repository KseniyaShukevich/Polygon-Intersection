import { canvas } from './canvas';

export default class Polygon {
    constructor(arr, id) {
        this.id = id;
        this.coordinates = [[0, 0], ...arr, [0, 0]];
        this.ctx = canvas.getContext('2d');
        this.priority = 0;
        this.isCrossLine = false;
        this.isDragging = false;
        this.arrIntersections = [];
        this._position = [0, 0];
    }

    draw() {      
        this.ctx.beginPath();
        for (let i = 0; i < this.coordinates.length; i++) {
            if (i == 0) this.ctx.moveTo(this.coordinates[i][0], this.coordinates[i][1]) 
                else this.ctx.lineTo(this.coordinates[i][0], this.coordinates[i][1]); 
        }
        if (this.isCrossLine) {
            this.ctx.fillStyle = 'red';
            this.ctx.fill(); 
        }
        this.ctx.stroke();
    }

    clear() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    move(distanceX, distanceY, arrToDraw) {
        this.clear();
        this.position = [this.position[0] + distanceX, this.position[1] + distanceY];
        arrToDraw.forEach(polygon => {
            polygon.draw();
        })
    }

    set position(newPosition) {

        this.coordinates = this.coordinates.map((elem) => [
            elem[0] - this._position[0] + newPosition[0],
            elem[1] - this._position[1] + newPosition[1],
        ]);
        
        this._position = newPosition;
    }

    get position() {
        return this._position;
    }
}