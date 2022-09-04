const MINN = -(1 << 28);
const MAXDEEP = 2;
function abnegamax(node, a, b) {
    if (node.deep >= MAXDEEP) return node
    let arr = node.childrenit();
    let bestV = { mark: MINN };
    for (let child of arr) {
        const val = abnegamax(child, -b, -Math.max(a, bestV.mark));
        val.mark = -val.mark
        if (val.mark > bestV.mark) {
            bestV = val;
            if (bestV.mark >= b) break;
        }
    }

    return bestV;
}
export { abnegamax }