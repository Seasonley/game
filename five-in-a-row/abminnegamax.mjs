const MINN = -(1 << 28);
const MAXDEEP = 2;
function abminnegamax(node, a, b) {
    if (node.deep >= MAXDEEP) return node
    let arr = node.childrenit();
    let bestV = { mark: MINN };
    let i = 0;
    for (let child of arr) {
        let val;
        if (i == 0) {
            val = abminnegamax(child, -b, -Math.max(a, bestV.mark));
            i = 1;
        } else {
            val = abminnegamax(child, -Math.max(a, bestV.mark) - 1, -Math.max(a, bestV.mark));
        }
        if (val.mark > a && val.mark < b) {
            val = abminnegamax(child, -b, -Math.max(a, bestV.mark));
        }
        val.mark = -val.mark
        if (val.mark > bestV.mark) {
            bestV = val;
            if (bestV.mark >= b) break;
        }
    }

    return bestV;
}
export { abminnegamax }