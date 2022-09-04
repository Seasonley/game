function isEnd(x, y, chessBoard) {
    if (typeof chessBoard === 'string') {
        chessBoard = chessBoard.replace(/(\d{16})/g, "$1,").slice(0, -1).split(',').map(v => v.split('').map(v => v == 2 ? -1 : v));
    }
    let vect = [[-1, 0], [-1, 1], [0, 1], [1, 1]];
    let qi = chessBoard[y][x];
    for (let i = 0; i < 4; i++) {
        let a = 1; let b = 1;
        while (chessBoard[y + vect[i][0] * a] && chessBoard[y + vect[i][0] * a][x + vect[i][1] * a] === qi)
            a++
        while (chessBoard[y - vect[i][0] * b] && chessBoard[y - vect[i][0] * b][x - vect[i][1] * b] === qi)
            b++
        if (a + b > 5)
            return true
    }
    return false;
}
export { isEnd }