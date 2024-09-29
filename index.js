// Shared code is here:
function arrays_equal(a,b){
  if (a.length !== b.length) return false;
  for (let [i,ai] of a.entries())
    if (ai !== b[i]) return false;
  return true;
}

function range(start, end = undefined, step = 1) {
  if (end === undefined) [start,end] = [0,start];
  const cmp = i => (step > 0) ? i < end : i > end;
  let l = [];
  for (let i = start; cmp(i); i += step) l.push(i);
  return l;
}

const gcd = (a,b) => (b === 0) ? a : gcd(b,a%b);
const even = n => (n%2 === 0);
const sum = arr => arr.reduce((a,b) => a+b);

const divisibleby35 = n => [3,5].some(i => (n%i === 0));
console.assert(divisibleby35(3));
console.assert(divisibleby35(5));
console.assert(divisibleby35(15));
console.assert(divisibleby35(9));
console.assert(!divisibleby35(7));

function fib_below(n,a=1,b=1) {
  let l = [];
  while (b < n) {
    l.push(b);
    [a, b] = [b, a + b];
  }
  return l;
}

const isqrt = n => Math.floor(Math.sqrt(n));

function sieve(n) {
  let array = Array(n).fill(true);

  for (let i = 2; i < Math.sqrt(n); i++){
    if (array[i])
      for (let j = i * i; j < n; j += i)
        array[j] = false;
  }
  let output = []
  for (let i=2; i<n; i++) if (array[i]) output.push(i);
  return output;
}
console.assert(arrays_equal(sieve(10),[2,3,5,7]));

const prime_factors = n => sieve(isqrt(n)).filter(p => (n%p == 0));
console.assert(arrays_equal(prime_factors(28),[2,7]));
const max_prime_factor = n => Math.max(...prime_factors(n));

const digits = n => n.toString().split("").map(Number);
console.assert(arrays_equal(digits(12),[1,2]))

const ispalindrome = n => arrays_equal(digits(n),digits(n).reverse());
console.assert(!ispalindrome(12))
console.assert(ispalindrome(121))
console.assert(!ispalindrome(122))

const triples = (m,n) => [m2-n2, 2*m*n, m2+n2];

const divisors = n => range(1,n+1).filter(i => n%i===0)
const count_divisors = n => divisors.length

function count_divisors_triangle(n){ // count the divisors of n(n+1)/2
  let [a,b] = even(n) ? [n/2,n+1] : [n,(n+1)/2];
  let div = combine_divisors(n*(n+1)/2,divisors(a),divisors(b))
  return div.length
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

const collatz = n => even(n) ? n/2 : 3*n+1
console.assert(collatz(4) === 2)
console.assert(collatz(3) === 10)

function collatz_length(n,maxsteps=1000){
  let i=0, next=n;
  for (i=1; i<maxsteps; i++){
    if (next === 1) break
    next = collatz(next)
  }
  return i 
}

class Matrix {
  constructor(nrows,ncols,val=0) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.data = new Array(nrows*ncols).fill(val)
  }
  get = (i,j) => this.data[i+j*this.ncols];
  set = (i,j,val) => this.data[i+j*this.ncols] = val;
}

let m = new Matrix(5,4,1);
m.set(1,1,5);
console.assert(m.get(1,1) === 5)

const divmod = (n,m) => [Math.floor(n/m),n%m];
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

const number_as_letter_count = n => number_as_word(n).length;

const isleap = year => (year%400 === 0) ? true : (year%100 === 0) ? false : (year%4 === 0) ? true : false;
console.assert(isleap(2000))
console.assert(isleap(1984))
console.assert(!isleap(1985))

function days_in_month(month,year=0){
  if (month === 2){
    if (isleap(year)) return 29;
    return 28;
  } else if ([1,3,5,7,8,10,12].includes(month)) {
    return 31;
  }
  return 30;
}
console.assert(days_in_month(2,1984) === 29)
console.assert(days_in_month(11,12) === 30)

const product = arr => arr.reduce((a,b)=>a*b,1);
console.assert(product([2,4,6]) === 48)

const factorial = n => product(range(1,n+1));
console.assert(factorial(5) == 120)
const big_factorial = n => range(1,n+1).reduce((a,b) => a*BigInt(b),1n)
console.assert(big_factorial(5) == 120n)
console.assert(sum(digits(big_factorial(10)))===27)

const proper_divisors = n => range(1,n/2+1).filter(i => n%i === 0)
console.assert(arrays_equal(proper_divisors(220),[1,2,4,5,10,11,20,22,44,55,110]))

function word_value(word){
  const value = c => "_ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c);
  return sum(word.split("").map(value));
}
console.assert(word_value("COLIN")===53)

const abundant = n => sum(proper_divisors(n))>n;
console.assert(abundant(12));

const abundants = n => range(2,n).filter(abundant);
console.assert(arrays_equal(abundants(20),[12,18]))

export {gcd, range, even, sum};