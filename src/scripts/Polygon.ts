import Point from './Point';
import { v4 as uuidv4 } from 'uuid';
import Circle from './Circle';

export default class Polygon {
    id: string;
    coordinates: Array<Point>;
    circleData: Circle;
    priority: number;
    isDragging: boolean;
    arrIntersections: Array<string | never>;
    isCloned: boolean;
    isCircle: boolean;

    constructor(
        coordinates: Array<Point>, 
        isCloned: boolean = false, 
        circleData: Circle = new Circle(0, 0, 0, 0, 0), 
        isCircle: boolean = false,
    ) {

        this.id = uuidv4();
        this.coordinates = coordinates;
        this.circleData = circleData;
        this.priority = 0;
        this.isDragging = false;
        this.arrIntersections = [];
        this.isCloned = isCloned;
        this.isCircle = isCircle;
    }

    calcCoordinates(
        movementPoint : Point
    ): void {

        if (this.isCircle) {
            this.circleData.x += movementPoint.x;
            this.circleData.z += movementPoint.z;
        }

        this.coordinates = this.coordinates.map((point) => {
            return new Point(
                point.x + movementPoint.x, 
                point.z + movementPoint.z
                )
        })
    }
}