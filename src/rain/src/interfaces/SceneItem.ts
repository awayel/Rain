import { StandardObject } from '../StandardObject';
import SceneGroup from '../SceneGroup';
interface SceneItem {
    rank: number,
    target: StandardObject|SceneGroup
}

export default SceneItem;