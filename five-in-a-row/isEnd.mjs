
function countNum(x, y, chessBoard, judgeEnd) {
    if (typeof chessBoard === 'string') {
        chessBoard = chessBoard.replace(/(\d{16})/g, "$1,").slice(0, -1).split(',').map(v => v.split('').map(v => v == 2 ? -1 : v));
    }
    let vect = [[-1, 0], [-1, 1], [0, 1], [1, 1]];
    let qi = chessBoard[y][x];
    for (let i = 0; i < 4; i++) {
        let a = 1, b = 1, a1 = false, b1 = false;
        while (chessBoard[y + vect[i][0] * a]?.[x + vect[i][1] * a] === qi)
            a++
        a1 = chessBoard[y + vect[i][0] * (a + 1)]?.[x + vect[i][1] * (a + 1)] === 0
        while (chessBoard[y - vect[i][0] * b]?.[x - vect[i][1] * b] === qi)
            b++
        b1 = chessBoard[y - vect[i][0] * (b + 1)]?.[x - vect[i][1] * (b + 1)] === 0
        vect[i][0] = a + b - 1;
        if (judgeEnd && vect[i][0] >= 5) {
            return true;
        }
        vect[i][1] = a1 + b1;
    }
    return judgeEnd ? false : vect;
}
export { countNum as isEnd, countNum }