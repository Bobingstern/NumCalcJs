# NumCalcJs
Simple Numerical Calculus in JavaScript! A bunch of utility function I made that I decided to compile into a library.

## Install
Head over to the [NumCalcJS](https://github.com/Bobingstern/NumCalcJs/tree/main/NumCalcJs) directory and grab the minified or the regular version and add it to your project.

## Usage

### Maximum and Minimum

`NumCalc.maximum(f: function, a: number, b: number, error: number = 1e-4): number`

`NumCalc.minimum(f: function, a: number, b: number, error: number = 1e-4): number`

Return the `x` value of the maximum/minimum of a function `f` over a given interval `a, b` with an optional `error` argument using the Golden Section Search. Default value of error is `1e-4`.

```js
console.log(
  NumCalc.maximum(Math.sin, 1.3, 5.6),
  NumCalc.minimum(Math.sin, 1.3, 5.6)
); // 1.57079... 4.71239...
```

### NDerivative

`NumCalc.NDerivative(f: function, x: number, n: number): number`

Returns the instant slope at `x` of the `n`th derivative of `f`. High order derivatives will lose precision due to floating point round off. This is countered by using Machine Epsilon but is not 100% perfect.

```js
console.log(
  NumCalc.NDerivative(Math.sin, Math.PI / 2, 1) // 1st derivative of sin
); // 0
```

### FDerivative

`NumCalc.FDerivative(f: function, n: number): function`

Returns the `n`th derivative of `f` as a callable function. High order derivatives will lose precision due to floating point round off. This is countered by using Machine Epsilon but is not 100% perfect. This is just a wrapper around `NumCalc.NDerivative` to return a function.

```js
let derivative = NumCalc.FDerivative(Math.sin, 1) // 1st derivative of sin
console.log(derivative(Math.PI)) // -0.99999...
```

### NIntegrate
`NumCalc.NIntegrate(f: number, a: number, b: number): number`

Computes the definite integral of `f` over a given interval `a, b` using Gaussian Quadrature and and a table of 64 Weights and Abscissae. It can handle improper integrals too using bounds of `Infinity` or `-Infinity`. Error is fixed but runs extremely fast only using 64 calls of `f` to get a very precise integral value. Likely to fail if the bounds contain an asymptote.

```js
function f(x) {
  return Math.exp(-(x**2)); // Gaussian bump
}

console.log(NumCalc.NIntegrate(f, 0, Infinity)); // 0.88622...
console.log(NumCalc.NIntegrate(f, -Infinity, Infinity)); // 1.77245...
console.log(NumCalc.NIntegrate(f, -Infinity, 0)); // 0.88622...
console.log(NumCalc.NIntegrate(f, -2.2, 0.2)); // 1.081941...
```

## Notes

This library is not meant to be perfect or super efficient so expect bugs. You can make an issue and I'll try to fix it in a later release.

