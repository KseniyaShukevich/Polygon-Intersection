import React, { useRef } from 'react';
import ReactDom from 'react-dom';
import canvasClass from './CanvasClass';
import inPolygon from './inPolygon';
import Point from './Point';
import { getShiftXZ } from './services';
import '../styles/index.css';
import Image from './image';

const Menu: React.FC = () => {
    const draggingImage = useRef(null);

    const moveAt = (
        e: any, 
        shiftX: number, 
        shiftZ: number,
    ): void => {

        draggingImage.current.style.left = e.pageX - shiftX + 'px';
        draggingImage.current.style.top = e.pageY - shiftZ + 'px';
    }

    const mousedown = (
        e: React.MouseEvent<HTMLImageElement>, 
        image: Image,
    ): void => {

        const shift = getShiftXZ(e);
        const polygon = canvasClass.polygons.find((elem) => elem.id === image.id);
        
        if (inPolygon(new Point(shift.x, shift.z), polygon)){
            draggingImage.current.src = image.data;
            draggingImage.current.id = image.id;

            moveAt(e, shift.x, shift.z);
        }

        document.onmousemove = function(e) {
          moveAt(e, shift.x, shift.z);
        };
    }

    const mouseup = (): void => {
        document.onmousemove = null;
        draggingImage.current.onmouseup = null;
        draggingImage.current.src = '';
        draggingImage.current.id = '';
    }

    return(
        <>
            <div className='menu'>
                <div className='wrapper-images'>
                {
                    canvasClass.images.map((image) => {
                        return <img
                                    src={image.data} 
                                    key={image.id} 
                                    id={image.id}
                                    className='image'
                                    onDragStart={(e) => e.preventDefault()}
                                    onMouseDown={(e) => mousedown(e, image)}
                                />
                    })
                }
                </div>
            </div>
            <img 
                ref={draggingImage}
                className='dragging-image'
                onDragStart={(e) => e.preventDefault()}
                onMouseUp={() => mouseup()}
            />
        </>
    )
}

ReactDom.render(<Menu/>, document.getElementById('root'));