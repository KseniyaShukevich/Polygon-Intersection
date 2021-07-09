import mousemove from './mousemove';
import mouseup from './mouseup';
import mousedown from './mousedown';
import canvasClass from './CanvasClass';

export const canvas: HTMLCanvasElement = document.querySelector("#canvas");

window.addEventListener('resize', () => {
    canvas.height = document.body.clientHeight - 50;
    canvas.width = document.body.clientWidth - 250;
    canvasClass.draw();
});

document.addEventListener('mousedown', (e: MouseEvent) => mousedown(e));

document.addEventListener('mousemove', (e: MouseEvent) => mousemove(e));

document.addEventListener('mouseup', mouseup);
