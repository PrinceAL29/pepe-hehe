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
let isBackflipping = false
let flipAngle = 0

document.addEventListener("keydown", (e) => {
    keysPressed[e.code] = true
    if (e.code === "Space" && !isBackflipping) {
        isBackflipping = true
        flipAngle = 0
    }
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

    const centerX = x + imgSize / 2
    const centerY = y + imgSize / 2

    ctx.translate(centerX, centerY)

    if (isBackflipping) {
        const rotationSpeed = facingLeft ? 0.36 : -0.36
        flipAngle += rotationSpeed

        if ((facingLeft ? flipAngle : -flipAngle) >= 2 * Math.PI) {
            isBackflipping = false
            flipAngle = 0
        }

        ctx.rotate(flipAngle)
    }

    if (facingLeft && !isBackflipping) {
        ctx.scale(-1, 1)
    }

    ctx.drawImage(image, -imgSize / 2, -imgSize / 2, imgSize, imgSize)
    ctx.restore()
}

function loop() {
    movePepe()
    drawPepe()
    requestAnimationFrame(loop)
}

loop()
