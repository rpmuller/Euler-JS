// Shared code is here:
export function arrays_equal(a,b){
  if (a.length !== b.length) return false;
  for (let [i,ai] of a.entries())
    if (ai !== b[i]) return false;
  return true;
}

export function range(start, end = undefined, step = 1) {
  if (end === undefined) [start,end] = [0,start];
  const cmp = i => (step > 0) ? i < end : i > end;
  let l = [];
  for (let i = start; cmp(i); i += step) l.push(i);
  return l;
}

export const gcd = (a,b) => (b === 0) ? a : gcd(b,a%b);
export const even = n => (n%2 === 0);
export const sum = arr => arr.reduce((a,b) => a+b);
export const divisibleby35 = n => [3,5].some(i => (n%i === 0));
export const isqrt = n => Math.floor(Math.sqrt(n));

export function fib_below(n,a=1,b=1) {
  let l = [];
  while (b < n) {
    l.push(b);
    [a, b] = [b, a + b];
  }
  return l;
}

export function sieve(n) {
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

export const prime_factors = n => sieve(n/2+1).filter(p => (n%p == 0));
export const max_prime_factor = n => Math.max(...prime_factors(n));
export const digits = n => n.toString().split("").map(Number);
export const ispalindrome = n => arrays_equal(digits(n),digits(n).reverse());
export const triples = (m,n) => [m2-n2, 2*m*n, m2+n2];
export const divisors = n => range(1,n+1).filter(i => n%i===0)
export const count_divisors = n => divisors.length

export function count_divisors_triangle(n){ // count the divisors of n(n+1)/2
  let [a,b] = even(n) ? [n/2,n+1] : [n,(n+1)/2];
  let div = combine_divisors(n*(n+1)/2,divisors(a),divisors(b))
  return div.length
}

export function combine_divisors(n,diva,divb){
  let div = new Set();
  for (let da of diva) {
    for (let db of divb) {
      if (da*db<=n) div.add(da*db)
    }
  }
  return div
}

export const collatz = n => even(n) ? n/2 : 3*n+1
console.assert(collatz(4) === 2)
console.assert(collatz(3) === 10)

export function collatz_length(n,maxsteps=1000){
  let i=0, next=n;
  for (i=1; i<maxsteps; i++){
    if (next === 1) break
    next = collatz(next)
  }
  return i 
}

export class Matrix {
  constructor(nrows,ncols,val=0) {
    this.nrows = nrows;
    this.ncols = ncols;
    this.data = new Array(nrows*ncols).fill(val)
  }
  get = (i,j) => this.data[i+j*this.ncols];
  set = (i,j,val) => this.data[i+j*this.ncols] = val;
}

export const divmod = (n,m) => [Math.floor(n/m),n%m];

export function number_as_word(n){
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

export const number_as_letter_count = n => number_as_word(n).length;
export const isleap = year => (year%400 === 0) ? true : (year%100 === 0) ? false : (year%4 === 0) ? true : false;

export function days_in_month(month,year=0){
  if (month === 2){
    if (isleap(year)) return 29;
    return 28;
  } else if ([1,3,5,7,8,10,12].includes(month)) {
    return 31;
  }
  return 30;
}

export function word_value(word){
  const value = c => "_ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(c);
  return sum(word.split("").map(value));
}

export const product = arr => arr.reduce((a,b)=>a*b,1);
export const factorial = n => product(range(1,n+1));
export const big_factorial = n => range(1,n+1).reduce((a,b) => a*BigInt(b),1n)
export const proper_divisors = n => range(1,n/2+1).filter(i => n%i === 0)
export const abundant = n => sum(proper_divisors(n))>n;
export const abundants = n => range(2,n).filter(abundant);

