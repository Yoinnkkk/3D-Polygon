function Create3DPolygon(n=36, planes=12) {
    const canvas = document.getElementById('canvas')
    const sctx = canvas.getContext('2d', { alpha: true })

    const radius = 400
    const width = radius * 2.5
    const height = width
    const hWidth = width / 2
    const hHeight = height / 2
    const numOfParticles = 200
    const staticParticles = []
    const bgColor = '15, 17, 26'
    const defaultPartSpeed = 0.0025

    let bgOpacity = 1

    canvas.width = width
    canvas.height = height

    class Particle {
        constructor(isRandomRadius) {
            this.radius = isRandomRadius ? Math.random() * radius : radius
            this.time = 0
            this.speed = isRandomRadius ? Math.random() / 200 : defaultPartSpeed
            this.hue = 110 + 100 * Math.random()
            this.u = Math.random()
            this.v = Math.random()
            this.updatePosition()
        }

        updatePosition() {
            this.time -= this.speed

            this.theta = 2 * Math.PI * this.u + this.time
            this.phi  = Math.acos(2 * this.v - 1) - Math.PI * 0.5

            this.x = this.radius * Math.sin(this.theta) * Math.cos(this.phi)
            this.y = this.radius * Math.sin(this.phi)
            this.z = this.radius * Math.cos(this.phi) * Math.cos(this.theta)

            this.size = (this.radius * 1.4 - this.z) / 25
        }

        getColor(ctx) {
            const x = this.x + hWidth
            const y = this.y + hHeight
        
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.size)
        
            gradient.addColorStop(0, `hsla(${ this.hue }, 100%, 60%, 1)`)
            gradient.addColorStop(.3, `hsla(${ this.hue }, 100%, 60%, 0)`)
            gradient.addColorStop(1, `hsla(${ this.hue }, 100%, 60%, 0)`)
        
            return gradient
        }

        render(ctx) {
            const hSize = this.size / 2

            ctx.fillStyle = this.getColor(ctx)

            ctx.fillRect(
            hWidth + this.x - hSize,
            hHeight + this.y - hSize,
            this.size,
            this.size
            )
        }

        get data() {
            return {
            x: this.x,
            y: this.y,
            z: this.z,
            size: this.size,
            color: `hsla(${ this.hue }, 100%, 60%, 1)`
            }
        }
    }

    for (let i = 0; i < numOfParticles; i++) {
        staticParticles.push(new Particle(false))
    }

    void function loop() {
        sctx.fillStyle = `rgba(${ bgColor }, ${ bgOpacity })`
        sctx.fillRect(0, 0, width, height)

    for (let i = 0; i < numOfParticles; i++) {
        staticParticles[i].updatePosition()
        staticParticles[i].render(sctx)
    }

    window.requestAnimationFrame(loop)
    }()
}

window.addEventListener('load', function () {
    Create3DPolygon();
})