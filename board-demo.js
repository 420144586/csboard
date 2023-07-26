import CSBoard from './main.js'
import('./Pens.js')
console.log(CSBoard)
let csBoard = new CSBoard(document.getElementById('cs_board'))


console.log(csBoard)
csBoard.initCSBoard()
export default csBoard