import { getMark } from "./getMark.mjs";

class Nod {
    constructor(board, q, steps) {
        this.board = board;
        this.q = q;
        this.steps = steps;
        this.mark = getMark(this.board);
    }
    children() {
        const arr = [];

        return arr;
    }
}

export { Nod }