# NumCalcJs
Simple Numerical Calculus in JavaScript! A bunch of utility function I made that I decided to compile into a library.

## Install
Head over to the [NumCalcJS](https://github.com/Bobingstern/NumCalcJs/tree/main/NumCalcJs) directory and grab the minified or the regular version and add it to your project.

## Usage

### Maximum and Minimum
`NumCalc.maximum(f,a,b,error)`

Computes the maximum of a function `f` over a given interval `a,b` with an optional `error` argument using the Golden Section Search. Default error `1e-4`

`NumCalc.minimum(f,a,b,error)`

Computes the minimum of a function `f` over a given interval `a,b` with an optional `error` argument using the Golden Section Search. Default error `1e-4`

```js
function f(x){
  return Math.sin(x)
}
console.log(NumCalc.maximum(f,1.3,5.6),NumCalc.minimum(f,1.3,5.6)) //1.57079... 4.71239...
```

### FDerivative
`NumCalc.FDerivative(f,n)`

Returns the nth derivative of `f` as a callable function. High order derivatives will lose precision due to floating point roud off. This is countered by using Machine Epsilon but is not 100% perfect.

```js
function f(x){
  return Math.sin(x) * Math.sqrt(1+x**2)
}
let derivative = NumCalc.FDerivative(f,4) //4th derivative of f
console.log(derivative(3.53)) //2.27...
```

### NIntegrate
`NumCalc.NIntegrate(f,a,b,error)`

Computes the definite integral of `f` over a given interval `a,b` using Simpson's Rule and the 4th derivative of `f` to choose the number of partitions used using `error`. It can handle improper integrals too using bounds of `Infinity` or `-Infinity` Default error `1e-4`. Likely to fail if the bounds contain an asymptote

```js
function f(x){
  return Math.exp(-(x**2)) // Gaussian bump
}

console.log(NumCalc.NIntegrate(f,0,Infinity)) //0.88622...
console.log(NumCalc.NIntegrate(f,-Infinity,Infinity)) //1.77245...
console.log(NumCalc.NIntegrate(f,-Infinity,0)) //0.88622...
console.log(NumCalc.NIntegrate(f,-2.2,0.2)) //1.081941...
```

## Notes
This library is not meant to be perfect or super efficient so expect bugs. You can make an issue and I'll try to fix it in a later release.

