function getCpPos(e, canvas) {
    if(!e) {
        return {
            x: 0,
            y: 0
        }
    }
    //对于是鼠标事件
    let rect = canvas.getBoundingClientRect()
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    }
}

export {
    getCpPos
}