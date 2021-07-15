export default class Circle {
    x: number;
    z: number;
    r: number;
    startAngle: number;
    endAngle: number;

    constructor(
        x: number,
        z: number,
        r: number, 
        startAngle: number, 
        endAngle: number,
    ) {
        
        this.x = x;
        this.z = z;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
    }
}