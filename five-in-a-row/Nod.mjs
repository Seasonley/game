import { getMark } from "./getMark.mjs";

class Nod {
    constructor({ board, cur, nxt, deep, pos }) {
        this.board = board;
        this.cur = cur;
        this.nxt = nxt;
        this.deep = deep;
        this.pos = pos;
    }
    get mark() {
        if (!this._mark) {
            this._mark = getMark(this.board);
        }
        return this._mark
    }
    set mark(val) {
        this._mark = val;
    }
    children() {
        const arr = [];
        const reg = /0/g;
        while (reg.exec(this.board) != null) {
            arr.push(new Nod({
                board: this.board.slice(0, reg.lastIndex - 1) + this.nxt + this.board.slice(reg.lastIndex),
                cur: this.nxt,
                nxt: this.cur,
                deep: this.deep + 1,
                pos: [...this.pos, reg.lastIndex - 1]
            }));
        }
        return arr;
    }
    *childrenit() {
        const reg = /0/g;
        while (reg.exec(this.board) != null) {
            const p = reg.lastIndex - 1;
            if ([p - 1, p + 1, p - 16, p - 17, p - 15, p + 16, p + 15, p + 17].some(v => this.board[v]))
                yield (new Nod({
                    board: this.board.slice(0, p) + this.nxt + this.board.slice(reg.lastIndex),
                    cur: this.nxt,
                    nxt: this.cur,
                    deep: this.deep + 1,
                    pos: [...this.pos, p]
                }));
        }
    }
}

export { Nod }