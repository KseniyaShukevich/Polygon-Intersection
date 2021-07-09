import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import canvasClass from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';
import { getShiftXZ } from './services';

const Menu: React.FC = () => {
    const draggingImage = useRef(null);

    const mousedown = (e: React.MouseEvent<HTMLImageElement>, image: any) => {
        const [shiftX, shiftZ] = getShiftXZ(e);

        const polygon = canvasClass.polygons.find((elem) => elem.id === image.id);
        if (inPolygon(new Point(shiftX, shiftZ), polygon)){
            draggingImage.current.src = image.data;
            draggingImage.current.id = image.id;

            moveAt(e);
        }

        function moveAt(e: any) {
            draggingImage.current.style.left = e.pageX - shiftX + 'px';
            draggingImage.current.style.top = e.pageY - shiftZ + 'px';
          }

        document.onmousemove = function(e) {
          moveAt(e);
        };
    }

    const mouseup = () => {
        document.onmousemove = null;
        draggingImage.current.onmouseup = null;
        draggingImage.current.src = '';
        draggingImage.current.id = '';
    }

    return(
        <>
            <div style={{width: 100, height: '100vh', background: 'gray', boxShadow: '4px 3px 5px rgba(0, 0, 0, 0.7)'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', height: 600}}>
                {
                    canvasClass.images.map((image) => {
                        return <img
                                    src={image.data} 
                                    key={image.id} 
                                    id={image.id}
                                    style={{width: 60, select: 'none', msUserSelect: 'none', userSelect: 'none'}}
                                    onDragStart={(e) => e.preventDefault()}
                                    onMouseDown={(e) => mousedown(e, image)}
                                />
                    })
                }
                </div>
            </div>
            <img 
                ref={draggingImage}
                style={{width: 60, select: 'none', msUserSelect: 'none', userSelect: 'none', position: 'absolute'}}
                onDragStart={(e) => e.preventDefault()}
                onMouseUp={() => mouseup()}
            />
        </>
    )
}

ReactDom.render(<Menu/>, document.getElementById('root'));