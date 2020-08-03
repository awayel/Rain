import { MouseActions, Renderer, Scene } from '../../rain';
import { touchTypes } from '../types/Types';
import { rageTouchDetermination, pixelTouchDetermination } from '../touch/touchDetermination';
import EventData from '../interfaces/EventData';

export function addClickEvent(type: MouseActions, renderer: Renderer, touchType: touchTypes = touchTypes.RANGE, scene: Scene) {
    renderer.domElement.addEventListener('click', e => {
        if (touchType == touchTypes.RANGE) {
            let result = rageTouchDetermination(e, renderer, scene);
            if (result.res) {
                let event = result.eventData as EventData;
                event.target.onClick(event);
            }
        } else if (touchType == touchTypes.PIXEL) {
            let result = pixelTouchDetermination(e, renderer, scene);
            if (result.res) {
                let event = result.eventData as EventData;
                event.target.onClick(event);
            }
        }
        else return;
    });
}