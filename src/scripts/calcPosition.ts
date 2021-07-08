import Point from './Point';

function calcMaxZ(
    polygonCoordinates: Array<Point>
    ): number {
        
    let maxZ: number = polygonCoordinates[0].z;

    for (let i = 1; i < polygonCoordinates.length; i++) {
        if (maxZ < polygonCoordinates[i].z) {
            maxZ = polygonCoordinates[i].z;
        }
    }

    return maxZ;
}

export default function calcPosition(): (value: Array<Point>) => Array<Point | object>{
    const indentation: number = 10;
    let position: Point = new Point(indentation, indentation);
    let newPosition: Point = new Point(0, 0);

    return function calcNextPosition(
        polygonCoordinates: Array<Point>
        ): Array<Point | object> {
            
        position.x += newPosition.x;
        position.z += newPosition.z;
        const maxZ: number = calcMaxZ(polygonCoordinates);
        newPosition = new Point(0, maxZ + indentation);

        return [position.clone(), calcNextPosition];
    }
}