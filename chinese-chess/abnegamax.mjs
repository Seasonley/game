const MINN = -(1 << 28);
const MAXDEEP = 2;
function abnegamax(node, a, b, deep) {
    if (deep >= MAXDEEP || node.isEnd) return node;
    let bestV = { mark: MINN };
    for (let child of node.children()) {
        const val = abnegamax(child, -b, -Math.max(a, bestV.mark), deep + 1);
        val.mark = -val.mark
        if (val.mark > bestV.mark) {
            bestV = val;
            if (bestV.mark >= b) break;
        }
    }

    return bestV;
}
export { abnegamax }