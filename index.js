"use strict"

const { count } = require("console");

// General Utils
function range(start, end = 0, step = 1) {
  let l = [];
  if (end === 0) {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) l.push(i);
  return l;
}
// console.log(range(4)) // [ 0, 1, 2, 3 ]
// console.log(range(1,5)) // [ 1, 2, 3, 4 ]

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
// console.log(gcd(2, 4)) // 2
// console.log(gcd(12, 8)) // 4
// console.log(gcd(100,7)) // 1

function prime_sieve(n) {
  let array = [],
    output = [],
    limit = Math.sqrt(n);
  for (let i = 0; i < n; i++) array.push(true);

  for (let i = 2; i < limit; i++) {
    if (array[i]) {
      for (let j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }
  for (let i = 2; i < n; i++) if (array[i]) output.push(i);
  return output;
}
// console.log(prime_sieve(10)) // [2,3,5,7]

function iseven(n) {
  return n % 2 === 0;
}
// console.log(iseven(2)) // true

function sum(arr) {
  let tot = 0;
  for (let i = 0; i < arr.length; i++) tot += arr[i];
  return tot;
}
//console.log(sum([1,2,3,4])) // 10

// P1: https://projecteuler.net/problem=1
function divisibleby35(n) {
  return n % 3 === 0 || n % 5 === 0;
}

function p1(){
  p1max = 1000;
  p1list = range(2, p1max).filter(divisibleby35);
  console.log(sum(p1list))
}

// P2: https://projecteuler.net/problem=2
function fib_seq_below(n) {
  let a = 1,
    b = 1;
  let l = [];
  while (b < n) {
    l.push(b);
    [a, b] = [b, a + b];
  }
  return l;
}
function p2(n=4_000_000){
  l = fib_seq_below(n).filter(iseven);
  p2sum = sum(l);
  console.log(p2sum);
}

// P3: https://projecteuler.net/problem=3
function isqrt(n) {
  return Math.floor(Math.sqrt(n));
}
function prime_factors(n) {
  let ps = prime_sieve(isqrt(n));
  return ps.filter((p) => n % p === 0);
}
function max_prime_factor(n) {
  return Math.max(...prime_factors(n));
}
//p3max = 13_195
function p3(n = 600_851_475_143){
  let val = max_prime_factor(n);
  console.log(val)
}

// P4: https://projecteuler.net/problem=4
function digits(n) {
  return n.toString().split("");
}
//console.log(digits(12))
function ispalindrome(n) {
  return digits(n).join("") === digits(n).reverse().join("");
}
// console.log(ispalindrome(12)) // false
// console.log(ispalindrome(121)) // true

function p4(start=900, end=1000) {
  let array = [];
  for (let l = start; l < end; l++) {
    for (let m = l + 1; m < end; m++) {
      if (ispalindrome(l * m)) array.push([l*m,l,m]);
    }
  }
  console.log(array.sort()[-1])
}

// P5: https://projecteuler.net/problem=5
function p5(){
  console.log(2*3*2*5*7*2*3*11*13*2*17*19)
}


// P6: https://projecteuler.net/problem=6
function p6(n=100){
    let vals = range(1,n+1)
    let diff = (sum(vals)**2) - sum(vals.map(x => x**2))
    console.log(diff)
}


// P7: https://projecteuler.net/problem=7
function p7(n=10_000,max=105_000){
  let ps = prime_sieve(max)
  console.log(ps[n])
}
//ps = prime_sieve(105_000)
//console.log(ps[10_000])

// P9:
function triples(m,n){
  let m2=m*m, n2=n*n;
  return [m2-n2, 2*m*n, m2+n2]
}
function p9(target=1000,max=1000){
  // Pythagorian triple formula:
  // for m>n>0
  // a = m^2-n^2, b=2mn, c=m^2+n^2
  // a+b+c = 1000
  // a+b+c = m*(m+2n)

  let a,b,c;
  
  for (let m = 1; m < max; m++){
    for (let n = 1; n < m; n++){
    if (2*m*(m+n)===target)  {
      [a,b,c] = triples(m,n)
      console.log(a*b*c);
      }
    } 
  }
}

  // P10:
function p10(n=2_000_000) {
  console.log(sum(prime_sieve(n)))
}

function count_divisors(n){
  let count = 0;
  for (let i=1; i<=n; i++) {
    if (n%i===0) count++;
  }
  return count;
}

function list_divisors(n) {
   let divisors = [];
   for (let i=1; i<=n; i++) {
     if (n%i===0) divisors.push(i);
   }
   return divisors
}


function count_divisors_triangle(n){
  // count the divisors of n(n+1)/2
  let a=0, b=0;
  
  if (iseven(n)){
    a = n/2
    b = n+1
  } else {
    a = n
    b = (n+1)/2
  }
  let diva = list_divisors(a);
  let divb = list_divisors(b);

  let div = combine_divisors(n*(n+1)/2,diva,divb)
  return div.size
}

function combine_divisors(n,diva,divb){
  let div = new Set();
  for (let da of diva) {
    for (let db of divb) {
      if (da*db<=n) div.add(da*db)
    }
  }
  return div
}

function p12(max=100_000_000){
  // first triangle number to have > 500 divisors
  let cd;
  for (let i=1; i<max; i++){
    cd = count_divisors_triangle(i)
    //
    if (cd>500) {
      console.log(i,i*(i+1)/2,cd)
      break
    }
  }
}

function collatz_step(n){
  return iseven(n) ? n/2 : 3*n+1
}

function collatz_length(n,maxsteps=1000){
  let i=0, next=n;
  for (i=1; i<maxsteps; i++){
    if (next === 1) break
    next = iseven(next) ? next/2 : 3*next+1
  }
  return i 
}

function p14(maxsteps=1_000_000){
  let records = []
  for (let i=2; i<maxsteps; i++)
    records.push([collatz_length(i),i]);

  records.sort((a,b) => a[0]-b[0]).reverse()
  console.log(records[0])
}

function p15(){
  // number of paths of a 2x2 grid is 6
  // number of paths of a 1x1 grid is 2
  
}

function zeros2d(m,n){
  let data = []
  for (let i=0; i<m; i++){
    data[i] = []
    for (let j=0; j<n; j++){
      data[i].push(0)
    }
  }
  return data 
}

function routes(m,n){
  let ways = zeros2d(m+1,n+1)
  let i,j
  for (i=0; i<=m; i++) ways[i][0] = 1
  for (j=0; j<=n; j++) ways[0][j] = 1

  for (i=1; i<=m; i++){
    for (j=1; j<=n; j++){
      ways[i][j] = ways[i-1][j] + ways[i][j-1]
    }
  }
  return ways[m][n]
}
console.log(routes(20,20))



