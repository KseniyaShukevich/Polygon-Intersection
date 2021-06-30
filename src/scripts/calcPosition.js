function calcMaxY(polygonCoords) {
    let maxY = polygonCoords[0][1];

    for (let i = 1; i < polygonCoords.length; i++) {
        if (maxY < polygonCoords[i][1]) {
            maxY = polygonCoords[i][1];
        }
    }

    return maxY;
}

export default function caclcPosition() {
    const indentation = 10;
    let position = [indentation , indentation ];
    let newPosition = [0, 0];

    return function nextPosition(polygonCoords) {
        position[0] += newPosition[0];
        position[1] += newPosition[1];

        const maxY = calcMaxY(polygonCoords);
        newPosition = [0, maxY + indentation];

        return [[...position], nextPosition];
    }
}