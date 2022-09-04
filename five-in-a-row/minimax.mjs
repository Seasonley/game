function minimax(node, MAXDEEP) {
    if (node.deep >= MAXDEEP) return node;
    let arr = node.children().map(v => minimax(v, MAXDEEP));
    if (node.deep % 2)//min
        return arr.sort((a, b) => a.mark - b.mark)[0]
    else
        return arr.sort((a, b) => b.mark - a.mark)[0]
}

export { minimax }
