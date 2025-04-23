const canvas = document.getElementById('canvas')
function resize() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight * 0.70
}
resize()
window.addEventListener("resize", resize)
const ctx = canvas.getContext('2d')
const image = new Image()
image.src = 'media/img.webp'

const imgSize = 150
const speed = 20
let x = (canvas.width - imgSize) / 2
let y = (canvas.height - imgSize)
let keysPressed = {}
let facingLeft = false

document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true
})

document.addEventListener("keyup", (e) => {
    keysPressed[e.code] = false
})

function movePepe() {
    if (keysPressed["KeyA"]) {
        x = Math.max(0, x - speed)
        facingLeft = true
    }
    if (keysPressed["KeyD"]) {
        x = Math.min(canvas.width - imgSize, x + speed)
        facingLeft = false
    }
    if (keysPressed["KeyW"]) {
        y = Math.max(0, y - speed)
    }
    if (keysPressed["KeyS"]) {
        y = Math.min(canvas.height - imgSize, y + speed)
    }
}

function drawPepe() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.save()

    if (facingLeft) {
        ctx.translate(x + imgSize, y)
        ctx.scale(-1, 1)
    } else {
        ctx.translate(x, y)
    }
    ctx.drawImage(image, 0, 0, imgSize, imgSize)
    ctx.restore()
}

function loop() {
    movePepe()
    drawPepe()
    requestAnimationFrame(loop)
}

loop()
