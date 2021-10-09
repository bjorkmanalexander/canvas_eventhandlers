import Entity from "./Entity";

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

    render(context) {
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
        this.render(context);
    }
}

export default Unit;