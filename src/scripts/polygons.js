import Polygon from './Polygon';

const polygon1 = [
    [20, 20],
    [40, 0],
]

const polygon2 = [
    [20, 30],
    [40, 30],
    [40, 0],
]

const polygon3 = [
    [20, 20],
    [50, 30],
    [60, 15],
    [40, 0],
]

const polygon4 = [
    [40, 20],
    [20, 30],
    [10, 10]
]

const polygon5 = [
    [60, 15],
    [40, 0],
    [40, 20],
    [20, 30],
    [10, 10]
]

const polygon6 = [
    [40, 30],
    [40, 0],
    [40, 0],
    [40, 20],
]

const polygon7 = [
    [40, 0],
    [40, 20],
    [50, 30],
    [60, 15],
    [40, 0],
]

const polygon8 = [
    [40, 30],
    [40, 0],
    [60, 15],
]

const polygon9 = [
    [40, 0],
    [40, 20],
    [20, 30],
]

const polygon10 = [
    [20, 20],
    [50, 30],
    [60, 15],
]

const polygons = [
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

const arrObjPolygons = polygons.map((polygon, index) => {
    return new Polygon(polygon, index);
})

export default arrObjPolygons;
