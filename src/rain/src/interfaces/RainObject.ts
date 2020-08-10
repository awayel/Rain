import Position from '../Position';
import RainImage from '../RainImage';
import { StandardObject } from '../StandardObject';
export default interface RainObject{
    _position_: Position;
    material?: RainImage;
    width: number;
    height: number;
    readonly center: Position;
    position: Position;
    userData: Object;
    type: string;
    render:(ctx: CanvasRenderingContext2D,renderTarget:StandardObject)=>void;
}