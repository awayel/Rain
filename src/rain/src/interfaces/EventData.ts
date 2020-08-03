import { StandardObject } from '../StandardObject';
import { Scene } from '../../rain';
import SceneGroup from '../SceneGroup';
interface EventData {
    target: StandardObject;
    rank: number;
    scene: Scene;
    sceneGroup: SceneGroup | null;
    point: {
        x: number;
        y: number;
    };
    ctx: CanvasRenderingContext2D | null;
}

export default EventData;

