import { INIT_CHESS, INIT_FEN } from "../bitBoard.mjs";
import { B2F, F2B } from "../filter.mjs";
import { moveGenerate } from "../moveJudge.mjs";
import * as readline from "readline";
import { drawBoard } from "../drawBoard.mjs";

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

const resArr = [];
const boardInit = F2B(INIT_FEN)
const chess = INIT_CHESS


console.time('c')
moveGenerate.all(boardInit, chess, resArr)
console.timeEnd('c')

console.log(resArr.length)

let i = 0;
process.stdin.on('keypress', (str, key) => {

    if (key.ctrl === true && (key.name === 'c' || key.name === 'd')) {
        process.exit(0)
    }
    if (key.name === 'return') {
        const [pre, next] = resArr[i];
        const board = boardInit.slice(0)
        board[next] = board[pre]
        board[pre] = 0;
        drawBoard(B2F(board), pre, next);
        console.log('resArr[' + i + ']', resArr[i]);
        console.log(B2F(board))
        i++;
    }
})