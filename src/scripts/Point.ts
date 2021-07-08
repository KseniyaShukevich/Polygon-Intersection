export default class Point {
    x: number;
    z: number;

    constructor(x: number, z: number) {
        this.x = x;
        this.z = z;
    }

    clone() {
        return new Point(this.x, this.z);
    }
}