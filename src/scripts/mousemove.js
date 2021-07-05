import canvasClass from './CanvasClass';
import general from './general';

function movePolygon(draggingPolygon, currentMouseX, currentMouseY) {
    if (general.oldMouseX && general.oldMouseY) {
        const distanceX = currentMouseX - general.oldMouseX;
        const distanceY = currentMouseY - general.oldMouseY;
        general.changeOldMousePosition(currentMouseX, currentMouseY);
        canvasClass.move(distanceX, distanceY, draggingPolygon);
    } else {
        general.changeOldMousePosition(currentMouseX, currentMouseY);
    }
}

export default function mousemove(e) {
    const draggingPolygon = canvasClass.polygons.find((polygon) => polygon.isDragging);
    if (draggingPolygon) {
        const currentMouseX = e.pageX - e.target.offsetLeft;
        const currentMouseY = e.pageY - e.target.offsetTop;
        movePolygon(draggingPolygon, currentMouseX, currentMouseY);
    }
}