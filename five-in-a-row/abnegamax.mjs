const MINN = -(1 << 28);
const MAXDEEP = 4;
function abnegamax(node, a, b, deep) {
    if (deep >= MAXDEEP || node.isEnd) return node;
    let bestV = { score: MINN };
    for (let child of node.children()) {
        const val = abnegamax(child, -b, -Math.max(a, bestV.score), deep + 1);
        val.score = -val.score
        if (val.score > bestV.score) {
            bestV = val;
            if (bestV.score >= b) break;
        }
    }

    return bestV;
}
export { abnegamax }