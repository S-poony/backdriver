class Hero {
    constructor() {
        this.x = 200;
        this.y = 200;
        this.width = 100;
        this.height = 10;
        this.angle = 45;
        this.el = document.getElementById("hero");
        this.bullets = [];
        window.addEventListener("click", _ => {
            this.fire()
        })
    }
    draw() {
        let dx = this.height / 2;
        this.el.setAttribute("x", this.x - dx);
        this.el.setAttribute("y", this.y - dx);
        this.el.setAttribute("width", this.width);
        this.el.setAttribute("height", this.height);
        let angleDeg = this.angle * 360 / (2 * Math.PI);
        this.el.setAttribute("transform",
            `rotate(${angleDeg} ${this.x + dx} ${this.y + dx})`);
        for (const bullet of this.bullets) {
            bullet.draw();
        }
    }
    update(dt) {
        this.pointTo(mouse);
        for (const bullet of this.bullets) {
            bullet.update(dt);
        }
    }

    pointTo(o) {
        this.angle = angleBetween(this, o);
    }
    fire() {
        this.bullets.push(new Bullet(this));
    }
}

class Bullet {
    constructor(origin) {
        this.x = origin.x;
        this.y = origin.y;
        this.angle = origin.angle;
        this.radius = 10;
        this.speed = 0.1;
        this.el = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );
        svg.appendChild(this.el);
    }
    draw() {
        this.el.setAttribute("cx", this.x);
        this.el.setAttribute("cy", this.y);
        this.el.setAttribute("r", this.radius);
        this.el.setAttribute("height", this.radius);
    }
    update(dt) {
        let l = this.speed * dt;
        this.x += Math.cos(this.angle) * l;
        this.y += Math.sin(this.angle) * l;
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
let svg = null;
var mouse = new Mouse();

function update(currentTime) {
    const dt = currentTime - lastTime;
    lastTime = currentTime;
    hero.update(dt);
    hero.draw();
    requestAnimationFrame(update);
}

window.onload = function () {
    hero = new Hero();
    svg = document.getElementById("gameSvg");
    update(Date.now());
}