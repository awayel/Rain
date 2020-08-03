import Sprit from './interfaces/Sprit';
interface Options {
    src: string,
    onload?: ((this: GlobalEventHandlers, ev: Event) => any) | null,
    start:number;
    end:number;
    width:number;
    height:number;
}

export default class RainImage {
    src: string;
    image: HTMLImageElement;
    start:number;
    end:number;
    width:number;
    height:number;
    constructor(options: Options) {
        this.image = new Image();
        if (options.onload) {
            this.image.onload = options.onload;
        }
        this.src = options.src;
        this.image.src=this.src;
        this.start=options.start;
        this.end=options.end;
        this.width=options.width;
        this.height=options.height;
    }
}