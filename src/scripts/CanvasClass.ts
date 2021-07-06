import polygons from './polygons';
import calcPosition from './calcPosition';
import Polygon from './Polygon';
import Point from './Point';
import { canvas } from './canvas';

let funcCalcPosition = calcPosition();

class Canvas {
    polygons: Array<Polygon>;

    constructor(polygons: Array<Polygon>) {
        this.polygons = polygons;
    }

    _sort() {
        this.polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        })
    }

    _drawLines(polygon: Polygon) {
        for (let i = 0; i < polygon.coordinates.length; i++) {
            if (i == 0) {
                polygon.ctx.moveTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
            } else {
                polygon.ctx.lineTo(polygon.coordinates[i].x, polygon.coordinates[i].z)
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

            if (polygon.arrIntersections.length) {
                polygon.ctx.fillStyle = 'red';
                polygon.ctx.fill(); 
            }

            polygon.ctx.stroke();
        });
    }

    move(point: Point, draggingPolygon: Polygon) {
        draggingPolygon.position = {
            x: draggingPolygon.position.x + point.x, 
            z: draggingPolygon.position.z + point.z
        };
        this.draw();
    }

    initDraw(calcPosition: any) {
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
