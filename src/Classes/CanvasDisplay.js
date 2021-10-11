class CanvasDisplay {
    constructor(canvas) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d');
        this.config = {
            height: window.innerHeight,
            width: window.innerWidth
        };

        this.elements = [];
        this.events = {
            mousedown: this.mousedown.bind(this),
            mousemove: this.mousemove.bind(this),
            mouseup: this.mouseup.bind(this),
            mousewheel: this.mousewheel.bind(this),
            resize: this.resize.bind(this)
        };

        this.canvas.height = this.config.height;
        this.canvas.width = this.config.width;
        this.canvas.addEventListener('mousedown', this.events.mousedown);
        window.addEventListener('resize', this.events.resize, false);
        this.idx;
        this.offsetX;
        this.offsetY;
    }

    draw() {
        this.context.save();
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.elements.length; ++i) {
            this.elements[i].update(this.context);
        }
        this.context.restore();
    }

    mousedown(evt) {
        const mX = evt.layerX - this.canvas.offsetLeft;
        const mY = evt.layerY - this.canvas.offsetTop;
        for (let i = 0; i < this.elements.length; ++i) {
            const { cX, cY } = this.elements[i].getCenter();
            let dx = mX - cX;
            let dy = mY - cY;
            if (Math.sqrt((dx * dx) + (dy * dy)) < this.elements[i].getRadius()) {
                this.idx = i;
                this.offsetX = dx;
                this.offsetY = dy;
                this.elements[i].setSelected();
                window.addEventListener('mousemove', this.events.mousemove);
                window.addEventListener('mouseup', this.events.mouseup);
                window.addEventListener('wheel', this.events.mousewheel);
                this.draw();
                return;
            }
        }
    }

    mousemove(evt) {
        const mX = evt.layerX - this.canvas.offsetLeft;
        const mY = evt.layerY - this.canvas.offsetTop;
        this.elements[this.idx].setCenter({ nX: mX - this.offsetX, nY: mY - this.offsetY });
        this.draw();
    }

    mouseup(evt) {
        const mX = evt.layerX - this.canvas.offsetLeft;
        const mY = evt.layerY - this.canvas.offsetTop;
        window.removeEventListener('mousemove', this.events.mousemove);
        window.removeEventListener('mouseup', this.events.mouseup);
        window.removeEventListener('wheel', this.events.mousewheel);
        this.elements[this.idx].setCenter({ nX: mX - this.offsetX, nY: mY - this.offsetY });
        this.elements[this.idx].setSelected();
        this.draw();
        this.id = -1;
    }

    mousewheel(evt) {
        const cR = this.elements[this.idx].getRotation();
        const degrees = (cR, r) => {
            if (evt.wheelDelta < 0 && cR + r < 270) {
                return cR + r
            } 
            else if (evt.wheelDelta > 0 && cR - r > -270) {
                return cR - r
            } else {
                return 0
            }
        };
        this.elements[this.idx].setRotation(degrees(cR, 10));
        this.draw();
    }

    resize() {
        const { innerHeight, innerWidth } = window;
        this.canvas.height = innerHeight;
        this.canvas.width = innerWidth;
        this.draw();
    }

    setElements(elements) {
        this.elements = elements;
    }

    setSelection(selection) {
        this.selection = { ...this.selection, selection };
    }

}

export default CanvasDisplay;