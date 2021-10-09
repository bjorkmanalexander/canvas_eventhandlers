import CanvasDisplay from '../Classes/CanvasDisplay';
import Unit from '../Classes/Unit';

function init() {
    document.head.insertAdjacentHTML('beforeend', '<style>html, body { margin: 0; overflow: hidden; padding: 0; }</style>');
    const canvas = document.createElement('canvas');
    const frame = new CanvasDisplay(canvas);
    const units = [];
    document.body.appendChild(canvas);

    for (let i = 0; i < 2; ++i) {
        const options= { color: 'red' };
        const pos = { x: canvas.width / 2, y: canvas.height / 2 };
        const rotation = 0;
        const size = { height: 50, width: 50 };
        const unit = new Unit(pos, rotation, size, options);
        units.push(unit);
    }

    frame.setElements(units);
    frame.draw();
}

export default init;