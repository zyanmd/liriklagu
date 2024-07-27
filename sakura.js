const canvas = document.getElementById('sakura');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numPetals = 50;
const petals = [];

const sakuraImage = new Image();
sakuraImage.src = 'assets/sakura.png'; // Path ke gambar sakura

function Petal(x, y, size, speed, drift) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.drift = drift;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.angle = Math.random() * 360; // Menambahkan sudut untuk rotasi
    this.spin = (Math.random() - 0.5) * 0.2; // Kecepatan rotasi
}

Petal.prototype.update = function() {
    this.y += this.speed;
    this.x += Math.sin(this.y / 50) * this.drift;
    this.angle += this.spin; // Memutarkan sakura

    if (this.y >= canvas.height) {
        this.reset();
    }
};

Petal.prototype.reset = function() {
    this.x = Math.random() * canvas.width;
    this.y = 0;
    this.size = Math.random() * 20 + 10; // Ukuran yang lebih besar agar lebih terlihat
    this.speed = Math.random() * 1 + 0.5;
    this.drift = Math.random() * 1 - 0.5;
    this.opacity = Math.random() * 0.5 + 0.5;
    this.angle = Math.random() * 360;
    this.spin = (Math.random() - 0.5) * 0.2;
};

Petal.prototype.render = function() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate((Math.PI / 180) * this.angle);
    ctx.drawImage(sakuraImage, -this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
};

function createPetals() {
    for (let i = 0; i < numPetals; i++) {
        petals.push(new Petal(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 20 + 10, Math.random() * 1 + 0.5, Math.random() * 1 - 0.5));
    }
}

function drawPetals() {
    for (let i = 0; i < petals.length; i++) {
        petals[i].update();
        petals[i].render();
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPetals();
    requestAnimationFrame(animate);
}

createPetals();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
