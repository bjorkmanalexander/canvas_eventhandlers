class Entity {
    constructor({ x = 0, y = 0 }, r = 0) {
        this.rotation = r;
        this.position = {
            x, y
        }
    }

    getPosition() {
        return this.position;
    }

    getRotation() {
        return this.rotation;
    }

    setPosition({ x, y }) {
        this.position = { ...this.position, x, y }
    }

    setRotation(r) {
        this.rotation = r;
    }
}

export default Entity;