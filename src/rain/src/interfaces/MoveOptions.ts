import Position from '../Position';
interface moveOptions {
    type: string;
    position: Position,
    transitionMode?: string;
    distance?: number;
    angle?: number;
    duration?: number;
}

export default moveOptions;