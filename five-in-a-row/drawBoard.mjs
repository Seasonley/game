import * as readline from "readline"
function drawBoard(board, cursor, noclean) {
    if (!noclean) {
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);// 清空
    }
    if (typeof board === 'string') {
        board = board.replace(/(\d{16})/g, "$1,").slice(0, -1).split(',').map(v => v.split('').map(v => v == 2 ? '-1' : v));
    }
    console.log((cursor ? "人" : "机") + "  0 1 2 3 4 5 6 7 8 9 A B C D E F")
    for (let i = 0; i < board.length; i++)
        console.log((i > 9 ? i : ' ' + i) + ' ' + board[i].map((v, j) => {
            if (cursor && cursor.x === j && cursor.y === i) {
                return '◎'
            }
            return ({ 1: '●', '-1': '○', 0: '＋' })[v]
        }).join(''))
}
export { drawBoard }