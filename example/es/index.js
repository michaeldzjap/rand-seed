import Rand, { PRNG } from '../../dist/es/index.js';

let rand = new Rand('1234', PRNG.mulberry32);
const result1 = Array.from({ length: 10 }, () => rand.next());

rand = new Rand('1234', PRNG.mulberry32);
const result2 = Array.from({ length: 10 }, () => rand.next());

console.log('RESULT1:', result1);
console.log('RESULT2:', result2);
console.log('RESULT1 == RESULT2:', JSON.stringify(result1) === JSON.stringify(result2));
