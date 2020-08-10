import moveOptions from '../interfaces/MoveOptions';
import { StandardObject } from '../StandardObject';
export function gradullyMoveActions(options: moveOptions, me: StandardObject) {
    if (options.duration) {
        let times = options.duration * 60, nowTime = 0;
        let verticeX = (options.position.x - me.position.x) / times;
        let verticeY = (options.position.y - me.position.y) / times;
        let timer = setInterval(() => {
            me.position.x += verticeX;
            me.position.y += verticeY;
            nowTime++; 
            if (nowTime >= times) clearInterval(timer);
        }, options.duration / times)
    }
}