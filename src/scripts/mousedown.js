import arrObjPolygons from './polygons';
import inPolygon from './inPolygon';

function chooseDragElem(potentialMove) {
    let dragElem = potentialMove[0];

    potentialMove.forEach((elem) => {
        if (dragElem.priority < elem.priority) {
            dragElem = elem;
        }
    });

    return dragElem;
}

function getArrCoords(polygon) {
    const xCoords = polygon.coords.map(elem => {
        return elem[0];
    });
    const yCoords = polygon.coords.map(elem => {
        return elem[1];
    });
    return [xCoords, yCoords];
}
  
export default function mousedown(e) {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const potentialMove = arrObjPolygons.filter((polygon) => {
        const [xCoords, yCoords] = getArrCoords(polygon);
        return inPolygon(x, y, polygon);
    });

   if (potentialMove.length) {
        const dragElem = chooseDragElem(potentialMove);
        dragElem.isDrag = true;
   }
}