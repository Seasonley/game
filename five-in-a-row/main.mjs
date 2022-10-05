import { isEnd } from "./isEnd.mjs";
import { abnegamax } from "./abnegamax.mjs";
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
        if (isEnd(cursor.x, cursor.y, chessBoard.join(''), true)) {
            process.exit(0)
        }
        let x = abnegamax(new Nod(
            chessBoard.join(''),
            1,
            [idx]
        ), MINN, MAXN, 0);
        if (!x.pos) {
            process.exit(0)
        }
        const p = x.pos[1];
        chessBoard[p] = 1;
        cursor.x = p % 16;
        cursor.y = (p - cursor.x) / 16;
        drawBoard(chessBoard.join(''), cursor)

        if (isEnd(p % 16, (p - p % 16) / 16, chessBoard.join(''), true)) {
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