function negamax(node, MAXDEEP) {
    if (node.deep >= MAXDEEP) return node;
    let arr = node.children();
    let bestV = arr.map(v => {
        const n = negamax(v, MAXDEEP);
        n.mark = -n.mark
        return n;
    }).sort((a, b) => b.mark - a.mark)[0];
    return bestV;
}

export { negamax }