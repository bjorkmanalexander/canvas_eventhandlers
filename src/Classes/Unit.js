import Entity from './BaseUnit';

class Unit extends Entity {
    constructor(position, rotation, { height, width }, { color }) {
        super(position, rotation);
        this.options = {
            color
        };
        this.selected = false;
        this.size = {
            height,
            width
        };
    }

    getBounds() {
        const { x, y } = this.getPosition();
        const { height, width } = this.getSize();
        return ([
            { x, y },
            { x: x + width, y },
            { x: x + width, y: y + height },
            { x, y: y + height }
        ])
    }

    getCenter() {
        const { x, y } = this.getPosition();
        const { height, width } = this.getSize();
        return { 
            cX: x + (width / 2), 
            cY: y + (height / 2)
        };
    }

    getOptions() {
        return this.options;
    }

    getRadius() {
        const { width } = this.getSize();
        return width / 2;
    }

    getSelected() {
        return this.selected;
    }

    getSize() {
        return this.size;
    }

    setCenter({ nX, nY }) {
        const { height, width } = this.getSize();
        this.setPosition({ x: nX - width, y: nY - height });
    }

    setSelected() {
        this.selected = !this.selected;
    }

    renderBoundingBox(context) {}

    renderCenter(context) {
        const { cX, cY } = this.getCenter();
        const selected = this.getSelected();
        context.beginPath();
        context.lineWidth = 1;
        if (selected) {
            context.strokeStyle = 'white';
            context.fillStyle = 'white';
        } else {
            context.strokeStyle = 'orange';
            context.fillStyle = 'orange';
        }
        context.fillRect(cX - 5, cY - 5, 10, 10);
        context.stroke();
    }

    renderDragZone(context) {
        const { cX, cY } = this.getCenter();
        const radius = this.getRadius();
        const selected = this.getSelected();
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = 'blue';
        context.arc(cX, cY, radius, 0, 2 * Math.PI, false);
        if (selected) {
            context.fillStyle = 'blue';
            context.fill();
        }
        context.stroke();
    }

    renderUnit(context) {
        const { color } = this.getOptions();
        const { x, y } = this.getPosition();
        const { height, width } = this.getSize();
        const rotation = this.getRotation();
        context.save();
        context.translate(x + width / 2, y + height / 2);
        context.rotate(rotation * Math.PI / 180);
        context.fillStyle = color;
        context.fillRect(width / 2 * (-1), height / 2 * (-1), width, height);
        context.restore();
    }

    update(context) {
        this.renderUnit(context);
        this.renderDragZone(context);
        this.renderCenter(context);
    }
}

export default Unit;