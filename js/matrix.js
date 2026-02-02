
// --- 6. Matrix Rain Animation ---
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = '01'; // Binary style for "Serious Hacker"
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const matrixSyms = '£$§|@#&<>[]{}';
const alphabet = katakana + nums + matrixSyms;

const fontSize = 16;
const columns = canvas.width / fontSize;

const rainDrops = [];

for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
}

const draw = () => {
    // IMPORTANT: Reset shadow before clearing the frame to keep background black
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = '900 ' + fontSize + 'px monospace';
    ctx.shadowBlur = 20; // High intensity glow only for the letters

    for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

        if (Math.random() > 0.94) { // More frequent sparkles
            ctx.fillStyle = '#ffffff';
            ctx.shadowColor = '#ffffff';
        } else {
            ctx.fillStyle = '#ff003c';
            ctx.shadowColor = '#ff003c';
        }

        // Layering the text to make it extremely bold and bright
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            rainDrops[i] = 0;
        }
        rainDrops[i]++;
    }
};

let interval = setInterval(draw, 30);

// Resize handling
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Reset columns
    const cols = canvas.width / fontSize;
    rainDrops.length = 0;
    for (let x = 0; x < cols; x++) {
        rainDrops[x] = 1;
    }
});
