import { getScore } from "./getScore.mjs";
import { countNum } from "./isEnd.mjs";

class Nod {
    constructor(board, nxt, pos) {
        this.board = board;
        this.nxt = nxt;
        this.pos = pos;
        let p = pos[pos.length - 1];
        this.v = { x: p % 16, y: (p - p % 16) / 16 }
        this.mark = countNum(this.v.x, this.v.y, this.board);
        this.willEnd = this.mark.some(v => v[0] + v[1] >= 5);
        this.isEnd = this.mark.some(v => v[0] >= 5);
    }
    get score() {
        if (this._score === undefined) {
            this._score = getScore(this.board);
        }
        return this._score;
    }
    set score(val) {
        this._score = val;
    }
    children() {
        const arr = [];
        const reg = /[^0]/g;
        const ss = new Set();
        const theNxt = this.nxt === 1 ? 2 : 1;
        while (reg.exec(this.board) !== null) {
            const p = reg.lastIndex - 1;
            [p - 17, p - 15, p + 15, p + 17, p - 1, p + 1, p - 16, p + 16].forEach((v) => {
                if (this.board[v] == 0 && !ss.has(v)) {
                    ss.add(v)
                    arr.push(new Nod(
                        this.board.slice(0, v) + this.nxt + this.board.slice(v + 1),
                        theNxt,
                        this.pos.concat(v)
                    ));
                }
            })
        }
        if (this.willEnd) {
            arr = arr.filter(it => {
                if (it.v.x === this.v.x || it.v.y === this.v.y) {
                    return true;
                }
                if (Math.abs(it.v.x - this.v.x) === Math.abs(it.v.y - this.v.y)) {
                    return true;
                }
                return false;
            })
        } else {
            arr.sort((a, b) => {
                return ((b.mark[0] - a.mark[0]) << 2) + b.mark[1] - a.mark[1]
            });
        }

        return this.nxt === 2 ? arr.reverse() : arr;
    }
}

export { Nod }