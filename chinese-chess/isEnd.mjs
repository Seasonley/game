import { B_F2C } from "./bitBoard.mjs"
import { moveGenerate } from "./moveJudge.mjs"

function isMate(board, chess, q) {
  /*
(1) 假设帅(将)是车，判断它是否能吃到对方的车和将(帅)(中国象棋中有将帅不能对脸的规则)；
(2) 假设帅(将)是炮，判断它是否能吃到对方的炮；
(3) 假设帅(将)是马，判断它是否能吃到对方的马，需要注意的是，帅(将)的马腿用的数组是 ccAdvisorDelta，而不是 ccKingDelta；
(4) 假设帅(将)是过河的兵(卒)，判断它是否能吃到对方的卒(兵)
  */
  let kid = chess[q === 1 ? 15 : 31];
  let KID = chess[q === -1 ? 15 : 31];
  const res = [];
  const endArr = [B_F2C.r, B_F2C.c, B_F2C.n, B_F2C.p];
  for (let i = 0; i < endArr.length; i++) {
    const t = endArr[i];
    moveGenerate[t](kid, board, q, res, true);
    if (res.some((v) => board[v[1]] === q * t || board[v[1]] === KID)) {
      return true;
    }
  }
  return false;
}

function isEnd(board, chess, q) {
  return false;
}
export { isMate }