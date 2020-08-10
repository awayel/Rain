import EventData from '../interfaces/EventData';
import { Renderer, Scene } from '../../rain';
import Size from '../Size';
import { StandardObject } from '../StandardObject';
import SceneGroup from '../SceneGroup';
export function rageTouchDetermination(e: MouseEvent, renderer: Renderer, scene: Scene) {
    let aimx = e.offsetX * renderer.devicePixelRatio;
    let aimy = e.offsetY * renderer.devicePixelRatio;
    let list = scene.children;
    let ctx = renderer.ctx;
    for (let i = list.length - 1; i >= 0; i--) {
        let item = list[i].target;
        if (item instanceof SceneGroup) {
            for (let i = item.children.length - 1; i >= 0; i--) {
                const child = item.children[i].target;
                let { x, y } = child._position_;
                let xg = item.position.x;
                let yg = item.position.y;
                x = x + xg;
                y = y + yg;
                let { width, height } = child;
                let min_x = x;
                let max_x = x + width;
                let min_y = y;
                let max_y = y + height;
                if (aimx > min_x && aimx < max_x && aimy > min_y && aimy < max_y) {
                    let eventData: EventData = {
                        target: child,
                        rank: list[i].rank,
                        scene: scene,
                        sceneGroup: item,
                        point: { x: aimx, y: aimy },
                        ctx
                    }
                    return { res: true, eventData };
                }
            }
        } else if (item instanceof StandardObject) {
            let { x, y } = item._position_;
            let { width, height } = item;
            let min_x = x;
            let max_x = x + width;
            let min_y = y;
            let max_y = y + height;
            if (aimx > min_x && aimx < max_x && aimy > min_y && aimy < max_y) {
                let eventData: EventData = {
                    target: item,
                    rank: list[i].rank,
                    scene: scene,
                    sceneGroup: null,
                    point: { x: aimx, y: aimy },
                    ctx
                }
                //debugger;
                return { res: true, eventData };
            }
        }
    }
    //debugger;
    return { res: false };
}

function createCav(size: Size) {
    let { width, height } = size;
    let canvas = document.createElement("canvas");
    canvas.height = height;
    canvas.width = width;
    let ctx = canvas.getContext('2d')
    return { canvas, ctx }
}

export function pixelTouchDetermination(e: MouseEvent, renderer: Renderer, scene: Scene) {
    let backUp = createCav(renderer.getSize());   // a canvas to compare
    let aimx = e.offsetX * renderer.devicePixelRatio;
    let aimy = e.offsetY * renderer.devicePixelRatio;
    let ctx = renderer.ctx;
    let point = ctx.getImageData(aimx, aimy, 1, 1);
    let children = scene.children;
    if (point.data[3] !== 0 && backUp.ctx) {
        for (let i = children.length - 1; i >= 0; i--) {
            const item = children[i].target;
            if (item instanceof SceneGroup) {
                for (let i = item.children.length - 1; i >= 0; i--) {
                    const child = item.children[i].target;
                    child.render(backUp.ctx, item);
                    let comparePoint = backUp.ctx.getImageData(aimx, aimy, 1, 1)
                    backUp.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);  //clean canvas
                    if (comparePoint.data[3] !== 0) {
                        let eventData: EventData = {
                            target: child,
                            rank: children[i].rank,
                            scene: scene,
                            sceneGroup: item,
                            point: { x: aimx, y: aimy },
                            ctx
                        }
                        return { res: true, eventData };
                    }

                }
            } else if (item instanceof StandardObject) {
                item.render(backUp.ctx, item);
                let comparePoint = backUp.ctx.getImageData(aimx, aimy, 1, 1)
                backUp.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);  //clean canvas
                if (comparePoint.data[3] !== 0) {
                    let eventData: EventData = {
                        target: item,
                        rank: children[i].rank,
                        scene: scene,
                        sceneGroup: null,
                        point: { x: aimx, y: aimy },
                        ctx
                    }
                    return { res: true, eventData };
                }
            }
        }
        return { res: false }
    } else {
        return { res: false }
    }
}
