import polygons from './polygons';
import Polygon from './Polygon';
import Point from './Point';
import { canvas } from './canvas';
import Image from './image'

class Canvas {
    polygons: Array<Polygon>;
    images: Array<any>;

    constructor(polygons: Array<Polygon>) {
        this.polygons = polygons;
        this.images = [];
    }

    _sort(): void {
        this.polygons.sort((polygon1, polygon2) => {
            return polygon1.priority - polygon2.priority;
        })
    }

    clear(): void {
        this.polygons[0].ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    draw(): void {
        this.clear();
        this._sort();

        this.polygons.forEach((polygon) => {
            if (polygon.isCloned) {
                polygon.draw();
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
            polygon.draw();
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
