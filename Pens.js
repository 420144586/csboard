class Pen {
    constructor(csBoard) {
        this.csBoard = csBoard
        this.ctx = csBoard.ctx;
        this.curPath = []
        this.samplingRate = 5; // 采样率，每隔5个点添加一个新点
        this.strokeStyle = {
            color: 'black',
            width: 2,
            lineCaps: 'round',

        }
    }
    penDown(p) {
        this.curPath = []
        this.curPath.push(p)
    }
    setStrokeStyle (ctx, strokeStyle) {
        ctx.strokeStyle = strokeStyle.color
        ctx.lineWidth = strokeStyle.width
        ctx.lineCap = strokeStyle.lineCaps
    }
    drawLine (e, ctx, cpP) {
        let curP = cpP
        const lastP = this.curPath[this.curPath.length - 1];
        const dx = curP.x - lastP.x;
        const dy = curP.y - lastP.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance >= this.samplingRate) {
            this.curPath.push(cpP)
        }

        if (this.curPath.length >= 3) {
            ctx.beginPath();
            ctx.moveTo(this.curPath[0].x, this.curPath[0].y);

            for (let i = 1; i < this.curPath.length - 2; i++) {
                const cpx = (this.curPath[i].x + this.curPath[i + 1].x) / 2;
                const cpy = (this.curPath[i].y + this.curPath[i + 1].y) / 2;
                ctx.quadraticCurveTo(this.curPath[i].x, this.curPath[i].y, cpx, cpy);
            }

            // 使用最后两个点绘制最后一段曲线
            ctx.quadraticCurveTo(
                this.curPath[this.curPath.length - 2].x,
                this.curPath[this.curPath.length - 2].y,
                this.curPath[this.curPath.length - 1].x,
                this.curPath[this.curPath.length - 1].y
            );

            this.setStrokeStyle(ctx, this.strokeStyle)
            ctx.stroke()
        }


    }
}
function interpolateCatmullRom(points, context) {
    const alpha = 0.5;

    for (let i = 1; i < points.length - 2; i++) {
        const p0 = i === 1 ? points[0] : points[i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = i === points.length - 3 ? points[points.length - 1] : points[i + 2];

        for (let t = 0; t < 1; t += 0.05) {
            const x = 0.5 * (
                (2 * p1.x) +
                (-p0.x + p2.x) * t +
                (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t * t +
                (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t * t * t
            );

            const y = 0.5 * (
                (2 * p1.y) +
                (-p0.y + p2.y) * t +
                (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t * t +
                (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t * t * t
            );

            context.lineTo(x, y);
        }
    }
}
export default Pen