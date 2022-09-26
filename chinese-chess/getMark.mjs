import { B_C, FLEX_VALUE, PIECE_VALUE } from "./bitBoard.mjs";
import { moveGenerate } from "./moveJudge.mjs";

const chessLen = 32;
const chessHalfLen = 16;
const SQUARE_FLIP = 254;


function getMark(chess) {
    /*
    固定子力值
    */
    let ans = position(chess)
    /*
    棋子灵活度
    */
    // ans += flexible(chess)
    /*
    威胁与保护
    牵制
    棋子配合作战
    将帅安全
    */
}

function position(chess) {// 棋子位置
    let ci = 1;
    let ans = 0;
    while (ci < chessHalfLen) {
        const p = chess[ci];
        if (p)
            ans += PIECE_VALUE[B_C[ci]][SQUARE_FLIP - p];
        ci++
    }
    let cj = chessHalfLen;
    while (cj < chessLen) {
        const p = chess[cj];
        if (p)
            ans -= PIECE_VALUE[-B_C[cj]][p];
        cj++
    }
    return ans;
}

function flexible(board, chess) {//棋子灵活度
    let ans = 0;
    const flexC = moveGenerate.all(board, chess, []);
    let i = 1, j = -1;
    for (; i < 8; i++, j--)
        ans += (flexC[i] - flexC[j]) * FLEX_VALUE[i]
    return ans
}

function threatProtection() { //威胁与保护

}

export { getMark }