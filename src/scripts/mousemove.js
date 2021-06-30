import arrObjPolygons from './polygons';
import general from './general';

function movePolygon(dragElem, x, y) {
    if (general.oldMouseX && general.oldMouseY) {
        const distanceX = x - general.oldMouseX;
        const distanceY = y - general.oldMouseY;
        general.changeOldMousePos(x, y);
        dragElem.move(distanceX, distanceY, arrObjPolygons);
    } else {
        general.changeOldMousePos(x, y);
    }
}

export default function mousemove(e) {
    const dragElem = arrObjPolygons.find((elem) => elem.isDrag);
    if (dragElem) {
        const x = e.pageX - e.target.offsetLeft;
        const y = e.pageY - e.target.offsetTop;
        movePolygon(dragElem, x, y);
    }
}