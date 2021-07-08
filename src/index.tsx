import React, {useEffect, useRef} from 'react';
import ReactDom from 'react-dom';
import mousedown from './scripts/mousedown';
import mousemove from './scripts/mousemove';
import mouseup from './scripts/mouseup';
import Canvas from './scripts/CanvasClass';
import calcPosition from './scripts/calcPosition';
import polygons from './scripts/polygons';
import Polygon from './scripts/Polygon';
import './styles/index.css';

const App: React.FC = () => {
    const canvas = useRef(null);
    const canvasClass = useRef(null);
    const funcCalcPosition = calcPosition();

    const calcHeightWidthCanvas = () => {
        canvas.current.height = document.body.clientHeight - 50;
        canvas.current.width = document.body.clientWidth - 50;
    }

    const resize = () => {
        window.addEventListener('resize', () => {
            calcHeightWidthCanvas();
            canvasClass.current.draw();
        });
    }

    const initCanvas = () => {
        const arrObjPolygons = polygons.map((polygon, index) => {
            return new Polygon(canvas.current, polygon, index)
        })

        canvasClass.current = new Canvas(canvas.current, arrObjPolygons);
        canvasClass.current.initDraw(funcCalcPosition);
    }

    useEffect(() => {
        calcHeightWidthCanvas();
    }, [])

    useEffect(() => {
        initCanvas();
    }, [])

    useEffect(() => {
        resize();
    }, [])

    return(
        <div id="wrapper-canvas">
            <canvas 
                id='canvas'
                ref={canvas}
                onMouseDown={(e: any) => mousedown(e, canvasClass.current)}
                onMouseMove={(e: any) => mousemove(e, canvasClass.current)}
                onMouseUp={(e) => mouseup(e, canvasClass.current)}
            >Обновите браузер
            </canvas>
        </div>
    );
}

ReactDom.render(<App/>, document.getElementById('root'));