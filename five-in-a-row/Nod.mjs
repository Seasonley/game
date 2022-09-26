import { getMark } from "./getMark.mjs";

class Nod {
    constructor(board, nxt, pos) {
        this.board = board;
        this.nxt = nxt;
        this.pos = pos;
        this.mark = getMark(this.board);
    }
    children() {
        const arr = [];
        const reg = /[^0]/g;
        const ss = new Set()
        while (reg.exec(this.board) != null) {
            const p = reg.lastIndex - 1;
            [p - 1, p + 1, p - 16, p - 17, p - 15, p + 16, p + 15, p + 17].forEach((v) => {
                if (this.board[v] == 0 && !ss.has(v)) {
                    ss.add(v)
                    arr.push(new Nod(
                        this.board.slice(0, v) + this.nxt + this.board.slice(v + 1),
                        this.nxt === 1 ? 2 : 1,
                        this.pos.concat(v)
                    ));
                }
            })
        }
        return arr;
    }
}

export { Nod }