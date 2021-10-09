class Entity {
    constructor({ x = 0, y = 0 }, rotation = 0) {
        this.rotation = rotation;
        this.position = {
            x, y
        };
    }

    getPosition() {
        return this.position;
    }

    getRotation() {
        return this.rotation;
    }

    setPosition({ x, y }) {
        this.position = { ...this.position, x, y };
    }

    setRotation(rotation) {
        this.rotation = rotation;
    }
}

export default Entity;