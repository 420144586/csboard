console.log('CSBoard class init')
import Pen from './Pens.js'
import {getCpPos} from './utils.js'
import Eraser from './Eraser.js'
class CSBoard {
    constructor(canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.ctx.imageSmoothingEnabled = true;
        this.pen = new Pen(this)
        this.eraser = new Eraser(this)
        this.curPath = []
        this.curTool = 'pen'
        //鼠标处理事件
        this.cpSweeping = false
        this.samplingRate = 15; // 采样率，每隔5个点添加一个新点
        this.getP = (e)=> getCpPos(e, this.canvas)



    }
    initBound () {
        this.ctx.beginPath()
        this.ctx.strokeStyle = 'red'
        this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.closePath()
    }
    initRender () {
        this.renderCanvas = document.createElement('canvas')
        this.renderCtx = this.renderCanvas.getContext('2d')
        this.renderCanvas.width = this.canvas.width
        this.renderCanvas.height = this.canvas.height
        this.renderCanvas.style = 'position: absolute; top: 0; right: 0; z-index: 1000; pointer-events: none;border: 1px solid blue'
        document.body.appendChild(this.renderCanvas)
        //使用requestAnimationFrame来渲染，将渲染的内容绘制到renderCanvas上


    }

    initCSBoard () {
        this.initBound()
        this.initRender()
        this.createEventListener('mouse')
        this.render();

    }

    switchTool (tool) {
        switch (tool) {
            case 'pen': {
                this.curTool = 'pen'
                break
            }
            case 'eraser': {
                this.curTool = 'eraser'
                break
            }
        }
    }

    createEventListener (type, listener) {
        switch (type) {
            case 'mouse': {
                this.canvas.addEventListener('mousedown', this.handleCpDown.bind(this));
                this.canvas.addEventListener('mousemove', this.handleCpMove.bind(this));
                this.canvas.addEventListener('mouseup', this.handleCpUp.bind(this));
            }
        }

    }


    handleCpDown (e) {
        this.cpSweeping = true
        console.log('cp down', this.curTool)
        switch (this.curTool) {
            case 'pen': {
                this.pen.penDown(this.getP(e))
            }
            break
            case 'eraser': {
                this.eraser.eraserDown(this.getP(e))
            }
        }
    }
    handleCpMove (e) {
        if (!this.cpSweeping) return
        switch (this.curTool) {
            case 'pen': {
                this.pen.drawLine(e, this.ctx, this.getP(e))
            }break
            case 'eraser': {
                this.eraser.clearing(this.getP(e))
            }
        }


    }
    handleCpUp (e) {
        this.cpSweeping = false
    }


    render() {
        let renderCtx = this.renderCtx
        let width = this.canvas.width
        let height = this.canvas.height

        renderCtx.clearRect(0, 0, width, height)
        renderCtx.drawImage(this.canvas, 0, 0, width, height)


        this.eraser.renderShape(renderCtx)

        requestAnimationFrame(this.render.bind(this))

    }

    getCpPos(e) {
        if(!e) {
            return {
                x: 0,
                y: 0
            }
        }
        //对于是鼠标事件
        let rect = this.canvas.getBoundingClientRect()
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        }
    }
}

export default CSBoard