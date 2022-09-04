const MAXN = 1 << 28;
const MINN = -MAXN;
function abminimax(node, MAXDEEP, a, b) {
    if (node.deep >= MAXDEEP) return node
    let arr = node.childrenit();
    let bestV;
    if (node.deep % 2) {//min
        bestV = { mark: MAXN };
        for (let child of arr) {
            const val = abminimax(child, MAXDEEP, a, b)
            if (val.mark < bestV.mark) {
                bestV = val;
                b = bestV.mark
                if (a >= b) break;
            }
        }
    } else {
        bestV = { mark: MINN };
        for (let child of arr) {
            const val = abminimax(child, MAXDEEP, a, b)
            if (val.mark > bestV.mark) {
                bestV = val;
                b = bestV.mark
                if (a >= b) break;
            }
        }
    }
    return bestV;
}
export { abminimax }