import Polygon from './Polygon';
import Point from './Point';

const polygon1 = [
    new Point(20, 20),
    new Point(40, 0),
]

const polygon2 = [
    new Point(20, 30),
    new Point(40, 30),
    new Point(40, 0),
]

const polygon3 = [
    new Point(20, 20),
    new Point(50, 30),
    new Point(60, 15),
    new Point(40, 0),
]

const polygon4 = [
    new Point(40, 20),
    new Point(20, 30),
    new Point(10, 10)
]

const polygon5 = [
    new Point(60, 15),
    new Point(40, 0),
    new Point(40, 20),
    new Point(20, 30),
    new Point(10, 10)
]

const polygon6 = [
    new Point(40, 30),
    new Point(40, 0),
    new Point(40, 0),
    new Point(40, 20),
]

const polygon7 = [
    new Point(40, 0),
    new Point(40, 20),
    new Point(50, 30),
    new Point(60, 15),
    new Point(40, 0),
]

const polygon8 = [
    new Point(40, 30),
    new Point(40, 0),
    new Point(60, 15),
]

const polygon9 = [
    new Point(40, 0),
    new Point(40, 20),
    new Point(20, 30),
]

const polygon10 = [
    new Point(20, 20),
    new Point(50, 30),
    new Point(60, 15),
]

const polygons: Array<Array<Point>> = [
    polygon1,
    polygon2,
    polygon3,
    polygon4,
    polygon5,
    polygon6,
    polygon7,
    polygon8,
    polygon9,
    polygon10
]

const arrObjPolygons: Array<Polygon> = polygons.map((polygon, index) => {
    return new Polygon(polygon, index);
})

export default arrObjPolygons;
