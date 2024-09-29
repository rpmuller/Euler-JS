import { expect, test } from "bun:test";
import {
  gcd,
  range,
  even,
  sum,
  divisibleby35,
  sieve,
  prime_factors,
  digits,
  ispalindrome,
  collatz,
  Matrix,
  divmod,
  isleap,
  days_in_month,
  product,
  factorial,
  big_factorial,
  proper_divisors,
  word_value,
  abundant,
  abundants
} from "./index.js";

test("gcd", () => {
  expect(gcd(2,4)).toBe(2);
  expect(gcd(12,8)).toBe(4);
  expect(gcd(100,7)).toBe(1);
});

test("range", () =>{
  expect(range(4)).toEqual([0, 1, 2, 3]);
  expect(range(1,5)).toEqual([1,2,3,4]);
  expect(range(3,0,-1)).toEqual([3,2,1]);
});

test("even", () => {
  expect(even(16)).toBe(true);
});

test("sum", () => {
  expect(sum([1,2,3,4])).toBe(10);
});

test("divisibleby35", ()=>{
  expect(divisibleby35(3)).toBe(true);
  expect(divisibleby35(5)).toBe(true);
  expect(divisibleby35(15)).toBe(true);
  expect(divisibleby35(9)).toBe(true);
  expect(divisibleby35(7)).toBe(false);
});

test("sieve", ()=>{
  expect(sieve(10)).toEqual([2,3,5,7]);
});

test("prime_factors", () =>{
  expect(prime_factors(28)).toEqual([2,7]);
});

test("digits", () =>{
  expect(digits(12)).toEqual([1,2]);
});

test("ispalindrome", () =>{
  expect(ispalindrome(12)).toBe(false);
  expect(ispalindrome(121)).toBe(true);
  expect(ispalindrome(122)).toBe(false);
});

test("collatz", () =>{
  expect(collatz(4)).toBe(2);
  expect(collatz(3)).toBe(10);
});

test("Matrix", () => {
  let m = new Matrix(5,4,1);
  m.set(1,1,5);
  expect(m.get(1,1)).toBe(5);
});

test("divmod", () =>{
  expect(divmod(5,2)).toEqual([2,1]);
});

test("isleap", () =>{
  expect(isleap(2000)).toBe(true);
  expect(isleap(1984)).toBe(true);
  expect(isleap(1985)).toBe(false);
});

test("days_in_month", () => {
  expect(days_in_month(2,1984)).toBe(29);
  expect(days_in_month(11,12)).toBe(30);
});

test("product", ()=> {
  expect(product([2,4,6])).toBe(48);
});

test("factorial", ()=>{
  expect(factorial(5)).toBe(120);
  expect(big_factorial(5)).toBe(120n);
  expect(sum(digits(big_factorial(10)))).toBe(27);
});

test("proper_divisors", ()=>{
  expect(proper_divisors(220)).toEqual([1,2,4,5,10,11,20,22,44,55,110]);
});

test("word_value", ()=>{
  expect(word_value("COLIN")).toBe(53);
});

test("abundant", ()=>{
  expect(abundant(12)).toBe(true);
  expect(abundants(20)).toEqual([12,18]);
});