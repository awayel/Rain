import SceneGroupItem from './interfaces/SceneGroupItem';
import { StandardObject } from './StandardObject';

class SceneGroup extends StandardObject{
    children: Array<SceneGroupItem> = [];
    rank:number=0;
    constructor(){
        super({x:0,y:0,width:0,height:0});
        this.type="SceneGroup";
    }
    add(newObj: StandardObject) {
        let item = {
            groupRank:this.children.length,
            target:newObj
        }
        this.children.push(item);
    }
}

export default SceneGroup;