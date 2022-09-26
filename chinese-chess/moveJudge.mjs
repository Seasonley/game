import { B_PALACE, B_F2C, B_C } from "./bitBoard.mjs";

const LINE_NUM = 16;
const nArrLen = 4;
const kDelta = [LINE_NUM, -1, 1, -LINE_NUM,];
const nDelta = [
    LINE_NUM * 2 - 1, LINE_NUM * 2 + 1,
    -2 - LINE_NUM, -2 + LINE_NUM,
    2 - LINE_NUM, 2 + LINE_NUM,
    -LINE_NUM * 2 - 1, -LINE_NUM * 2 + 1,
];
const aDelta = [LINE_NUM - 1, LINE_NUM + 1, -LINE_NUM - 1, -LINE_NUM + 1];
const boardLen = 256;
const boardHalfLen = 128;
const chessLen = 32;
const chessHalfLen = 16;
//走法生成 + 估值
const moveGenerate = {

    all(board, chess, res, delta) {
        const max = delta === 1 ? chessHalfLen : chessLen;
        let ci = delta === 1 ? 0 : chessHalfLen;
        while (ci < max) {
            const p = chess[ci];
            if (!p) break;
            const q = delta * B_C[ci];
            this[q](p, board, delta, res);
            ci++
        }
        //被将则撤回
    },
    [B_F2C.r](idx, board, q, res) {//车
        for (let i = 0; i < nArrLen; i++) {
            for (let t = idx + kDelta[i]; q * board[t] <= 0; t += kDelta[i]) {//非己&边界内
                res.push([idx, t])
                if ((q ^ board[t]) < 0) break// 遇到吃对方棋子
            }
        }
    },
    [B_F2C.n](idx, board, q, res) {//马
        for (let i = 0; i < nArrLen; i++) {
            if (board[idx + kDelta[i]] === 0) {
                const a = idx + nDelta[i * 2];
                const b = idx + nDelta[i * 2 + 1];
                q * board[a] >= 0 && res.push([idx, a]);
                q * board[b] >= 0 && res.push([idx, b]);
            }
        }
    },
    [B_F2C.c](idx, board, q, res) {//炮
        for (let i = 0; i < nArrLen; i++) {
            let c = 0;
            let t = idx + kDelta[i];
            while (!isNaN(board[t]) && c < 2) {
                t += kDelta[i];
                board[t] === 0 && c === 0 && res.push([idx, t]);
                board[t] && c++;
            }

            q * board[t] < 0 && res.push([idx, t])
        }
    },
    [B_F2C.b](idx, board, q, res) {//象
        for (let i = 0; i < nArrLen; i++) {
            if (board[idx + aDelta[i]] === 0) {
                let t = idx + aDelta[i] * 2;
                q * (boardHalfLen - t) > 0 && q * board[t] <= 0 && res.push([idx, t])
            }
        }
    },
    [B_F2C.a](idx, board, q, res) {//士
        for (let i = 0, t = 0; i < nArrLen; i++) {
            t = idx + aDelta[i];
            if (q * board[t] >= 0 && B_PALACE[t])
                res.push([idx, t])
        }
    },
    [B_F2C.k](idx, board, q, res) {//将
        for (let i = 0, t = 0; i < nArrLen; i++) {
            t = idx + kDelta[i];
            if (q * board[t] <= 0 && B_PALACE[t])
                res.push([idx, t])
        }
    },
    [B_F2C.p](idx, board, q, res) {//兵
        let t = idx + q * LINE_NUM
        q * board[t] >= 0 && res.push([idx, t])
        if (q > 0 ? (idx < 96 || idx > 128) : (idx < 128 || idx > 160)) {
            q * board[--t] >= 0 && res.push([idx, t]), t += 2
            q * board[t] >= 0 && res.push([idx, t])
        }
    },
};
export { moveGenerate }