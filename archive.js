function p1(){
  p1max = 1000;
  p1list = range(2, p1max).filter(divisibleby35);
  console.log(sum(p1list))
}

function p2(n=4_000_000){
    l = fib_seq_below(n).filter(iseven);
    p2sum = sum(l);
    console.log(p2sum);
}

function p3(n = 600_851_475_143){
    let val = max_prime_factor(n);
    console.log(val)
}

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
  
function p14(maxsteps=1_000_000){
  let records = []
  for (let i=2; i<maxsteps; i++)
    records.push([collatz_length(i),i]);
    records.sort((a,b) => a[0]-b[0]).reverse()
    console.log(records[0])
}
  
function p15(m,n){
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

function p15a(m,n){
  let ways = new Matrix(m+1,n+1);
  let i,j;
  for (i=0; i<=m; i++) ways.set(i,0,1);
  for (j=0; j<=n; j++) ways.set(0,j,1);

  for (i=1; i<=m; i++)
      for (j=1; j<=n; j++) 
        ways.set(i,j,ways.get(i-1,j) + ways.get(i,j-1));

  return ways.get(m,n);
}  
console.log(p15a(20,20))

  
function p16(){
    let val = 2n**1000n
    let dsum = sum(digits(val))
    console.log(dsum)
}
  
function p17(){
    //console.log(sum([1,2,3,4,5].map(number_as_letter_count)))
    //console.log(sum([342,115].map(number_as_letter_count)))
    console.log(sum(range(1,1001).map(number_as_letter_count)))
}
  
function p19(){
  /*
  1 Jan 1900 was a Monday.
  Thirty days has September,
  April, June and November.
  All the rest have thirty-one,
  Saving February alone,
  Which has twenty-eight, rain or shine.
  And on leap years, twenty-nine.

  A leap year occurs on any year evenly divisible by 4, 
  but not on a century unless it is divisible by 400.

  How many Sundays fell on the first of the month 
  during the twentieth century (1 Jan 1901 to 31 Dec 2000)?
  */

  let sundays = 0,dotw = 1
  for (let year of range(1900,2001)){
    for (let month of range(1,13)){
      dotw = (dotw + days_in_month(month,year)) % 7
      if ((dotw === 0) && (year > 1900)) sundays += 1
    }
  }
  return sundays
}
console.log(p19())
  
function p20(){
  return sum(digits(big_factorial(100)))
}
console.assert(p20() === 648)

function p21(nmax=10_000){
  let amicables = new Set()
  for (let i=2; i<nmax; i++){
    let dsum = sum(proper_divisors(i))
    if ((sum(proper_divisors(dsum))===i) && (i != dsum)) amicables.add(i,dsum)
  }
  return amicables
}
console.assert(sum(Array.from(p21()))==31626)

function p22(){
  const fs = require("fs");
  let data = fs.readFileSync("names.txt","utf-8");
  data = data.replaceAll('"','').split(",").sort();
  let val = 0;

  for (let [index,name] of data.entries())
    val += (index+1)*word_value(name);
  return val;
}
console.assert(p22()===871198282)

function p23(){
  let abundants = calc_abundants(30_000),
    ab_sums = new Array(30_000).fill(false);
  let a,b;
  for (a of abundants){
    for (b of abundants){
      if (a<b) break;
      if (a+b < 30_000) ab_sums[a+b] = true;
    }
  }
  let non_absums = [];
  for (let [i,is_absum] of ab_sums.entries()){
    if (!is_absum) {
      non_absums.push(i);
      //console.log(i,is_absum);
    }
  }
  return sum(non_absums);
}
console.assert(p23() === 4179871)