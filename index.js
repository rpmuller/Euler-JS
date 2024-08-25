"use strict"

const { count } = require("console");
const { fstat } = require("fs");

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
console.assert(arrays_equal(range(4),[ 0, 1, 2, 3 ]))
console.assert(arrays_equal(range(1,5),[ 1, 2, 3, 4 ]))

function arrays_equal(a,b){
  if (a.length != b.length) return false
  if (a === b) return true;
  if (a == null || b == null) return false;

  for (let i=0; i<a.length; i++){
    if (a[i] != b[i]) return false
  }
  return true
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}
console.assert(gcd(2, 4) === 2)
console.assert(gcd(12, 8) ===  4)
console.assert(gcd(100,7) ===  1)

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
console.assert(sum([1,2,3,4])===10)

function divisibleby35(n) {
  return n % 3 === 0 || n % 5 === 0;
}


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

function digits(n) {
  return n.toString().split("").map(Number);
}
console.assert(arrays_equal(digits(12),[1,2]))

function ispalindrome(n) {
  return digits(n).join("") === digits(n).reverse().join("");
}
console.assert(!ispalindrome(12))
console.assert(ispalindrome(121))


// P9:
function triples(m,n){
  let m2=m*m, n2=n*n;
  return [m2-n2, 2*m*n, m2+n2]
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

function collatz_step(n){
  return iseven(n) ? n/2 : 3*n+1
}
console.assert(collatz_step(4) === 2)
console.assert(collatz_step(3) === 10)

function collatz_length(n,maxsteps=1000){
  let i=0, next=n;
  for (i=1; i<maxsteps; i++){
    if (next === 1) break
    next = iseven(next) ? next/2 : 3*next+1
  }
  return i 
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

class Matrix {
  constructor(nrows,ncols,val=0) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.data = new Array(nrows*ncols).fill(val)
  }

  get(i,j) {
    return this.data[i+(j-1)*this.ncols];
  }

  set(i,j,val) {
    this.data[i+(j-1)*this.ncols] = val;
  }

}
let test = new Matrix(5,4,1)
console.assert(test.get(1,1,1) === 1)

function divmod(n,m){
  let mod = n%m,
    div = Math.floor(n/m)
  return [div,mod]
}
console.assert(arrays_equal(divmod(5,2),[2,1]))

function number_as_word(n){
  let digits = ['','one','two','three','four','five','six','seven','eight',
    'nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
    'seventeen','eighteen','nineteen'],
    tens = ['zero','ten','twenty','thirty','forty','fifty','sixty','seventy',
      'eighty','ninety']

  let ts,hs,rest
  
  if (n === 1000) {
    return 'onethousand'
  } else if (n > 99) {
    [hs,rest] = divmod(n,100)
    if (rest>0) {
      return digits[hs] + 'hundredand' + number_as_word(rest)
    } else {
      return digits[hs] + 'hundred'
    }

  } else if (n < 20) {
    return digits[n]
  } else if (n < 100) {
    [ts,rest] = divmod(n,10)
    return tens[ts] + digits[rest]
  }
  return 'xxx'
}

function number_as_letter_count(n) {return number_as_word(n).length}

function isleap(year){
  if (year%400 === 0) return true
  if (year%100 === 0) return false
  if (year%4 === 0) return true
  return false
}
console.assert(isleap(2000))
console.assert(isleap(1984))
console.assert(!isleap(1985))

function days_in_month(month,year=0){
  if (month === 2){
    if (isleap(year)) return 29
    return 28
  } else if ([1,3,5,7,8,10,12].includes(month)) {
    return 31
  }
  return 30
}
console.assert(days_in_month(2,1984) === 29)
console.assert(days_in_month(11,12) === 30)

function product(arr){
  let prod = 1
  for (let a of arr) prod *= a
  return prod
}
console.assert(product([2,4,6]) === 48)

function factorial(n){
  return product(range(1,n+1))
}
console.assert(factorial(5) == 120)

function big_factorial(n){
  let prod = 1n
  for (let i=1n; i<BigInt(n+1); i++) prod *= i
  return prod
}
console.assert(big_factorial(5) == 120n)
console.assert(sum(digits(big_factorial(10)))===27)

function proper_divisors(n){
  let divs = [1]
  for (let i=2; i<=Math.ceil(n/2); i++)
    if (n%i === 0) divs.push(i)
  return divs
}
console.assert(arrays_equal(proper_divisors(220),[1,2,4,5,10,11,20,22,44,55,110]))

function word_value(word){
  let val=0;
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let c of word) val += letters.indexOf(c)+1;
  return val;
}
console.assert(word_value("COLIN")===53)

