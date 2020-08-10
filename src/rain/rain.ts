import { StandardObject } from './src/StandardObject';
import RainImage from './src/RainImage';
import { Card } from './src/Card';
import Size from './src/Size';
import { touchTypes } from './src/types/Types';
import { addClickEvent } from './src/events/events';
import SceneItem from './src/interfaces/SceneItem';
import SceneGroup from './src/SceneGroup';
import Files from './src/Files';

export class Renderer {
    domElement: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    devicePixelRatio: number;
    private size: Size;
    constructor(width: number, height: number) {
        if (!width || !height) throw new Error("Renderer need set width and height");
        let cav = document.createElement("canvas");
        this.devicePixelRatio = window.devicePixelRatio;
        cav.width = this.devicePixelRatio * width;
        cav.height = this.devicePixelRatio * height;
        this.size = new Size(cav.width, cav.height);
        this.domElement = cav;
        let ctx: CanvasRenderingContext2D;
        let ctxOrign = cav.getContext('2d');
        if (ctxOrign) {
            ctx = ctxOrign;
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, width, height);
            this.ctx = ctx;
        } else {
            throw new Error("browser don't support Canvas.")
        }
    }
    render(scene: Scene) {
        let ctx = this.ctx;
        let { width, height } = this.size;
        ctx.clearRect(0, 0, width, height);
        scene.children = scene.children.sort((a, b) => a.rank - b.rank);
        for (let index = 0; index < scene.children.length; index++) {
            let element = scene.children[index];
            element.rank = index;
            if (element.target instanceof SceneGroup) {
                element.target.children = element.target.children.sort((a,b)=>a.groupRank-b.groupRank);
                for (let index2 = 0; index2 < element.target.children.length; index2++) {
                    const childElement = element.target.children[index2];
                    childElement.target.render(ctx,element.target);
                }
            }else if (element.target instanceof StandardObject) {
                element.target.render(ctx,element.target);
            }
        }
    }
    setSize(width: number, height: number) {
        this.devicePixelRatio = window.devicePixelRatio;
        this.domElement.width = this.devicePixelRatio * width;
        this.domElement.height = this.devicePixelRatio * height;
    }
    getSize() {
        return new Size(this.size.width, this.size.height);
    }
}


export enum MouseActions {
    Click = 'click'
}


export class Scene {
    children: Array<SceneItem>;
    constructor() {
        this.children = [];
    }
    add(newObj: SceneGroup | StandardObject) {
        let item: SceneItem = {
            rank: this.children.length,
            target: newObj
        }
        this.children.push(item);
    }
    addEvent(type: MouseActions, renderer: Renderer, touchType: touchTypes = touchTypes.RANGE) {
        let scene = this;
        switch (type) {
            case MouseActions.Click:
                addClickEvent(renderer, touchType, scene);
                return;
        }
    }
}



export default {
    Renderer,
    Scene,
    StandardObject,
    RainImage,
    Card,
    Files
}