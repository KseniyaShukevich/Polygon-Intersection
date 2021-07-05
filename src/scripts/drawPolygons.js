import polygons from './polygons';
import calcPosition from './calcPosition';

let funcCalcPosition = calcPosition();

function initDrawPolygons() {
    polygons.forEach((polygon) => {
        const [position, func] = funcCalcPosition(polygon.coordinates);
        polygon.position = position;
        polygon.draw();
        funcCalcPosition = func;
    })
}

initDrawPolygons();

window.addEventListener('resize', () => {
    polygons.forEach((polygon) => polygon.draw());
});
