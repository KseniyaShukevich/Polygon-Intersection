function calcMaxY(polygonCoordinates) {
    let maxY = polygonCoordinates[0][1];

    for (let i = 1; i < polygonCoordinates.length; i++) {
        if (maxY < polygonCoordinates[i][1]) {
            maxY = polygonCoordinates[i][1];
        }
    }

    return maxY;
}

export default function calcPosition() {
    const indentation = 10;
    let position = [indentation , indentation ];
    let newPosition = [0, 0];

    return function nextPosition(polygonCoordinates) {
        position[0] += newPosition[0];
        position[1] += newPosition[1];

        const maxY = calcMaxY(polygonCoordinates);
        newPosition = [0, maxY + indentation];

        return [[...position], nextPosition];
    }
}