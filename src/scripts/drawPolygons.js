import arrObjPolygons from './polygons';
import calcPosition from './calcPosition';

let funcCalcPosition = calcPosition();

function initDrawPolygons() {
    arrObjPolygons.forEach((polygon) => {
        const [position, func] = funcCalcPosition(polygon.coords);
        polygon.position = position;
        polygon.draw();
        funcCalcPosition = func;
    })
}

initDrawPolygons();

window.addEventListener('resize', () => {
    arrObjPolygons.forEach((elem) => elem.draw());
});
