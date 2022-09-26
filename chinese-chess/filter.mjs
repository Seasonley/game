import { B_C2F, B_F2C } from "./bitBoard.mjs";

function B2F(bArr) {
    return bArr.filter(v => !isNaN(v)).map(v => B_C2F[v]).join('').match(/([\S\s]{9})/g).join('/').replace(/\s+/g, (a, b) => a.length);
}

function F2B(fStr) {
    const c = Array.from({ length: 51 }).fill(NaN);
    let i = 0;
    for (; i < fStr.length; i++) {
        if (B_F2C[fStr[i]]) {
            c.push(B_F2C[fStr[i]])
        } else if (fStr[i] === '/') {
            c.push(NaN, NaN, NaN, NaN, NaN, NaN, NaN)
        } else if (fStr[i] > 0) {
            Array.prototype.push.apply(c, Array.from({ length: +fStr[i] }, () => 0))
        } else {
            const start = c.length;
            c.length = 256;
            c.fill(NaN, start)
            return c
        }
    }
    return c
}

export { B2F, F2B }