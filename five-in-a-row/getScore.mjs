import { countNum } from "./isEnd.mjs";

function getScore(chessBoard) {
    if (typeof chessBoard === 'string') {
        chessBoard = chessBoard.replace(/(\d{16})/g, "$1,").slice(0, -1).split(',').map(v => v.split('').map(v => v == 2 ? -1 : v));
    }
    const MAXN = 1 << 28;
    let res = 0; const size = chessBoard.length - 1;
    // scoreLoop:
    for (let i = 1; i <= size; ++i)
        for (let j = 1; j <= size; ++j)
            if (chessBoard[i][j] != 0)
                for (const v of countNum(j, i, chessBoard)) {
                    if (v[0] >= 5) {
                        res = MAXN * chessBoard[i][j];
                        // break scoreLoop;
                    }
                    res += chessBoard[i][j] * toScore(v[0], v[1]);
                }
    return res;
}

function toScore(cnt, flag) {
    return 1 << (cnt + flag)
}


export { getScore }