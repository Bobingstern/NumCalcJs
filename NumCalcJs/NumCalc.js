const NumCalc_GR = (Math.sqrt(5) + 1) / 2
const NumCalc_EPSILON = 2 ** (-23);
const NumCalc_ROOT_EPSILON = Math.sqrt(NumCalc_EPSILON)
const NumCalc = {

  maximum: (f, a, b, error) => {
    error = error == undefined ? 1e-4 : error
    let c = b - (b - a) / NumCalc_GR
    let d = a + (b - a) / NumCalc_GR
    while (Math.abs(b - a) > error) {
      if (f(c) > f(d)) {
        b = d
      }
      else {
        a = c
      }
      c = b - (b - a) / NumCalc_GR
      d = a + (b - a) / NumCalc_GR
    }
    return (a + b) / 2
  },

  minimum: (f, a, b, error) => {
    error = error == undefined ? 1e-4 : error
    let c = b - (b - a) / NumCalc_GR
    let d = a + (b - a) / NumCalc_GR
    while (Math.abs(b - a) > error) {
      if (f(c) < f(d)) {
        b = d
      }
      else {
        a = c
      }
      c = b - (b - a) / NumCalc_GR
      d = a + (b - a) / NumCalc_GR
    }
    return (a + b) / 2
  },

  nCr: (n, k) => {
    var result = 1;
    for (var i = 1; i <= k; i++) {
      result *= (n + 1 - i) / i;
    }
    return result;
  },

  NDerivative: (f, x, n) => {
    n = n == undefined ? 1 : n
    let h = NumCalc_ROOT_EPSILON * (Math.abs(x) + NumCalc_ROOT_EPSILON) * n ** 2
    let sum = 0
    for (let k = 0; k <= n; k++) {
      sum += (-1) ** k * NumCalc.nCr(n, k) * f(x + (n - 2 * k) * h)
    }
    return 1 / ((2 * h) ** n) * sum
  },

  FDerivative: (f, n) => {
    n = n == undefined ? 1 : n
    return (x) => { return NumCalc.NDerivative(f, x, n); };
  },

  NIntegrate: (f, a, b, error) => {
    error = error == undefined ? 1e-4 : error
    let lower = a
    let upper = b
    let integrand;

    if (b == Number.NEGATIVE_INFINITY || a == Number.POSITIVE_INFINITY) {
      console.log("Improper Integral Error, make sure your bounds are in the correct order when using improper integrals")
      return
    }

    if (b < a) {
      integrand = function(x) {
        return -f(x)
      }
      lower = b
      upper = a
    }
    else if (b == Number.POSITIVE_INFINITY && isFinite(a)) {
      integrand = function(x) {
        if (x == 1) {
          x -= 0.000001 //1/0 error prevention
        }
        return f(a + x / (1 - x)) / ((1 - x) ** 2)
      }
      lower = 0
      upper = 1
    }
    else if (a == Number.NEGATIVE_INFINITY && isFinite(b)) {
      integrand = function(x) {
        if (x == 0) {
          x += 0.000001 //1/0 error prevention
        }
        return f(b - (1 - x) / x) / x ** 2
      }
      lower = 0
      upper = 1
    }
    else if (a == Number.NEGATIVE_INFINITY && b == Number.POSITIVE_INFINITY) {
      integrand = function(x) {
        if (x == 1) {
          x -= 0.000001 //1/0 error prevention
        }
        if (x == -1) {
          x += 0.000001 //1/0 error prevention
        }
        return f(x / (1 - x ** 2)) * ((1 + x ** 2) / ((1 - x ** 2) ** 2))
      }
      lower = -1
      upper = 1
    }
    else {
      integrand = function(x) {
        return f(x)
      }
    }


    let M = NumCalc.maximum(NumCalc.FDerivative(integrand), lower, upper)
    let N = Math.ceil(Math.pow((Math.abs(M) * (upper - lower) ** 5) / (180 * error), 1 / 4)) + 30
    let q = (upper - lower) / N
    let sum = 0
    for (let n = 0; n <= N - 1; n++) {
      sum += integrand(lower + n * q) + 2 * integrand(lower + (n + 0.5) * q)
    }
    return q / 3 * (0.5 * (integrand(upper) - integrand(lower)) + sum)
  }

}