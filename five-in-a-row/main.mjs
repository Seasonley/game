import { isEnd } from "./isEnd.mjs";
// import { minimax } from "./minimax.mjs";
// import { abminimax } from "./abminimax.mjs";
import { abnegamax } from "./abnegamax.mjs";
// import { abminnegamax } from "./abminnegamax.mjs";
// import { negamax } from "./negamax.mjs";
import * as readline from "readline";
import { drawBoard } from "./drawBoard.mjs";
import { Nod } from "./Nod.mjs";
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
const MAXN = 1 << 28;
const MINN = -MAXN;

const chessBoard = '0'.repeat(16 * 16).split('')
const cursor = { x: 7, y: 7 }
drawBoard(chessBoard.join(''), cursor)
process.stdin.on('keypress', (str, key) => {
    if (key.name === 'return') {
        const idx = (cursor.y << 4) + cursor.x;
        chessBoard[idx] = 2
        drawBoard(chessBoard.join(''))
        if (isEnd(cursor.x, cursor.y, chessBoard.join(''))) {
            process.exit(0)
        }
        let x = abnegamax(new Nod({
            board: chessBoard.join(''),
            cur: 2, nxt: 1, deep: 0,
            pos: [idx]
        }), MINN, MAXN);
        if (!x.pos) {
            process.exit(0)
        }
        const p = x.pos[x.pos.length - 2];
        chessBoard[p] = 1;
        drawBoard(chessBoard.join(''), cursor)

        if (isEnd(p % 16, (p - p % 16) / 16, chessBoard.join(''))) {
            process.exit(0)
        }
    } else {
        switch (key.name) {
            case 'up': cursor.y = cursor.y - 1; break;
            case 'down': cursor.y = cursor.y + 1; break;
            case 'left': cursor.x = cursor.x - 1; break;
            case 'right': cursor.x = cursor.x + 1; break;
        }
        cursor.x = Math.min(15, Math.max(0, cursor.x))
        cursor.y = Math.min(15, Math.max(0, cursor.y))
        drawBoard(chessBoard.join(''), cursor)
    }
    if (key.ctrl === true && (key.name === 'c' || key.name === 'd')) {
        process.exit(0)
    }
})