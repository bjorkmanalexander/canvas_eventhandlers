class CanvasDisplay {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.config = {
            height: window.innerHeight,
            width: window.innerWidth
        }

        this.elements = [];
        this.events = {
            mousedown: this.mousedown.bind(this),
            mousemove: this.mousemove.bind(this),
            mouseup: this.mouseup.bind(this),
            mousewheel: this.mousewheel.bind(this)
        }

        this.canvas.height = this.config.height;
        this.canvas.width = this.config.width;
        this.canvas.addEventListener('mousedown', this.events.mousedown);

        this.id;
        this.offsetX;
        this.offsetY;
    }

    draw() {
        this.context.clearRect(0, 0, this.config.width, this.config.height);
        this.elements.forEach(element => element.update(this.context));
    }

    mousedown(evt) {
        const mX = evt.layerX - this.canvas.offsetLeft;
        const mY = evt.layerY - this.canvas.offsetTop;
        for (let i = 0; i < this.elements.length; ++i) {
            const { cX, cY } = this.elements[i].getCenter();
            let dx = mX - cX;
            let dy = mY - cY;
            if (Math.sqrt((dx * dx) + (dy * dy)) < this.elements[i].getRadius()) {
                this.id = i;
                this.offsetX = dx;
                this.offsetY = dy;
                this.elements[i].setSelected();
                window.addEventListener('mousemove', this.events.mousemove);
                window.addEventListener('mouseup', this.events.mouseup);
                window.addEventListener('wheel', this.events.mousewheel);
                this.draw();
                return
            }
        }
    }

    mousemove(evt) {
        const mX = evt.layerX - this.canvas.offsetLeft;
        const mY = evt.layerY - this.canvas.offsetTop;
        this.elements[this.id].setCenter({ nX: mX - this.offsetX, nY: mY - this.offsetY });
        this.draw();
    }

    mouseup(evt) {
        const mX = evt.layerX - this.canvas.offsetLeft;
        const mY = evt.layerY - this.canvas.offsetTop;
        window.removeEventListener('mousemove', this.events.mousemove);
        window.removeEventListener('mouseup', this.events.mouseup);
        window.removeEventListener('wheel', this.events.mousewheel);
        this.elements[this.id].setCenter({ nX: mX - this.offsetX, nY: mY - this.offsetY });
        this.elements[this.id].setSelected();
        this.draw();
        this.id = -1;
    }

    mousewheel(evt) {
        const cR = this.elements[this.id].getRotation();
        const degrees = (cR, r) => {
            if (evt.wheelDelta < 0 && cR + r < 270) {
                return cR + r
            } 
            else if (evt.wheelDelta > 0 && cR - r > -270) {
                return cR - r
            } else {
                return 0
            }
        }
        this.elements[this.id].setRotation(degrees(cR, 10));
        this.draw();
        console.log(this.elements[this.id])
    }

    resize() {}

    setElements(elements) {
        this.elements = elements;
    }

    setSelection(selection) {
        this.selection = { ...this.selection, selection }
    }
}

export default CanvasDisplay;