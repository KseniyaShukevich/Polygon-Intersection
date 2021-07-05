import Point from './Point';

function calcMaxZ(polygonCoordinates) {
    let maxZ = polygonCoordinates[0].z;

    for (let i = 1; i < polygonCoordinates.length; i++) {
        if (maxZ < polygonCoordinates[i].z) {
            maxZ = polygonCoordinates[i].z;
        }
    }

    return maxZ;
}

export default function calcPosition() {
    const indentation = 10;
    let position = new Point(indentation, indentation);
    let newPosition = new Point(0, 0);

    return function calcNextPosition(polygonCoordinates) {
        position.x += newPosition.x;
        position.z += newPosition.z;
        const maxZ = calcMaxZ(polygonCoordinates);
        newPosition = {
            x: 0,
            z: maxZ + indentation
        }

        return [{...position}, calcNextPosition];
    }
}