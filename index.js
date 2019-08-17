class Hero {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.width = 100;
        this.height = 10;
        this.angle = 45;
        this.el = document.getElementById("hero");
    }
    draw() {
        this.el.setAttribute("x", this.x);
        this.el.setAttribute("y", this.y);
        this.el.setAttribute("width", this.width);
        this.el.setAttribute("height", this.height);
        let dx = this.height / 2;
        let angleDeg = this.angle * 360 / (2 * Math.PI);
        this.el.setAttribute("transform",
            `rotate(${angleDeg} ${this.x + dx} ${this.y + dx})`);

    }
    pointTo(o) {
        this.angle = angleBetween(this, o);
    }
}

class Mouse {
    constructor() {
        this.x = 0;
        this.y = 0;
        window.addEventListener("mousemove", (evt) => {
            this.x = evt.clientX;
            this.y = evt.clientY;
        })
    }
}

function angleBetween(o1, o2) {
    let a = o2.y - o1.y;
    let b = o2.x - o1.x;
    return Math.atan2(a, b);
}

let lastTime = Date.now();
var hero = null;
var mouse = new Mouse();

function update(currentTime) {
    const dt = currentTime - lastTime;
    hero.pointTo(mouse);
    hero.draw();
    requestAnimationFrame(update);
}

window.onload = function () {
    hero = new Hero();
    update(Date.now());
}