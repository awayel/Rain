import { StandarObjectOptions } from './StandarObjectOptions';
export default interface CardOptions extends StandarObjectOptions {
    borderRadius?: number,
    text?: string,
    borderColor?: string;
    border?: boolean;
}