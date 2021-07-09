import Polygon from './Polygon';
import Point from './Point';

const polygon1: Array<Point> = [
    new Point(0, 0),
    new Point(30, 60),
    new Point(60, 0),
    new Point(0, 0),
]

const polygon2: Array<Point> = [
    new Point(0, 0),
    new Point(60, 0),
    new Point(60, 60),
    new Point(0, 60),
    new Point(0, 0),
]

const polygon4: Array<Point> = [
    new Point(0, 30),
    new Point(30, 0),
    new Point(60, 30),
    new Point(30, 60),
    new Point(0, 30),
]

const polygon5: Array<Point> = [
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

const polygon6: Array<Point> = [
    new Point(0, 30),
    new Point(15, 0),
    new Point(45, 0),
    new Point(60, 30),
    new Point(0, 30),
]

const polygons: Array<Array<Point>> = [
    polygon1,
    polygon2,
    polygon4,
    polygon5,
    polygon6,
]

const arrObjPolygons: Array<Polygon> = polygons.map((polygon) => {
    return new Polygon(polygon);
})

export default arrObjPolygons;
