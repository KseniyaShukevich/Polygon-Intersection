import Polygon from './Polygon';
import Point from './Point';
import Circle from './Circle';

interface IInitPolygon {
    coordinates?: Array<Point>
    circleData?: Circle
    isCircle?: boolean
}

const polygon1: IInitPolygon = {
    coordinates: [
        new Point(0, 0),
        new Point(30, 60),
        new Point(60, 0),
        new Point(0, 0),
    ]
}

const polygon2: IInitPolygon = {
    coordinates: [
        new Point(0, 0),
        new Point(60, 0),
        new Point(60, 60),
        new Point(0, 60),
        new Point(0, 0),
    ]
}

const polygon4: IInitPolygon = {
    coordinates: [
        new Point(0, 30),
        new Point(30, 0),
        new Point(60, 30),
        new Point(30, 60),
        new Point(0, 30),
    ]
}

const polygon5: IInitPolygon = {
    coordinates: [
        new Point(0, 20),
        new Point(20, 20),
        new Point(20, 0),
        new Point(40, 0),
        new Point(40, 20),
        new Point(60, 20),
        new Point(60, 40),
        new Point(40, 40),
        new Point(40, 60),
        new Point(20, 60),
        new Point(20, 40),
        new Point(0, 40),
        new Point(0, 20),
    ]
}

const polygon7: IInitPolygon = {
    circleData: new Circle(30, 30, 29, 0, 2 * Math.PI),
    isCircle: true
}

const polygons: Array<IInitPolygon> = [
    polygon1,
    polygon2,
    polygon4,
    polygon5,
    polygon7,
]

const arrObjPolygons: Array<Polygon> = polygons.map((polygon) => {
    if (polygon.isCircle) {

        return new Polygon([], false, polygon.circleData, polygon.isCircle);
    }
    
    return new Polygon(polygon.coordinates);
})

export default arrObjPolygons;
