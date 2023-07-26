class Eraser {
    constructor(csBoard) {
        this.csBoard = csBoard
        this.ctx = csBoard.ctx
        this.pos = {
            x: 0,
            y: 0
        }
        this.size = [40,40]
    }
    eraserDown (p) {
        this.csBoard.ctx.save()
        this.csBoard.ctx.beginPath()
        this.csBoard.ctx.restore()
    }
    clearing (p) {
        this.pos.x = p.x
        this.pos.y = p.y

        this.ctx.clearRect(p.x - this.size[0] / 2, p.y - this.size[1] / 2, this.size[0], this.size[1]);

    }

    renderShape (ctx) {
        ctx.beginPath()
        ctx.rect(this.pos.x - this.size[0] / 2, this.pos.y - this.size[1] / 2, this.size[0], this.size[1]);
        ctx.fillStyle = 'red'
        ctx.fill()
    }
}
export default Eraser