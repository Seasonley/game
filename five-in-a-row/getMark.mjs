
function getMark(chessBoard) {
    if (typeof chessBoard === 'string') {
        chessBoard = chessBoard.replace(/(\d{16})/g, "$1,").slice(0, -1).split(',').map(v => v.split('').map(v => v == 2 ? -1 : v));
    }
    const MAXN = 1 << 28;
    let res = 0; const size = chessBoard.length - 1;
    for (let i = 1; i <= size; ++i) {
        for (let j = 1; j <= size; ++j) {
            if (chessBoard[i][j] != 0) {
                // 行  
                let flag1 = false, flag2 = false;
                let x = j, y = i;
                let cnt = 1;
                let col = x, row = y;
                while (--col > 0 && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (col > 0 && chessBoard[row][col] == 0) flag1 = true;
                col = x; row = y;
                while (++col <= size && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (col <= size && chessBoard[row][col] == 0) flag2 = true;
                if (flag1 && flag2)
                    res += chessBoard[i][j] * getScore(cnt);
                else if (flag1 || flag2) res += chessBoard[i][j] * getScore(cnt, true);
                if (cnt >= 5) res = MAXN * chessBoard[i][j];
                // 列  
                col = x; row = y;
                cnt = 1; flag1 = false; flag2 = false;
                while (--row > 0 && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (row > 0 && chessBoard[row][col] == 0) flag1 = true;
                col = x; row = y;
                while (++row <= size && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (row <= size && chessBoard[row][col] == 0) flag2 = true;
                if (flag1 && flag2)
                    res += chessBoard[i][j] * getScore(cnt);
                else if (flag1 || flag2)
                    res += chessBoard[i][j] * getScore(cnt, true);
                if (cnt >= 5) res = MAXN * chessBoard[i][j];
                // 左对角线  
                col = x; row = y;
                cnt = 1; flag1 = false; flag2 = false;
                while (--col > 0 && --row > 0 && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (col > 0 && row > 0 && chessBoard[row][col] == 0) flag1 = true;
                col = x; row = y;
                while (++col <= size && ++row <= size && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (col <= size && row <= size && chessBoard[row][col] == 0) flag2 = true;
                if (flag1 && flag2)
                    res += chessBoard[i][j] * getScore(cnt);
                else if (flag1 || flag2) res += chessBoard[i][j] * getScore(cnt, true);
                if (cnt >= 5) res = MAXN * chessBoard[i][j];
                // 右对角线  
                col = x; row = y;
                cnt = 1; flag1 = false; flag2 = false;
                while (++row <= size && --col > 0 && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (row <= size && col > 0 && chessBoard[row][col] == 0) flag1 = true;
                col = x; row = y;
                while (--row > 0 && ++col <= size && chessBoard[row][col] == chessBoard[y][x]) ++cnt;
                if (row > 0 && col <= size && chessBoard[i][j] == 0) flag2 = true;
                if (flag1 && flag2)
                    res += chessBoard[i][j] * getScore(cnt);
                else if (flag1 || flag2) res += chessBoard[i][j] * getScore(cnt, true);
                if (cnt >= 5) res = MAXN * chessBoard[i][j];

            }
        }
    }
    return res;
}

function getScore(cnt, flag) {
    flag = flag ? 0 : 1;
    switch (cnt) {
        case 5: return 1 << (15 + flag)
        case 4: return 1 << (11 + flag)
        case 3: return 1 << (7 + flag)
        case 2: return 1 << (5 + flag)
        default: return 1
    }
}

export { getMark }