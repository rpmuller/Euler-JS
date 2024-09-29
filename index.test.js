import { expect, test } from "bun:test";
import {
  gcd,
  range,
  even,
  sum,
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
})

