import { StandardObject, StandarObjectOptions } from './StandardObject';
import EventData from './interfaces/EventData';


interface CardOptions extends StandarObjectOptions {
    borderRadius?: number,
    text?: string,
    borderColor?: string;
}

export class Card extends StandardObject {
    borderRadius: number;
    text: string;
    active: boolean;
    borderColor: string = "#000";
    constructor(settings: CardOptions) {
        super(settings);
        this.borderRadius = settings.borderRadius ? settings.borderRadius : 0;
        this.text = settings.text ? settings.text : "";
        this.active = false;
        if (settings.borderColor) {
            this.borderColor = settings.borderColor
        }
    }
    render(ctx: CanvasRenderingContext2D) {
        let x = this.position.x;
        let y = this.position.y;
        let borderRadius = this.borderRadius;
        let h = this.height;
        let w = this.width;
        let position = [
            [borderRadius + x, y],
            [w + x - borderRadius, y],
            [w + x, y + borderRadius],
            [w + x, y + h - borderRadius],
            [w + x - borderRadius, y + h],
            [x + borderRadius, y + h],
            [x, y + h - borderRadius],
            [x, y + borderRadius]
        ];
        let point = [
            [x + w, y],
            [x + w, y + h],
            [x, y + h],
            [x, y]
        ]
        let textPosition = [x + borderRadius, y + 3 * borderRadius];
        if (this.material) {
            ctx.drawImage(this.material.image, this.material.start, this.material.end, this.material.width, this.material.height, this.position.x, this.position.y, this.width, this.height)
        } else {
            ctx.fillStyle = "#fff";
            // console.log(position,point,textPosition);
            ctx.beginPath();
            ctx.moveTo(position[0][0], position[0][1]);
            ctx.lineTo(position[1][0], position[1][1]);
            ctx.quadraticCurveTo(point[0][0], point[0][1], position[2][0], position[2][1]);
            ctx.lineTo(position[3][0], position[3][1]);
            ctx.quadraticCurveTo(point[1][0], point[1][1], position[4][0], position[4][1]);
            ctx.lineTo(position[5][0], position[5][1]);
            ctx.quadraticCurveTo(point[2][0], point[2][1], position[6][0], position[6][1]);
            ctx.lineTo(position[7][0], position[7][1]);
            ctx.quadraticCurveTo(point[3][0], point[3][1], position[0][0], position[0][1]);
            ctx.fill();
            ctx.closePath();
        }
        ctx.strokeStyle = this.borderColor;
        ctx.beginPath();
        ctx.moveTo(position[0][0], position[0][1]);
        ctx.lineTo(position[1][0], position[1][1]);
        ctx.quadraticCurveTo(point[0][0], point[0][1], position[2][0], position[2][1]);
        ctx.lineTo(position[3][0], position[3][1]);
        ctx.quadraticCurveTo(point[1][0], point[1][1], position[4][0], position[4][1]);
        ctx.lineTo(position[5][0], position[5][1]);
        ctx.quadraticCurveTo(point[2][0], point[2][1], position[6][0], position[6][1]);
        ctx.lineTo(position[7][0], position[7][1]);
        ctx.quadraticCurveTo(point[3][0], point[3][1], position[0][0], position[0][1]);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = "#000"
        ctx.font = "32px bold";
        ctx.fillText(this.text, textPosition[0], textPosition[1]);
    }
    onClick(event: EventData) { }
} 