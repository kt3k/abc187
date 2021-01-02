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

const n = next()
const strs = nextsstr(n)

const o = {}

for (const str of strs) {
  if (str.startsWith('!')) {
    const key = str.slice(1)
    if (o[key] === 1) { // same
      continue;
    } else if (o[key] === 2) { // opposite
      console.log(key)
      process.exit(0)
    } else {
      o[key] = 1
    }
  } else {
    const key = str
    if (o[key] === 2) { // same
      continue;
    } else if (o[key] === 1) { // opposite
      console.log(key)
      process.exit(0)
    } else {
      o[key] = 2
    }
  }
}

console.log('satisfiable')
