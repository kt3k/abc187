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
const edges = range(n - 1).map(() => nexts(2).map(n => n - 1))
const vertices = range(n).fill(0)

/** nodes relationships */
const g = range(n).map(() => new Set())
for (let [a, b] of edges) {
  g[a].add(b)
  g[b].add(a)
}
console.error(g)

const depth = range(n).fill(-1)
depth[0] = 0
const q = [0]
while (q.length > 0) {
  const at = q.pop()
  for (const i of g[at]) {
    if (depth[i] === -1) {
      depth[i] = depth[at] + 1
      q.push(i)
    }
  }
}
console.error(depth)

const score = range(n).fill(0)

for (const _ of range(next())) {
  const [t, e, x] = nexts(3)
  const [a, b] = edges[e - 1]
  if (depth[a] < depth[b] && t === 1) {
    score[0] += x
    score[b] -= x
  } else if (depth[a] < depth[b] && t === 2) {
    score[b] += x
  } else if (depth[a] > depth[b] && t === 1) {
    score[a] += x
  } else if (depth[a] > depth[b] && t === 2) {
    score[0] += x
    score[a] -= x
  }
}
q.push(0)
while (q.length > 0) {
  const at = q.pop()
  for (const i of g[at]) {
    if (depth[i] > depth[at]) {
      score[i] += score[at]
      q.push(i)
    }
  }
}

console.error(score)

for (const s of score) {
  console.log(s)
}
