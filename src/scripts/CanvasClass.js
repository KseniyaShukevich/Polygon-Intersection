import polygons from './polygons';
import calcPosition from './calcPosition';

let funcCalcPosition = calcPosition();

class Canvas {
    constructor(polygons) {
        this.polygons = polygons;
    }

    _sort() {
        this.polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        })
    }

    _drawLines(polygon) {
        for (let i = 0; i < polygon.coordinates.length; i++) {
            if (i == 0) {
                polygon.ctx.moveTo(polygon.coordinates[i][0], polygon.coordinates[i][1])
            } else {
                polygon.ctx.lineTo(polygon.coordinates[i][0], polygon.coordinates[i][1])
            }; 
        }
    }

    clear() {
        this.polygons[0].ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw() {
        this.clear();
        this._sort();

        this.polygons.forEach((polygon) => {
            polygon.ctx.beginPath();

            this._drawLines(polygon);

            if (polygon.isCrossed) {
                polygon.ctx.fillStyle = 'red';
                polygon.ctx.fill(); 
            }

            polygon.ctx.stroke();
        });
    }

    move(distanceX, distanceY, draggingPolygon) {
        draggingPolygon.position = [
            draggingPolygon.position[0] + distanceX, 
            draggingPolygon.position[1] + distanceY
        ];
        this.draw();
    }

    initDraw(calcPosition) {
        this.polygons.forEach((polygon) => {
            const [position, func] = calcPosition(polygon.coordinates);
            polygon.position = position;
            calcPosition = func;
        })

        this.draw();
    }
}

const canvasClass = new Canvas(polygons);
canvasClass.initDraw(funcCalcPosition);

export default canvasClass;
