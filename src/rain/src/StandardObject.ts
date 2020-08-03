import Position from './Position';
import EventData from './interfaces/EventData';
import RainImage from './RainImage';
import { moveTypes } from './types/Types';

interface moveOptions {
    type: string;
    position: Position,
    transitionMode?: string;
    distance?: number;
    angle?: number;
    duration?: number;
}

export interface StandarObjectOptions {
    x: number,
    y: number,
    width: number,
    height: number,
    material?: RainImage,
}

export class StandardObject {
    _position_: Position;
    material?: RainImage;
    width: number;
    height: number;
    readonly center: Position;
    position: Position;
    private userData: Object = {};
    constructor({ x, y, width, height, material }: StandarObjectOptions) {
        let me = this;
        this._position_ = new Position(x, y);
        this.position = new Position(x, y);
        Object.defineProperty(me, 'position', {
            get() {
                return me._position_;
            },
            set(position: Position) {
                let { width, height } = me;
                let { x, y } = position;
                me.center.set(x + width / 2, y + height / 2);
                me._position_ = position;
            }
        })
        this.width = width;
        this.height = height;
        this.center = new Position(x + width / 2, y + height / 2);
        if (material) {
            this.material = material;
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        if (this.material) {
            ctx.drawImage(this.material.image, this.position.x, this.position.y, this.width, this.height);
        }
    }
    onClick(e: EventData) {
        console.log(this);
    }
    moveTo(options: moveOptions) {
        switch (options.type) {
            case moveTypes.NORMAL:
                if (options.position) {
                    this.position = options.position;
                }
                break;
            case moveTypes.GRADULLY:
                if (options.position && options.duration) {
                    // this.position = options.position;
                    let times = options.duration * 60, nowTime = 0;
                    let verticeX = (options.position.x - this.position.x) / times;
                    let verticeY = (options.position.y - this.position.y) / times;
                    let timer = setInterval(() => {
                        this.position.x += verticeX;
                        this.position.y += verticeY;
                        nowTime++;
                        if (nowTime >= times) clearInterval(timer);
                    }, options.duration / times)
                }else{
                    throw new Error('Mobile mode: transition, need to set the transition time---duration')
                }
                break;
            default:
                break;
        }
    }
    setUserData(data: Object) {
        this.userData = data;
    }
    getUserData() {
        return JSON.parse(JSON.stringify(this.userData));
    }
}