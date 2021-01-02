"use strict";
const input = require('fs').readFileSync(0, 'UTF-8')
const cin = input.split(/ |\n/)
let cid = 0
const cmp = (s) => (x, y) => s * (x - y)
const range = (n) => [...Array(n)].map((_, i) => i)
const nextstr = () => cin[cid++]
const next = () => +nextstr()
const nextbig = () => BigInt(nextstr())
const nextsstr = (n) => cin.slice(cid, cid += n)
const nexts = (n) => nextsstr(n).map(Number)
const nextsbig = (n) => nextsstr(n).map(BigInt)
const nextssort = (n, s = 1) => nexts(n).sort(cmp(s))
const nextssortbig = (n, s = 1n) => nextsbig(n).sort(cmp(s))
const nextmstr = (h, w) => range(h).map(() => nextsstr(w))
const nextm = (h, w) => range(h).map(() => nexts(w))
const nextmbig = (h, w) => range(h).map(() => nextsbig(w))
const results = []
const print = (n) => results.push(n)
const exec = (f) => { let x=f(); if (x !== undefined) { console.log(x); } console.log(results.join('\n')); }

const n = next();
const points = [...Array(n)].map(() => nexts(2))
let a = 0
for (const [x0, y0] of points) {
  for (const [x1, y1] of points) {
    if (Math.abs(y0 - y1) / Math.abs(x0 - x1) <= 1) {
      a++
    }
  }
}

console.log(a/2)
