import mousemove from './mousemove';
import mouseup from './mouseup';
import mousedown from './mousedown';
import canvasClass from './CanvasClass';

export const canvas = document.querySelector("#canvas");
canvas.height = document.body.clientHeight - 50;
canvas.width = document.body.clientWidth - 50;

window.addEventListener('resize', () => {
    canvas.height = document.body.clientHeight - 50;
    canvas.width = document.body.clientWidth - 50;
    canvasClass.draw();
});

canvas.addEventListener('mousedown', (e) => mousedown(e));

canvas.addEventListener('mousemove', (e) => mousemove(e));

canvas.addEventListener('mouseup', mouseup);
