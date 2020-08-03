class Size {
    width: number = 0;
    height: number = 0;
    constructor(width: number, height: number) {
        this.set(width, height);
    }
    set(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

export default Size;