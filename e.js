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
const edges = range(n - 1).map(() => nexts(2))
const vertices = range(n).fill(0)
const verticesX = range(n).fill([])
const q = next()
const qs = range(q).map(() => nexts(3))

for (const [a, b] of edges) {
  verticesX[a - 1].push(b)
  verticesX[b - 1].push(a)
}

const memo = {}

/**
 * @param v0 vertex included
 * @param v1 vertex excluded
 */
const getNodes = (v0, v1) => {
  const key = `${v0},${v1}`
  const c = memo[key]
  if (c) return c

  const nodes = [v0] // included nodes
  let len = nodes.length
  while (true) {
    for (const [n0, n1] of edges) {
      if (nodes.includes(n0) && !nodes.includes(n1) && n1 !== v1) {
        nodes.push(n1)
      } else if (nodes.includes(n1) && !nodes.includes(n0) && n0 !== v1) {
        nodes.push(n0)
      }
    }
    if (len === nodes.length) { // finished
      memo[key] = nodes
      return nodes
    }
    len = nodes.length
  }
}

for (const [t, e, x] of qs) {
  const [a, b] = edges[e - 1]
  let ns
  if (t === 1) {
    ns = getNodes(a, b)
  } else {
    ns = getNodes(b, a)
  }
  for (const n of ns) {
    vertices[n - 1] += x
  }
}

vertices.forEach((v, i) => {
  console.log(v)
})
