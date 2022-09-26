import * as readline from "readline"
import chalk from 'chalk';
const themeBg = chalk.hex('#605545').bgHex('#ddbc76');
const themeBlack = chalk.hex('#29172b').bgHex('#ddbc76');
const themeWhite = chalk.hex('#af3e32').bgHex('#ddbc76');
const themeBgCur = chalk.hex('#605545').bgHex('#c59a45');
const themeBlackNxt = chalk.hex('#29172b').bgHex('#c59a45');
const themeWhiteNxt = chalk.hex('#af3e32').bgHex('#c59a45');
const themeBlackCur = chalk.hex('#29172b').bgHex('#ffffff');
const themeWhiteCur = chalk.hex('#af3e32').bgHex('#ffffff');
const book = 'rncbkapRNCBKAP 車馬砲象帥仕卒车马炮相将士兵';
function drawBoard(board, pre, next, cursor, selected, noclean) {
    const pan = (`╔═╤═╤═╤═╤═╤═╤═╤═╗ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┴─┴─┴─┴─┴─┴─┴─╢ 
╟─┬─┬─┬─┬─┬─┬─┬─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╚═╧═╧═╧═╧═╧═╧═╧═╝ `).split("\n").map(v => v.split(''));
    const curPre = { x: pre % 16 - 3, y: Math.floor(pre / 16) - 3 }
    const curNext = { x: next % 16 - 3, y: Math.floor(next / 16) - 3 }
    if (!noclean) {
        readline.cursorTo(process.stdout, 0, 0);
        readline.clearScreenDown(process.stdout);// 清空
    }
    if (typeof board === 'string') {
        board = board.replace(/\d/g, (v) => ' '.repeat(v)).split('/').map(v => v.split(''));
    }
    console.log((cursor ? "人" : "机") + " 0 1 2 3 4 5 6 7 8")
    for (let i = 0; i < board.length; i++) {
        board[i].forEach((v, j) => {
            const p = book.indexOf(v) + 15;
            const isCursor = cursor && cursor.x === j && cursor.y === i;
            const isSelected = selected && selected.x === j && selected.y === i;
            const isPre = curPre.x === j && curPre.y === i
            const isNext = curNext.x === j && curNext.y === i
            if (book[p]) {
                pan[i][j * 2 + 1] = '';
                if (isSelected) {
                    pan[i][j * 2] = p < 22 ? themeBlackCur(book[p]) : themeWhiteCur(book[p]);
                } else if (isCursor) {
                    pan[i][j * 2] = p < 22 ? themeBlack.inverse(book[p]) : themeWhite.inverse(book[p]);
                } else if (isNext) {
                    pan[i][j * 2] = p < 22 ? themeBlackNxt(book[p]) : themeWhiteNxt(book[p]);
                } else {
                    pan[i][j * 2] = p < 22 ? themeBlack(book[p]) : themeWhite(book[p]);
                }
            } else if (isCursor) {
                pan[i][j * 2] = themeBgCur(pan[i][j * 2])
                pan[i][j * 2 + 1] = themeBgCur(pan[i][j * 2 + 1])
            } else if (isPre) {
                pan[i][j * 2] = themeBgCur(pan[i][j * 2])
                pan[i][j * 2 + 1] = themeBgCur(pan[i][j * 2 + 1])
            } else {
                pan[i][j * 2] = themeBg(pan[i][j * 2])
                pan[i][j * 2 + 1] = themeBg(pan[i][j * 2 + 1])
            }

        });
        console.log(i + ' ' + pan[i].join(''))
    }

}
export { drawBoard }

// drawBoard(`rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR`, { x: 2, y: 3 }, { x: 2, y: 6 })
/*
车马相士将士相马车
＋＋＋＋＋＋＋＋＋　　　　　　　　
＋炮＋＋＋＋＋炮＋
＋＋＋＋＋＋＋＋＋
兵＋兵＋兵＋兵＋兵
＋＋＋＋＋＋＋＋＋
＋＋＋＋＋＋＋＋＋
兵＋兵＋兵＋兵＋兵
＋＋＋＋＋＋＋＋＋　　　　　　　　
＋炮＋＋＋＋＋炮＋
车马相士将士相马车

┌─┬─┬─┬─┬─┬─┬─┬─┐
├─┼─┼─┼─┼─┼─┼─┼─┤
├─┼─┼─┼─┼─┼─┼─┼─┤
├─┼─┼─┼─┼─┼─┼─┼─┤
├─┴─┴─┴─┴─┴─┴─┴─┤
├─┬─┬─┬─┬─┬─┬─┬─┤
├─┼─┼─┼─┼─┼─┼─┼─┤
├─┼─┼─┼─┼─┼─┼─┼─┤
├─┼─┼─┼─┼─┼─┼─┼─┤
└─┴─┴─┴─┴─┴─┴─┴─┘
╔═╤═╤═╤═╤═╤═╤═╤═╗ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┴─┴─┴─┴─┴─┴─┴─╢ 
╟─┬─┬─┬─┬─┬─┬─┬─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╟─┼─┼─┼─┼─┼─┼─┼─╢ 
╚═╧═╧═╧═╧═╧═╧═╧═╝ 
*/