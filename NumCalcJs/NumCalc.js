const NumCalc_GR = (Math.sqrt(5) + 1) / 2
const NumCalc_EPSILON = 2 ** (-23);
const NumCalc_ROOT_EPSILON = Math.sqrt(NumCalc_EPSILON)
let NumCalc_Gaussian_Wi_xi = [
    {"wi":0.0486909570091397,  "xi":-0.0243502926634244},
    {"wi":0.0486909570091397,  "xi":0.0243502926634244},
    {"wi":0.0485754674415034,  "xi":-0.0729931217877990},
    {"wi":0.0485754674415034,  "xi":0.0729931217877990},
    {"wi":0.0483447622348030,  "xi":-0.1214628192961206},
    {"wi":0.0483447622348030,  "xi":0.1214628192961206},
    {"wi":0.0479993885964583,  "xi":-0.1696444204239928},
    {"wi":0.0479993885964583,  "xi":0.1696444204239928},
    {"wi":0.0475401657148303,  "xi":-0.2174236437400071},
    {"wi":0.0475401657148303,  "xi":0.2174236437400071},
    {"wi":0.0469681828162100,  "xi":-0.2646871622087674},
    {"wi":0.0469681828162100,  "xi":0.2646871622087674},
    {"wi":0.0462847965813144,  "xi":-0.3113228719902110},
    {"wi":0.0462847965813144,  "xi":0.3113228719902110},
    {"wi":0.0454916279274181,  "xi":-0.3572201583376681},
    {"wi":0.0454916279274181,  "xi":0.3572201583376681},
    {"wi":0.0445905581637566,  "xi":-0.4022701579639916},
    {"wi":0.0445905581637566,  "xi":0.4022701579639916},
    {"wi":0.0435837245293235,  "xi":-0.4463660172534641},
    {"wi":0.0435837245293235,  "xi":0.4463660172534641},
    {"wi":0.0424735151236536,  "xi":-0.4894031457070530},
    {"wi":0.0424735151236536,  "xi":0.4894031457070530},
    {"wi":0.0412625632426235,  "xi":-0.5312794640198946},
    {"wi":0.0412625632426235,  "xi":0.5312794640198946},
    {"wi":0.0399537411327203,  "xi":-0.5718956462026340},
    {"wi":0.0399537411327203,  "xi":0.5718956462026340},
    {"wi":0.0385501531786156,  "xi":-0.6111553551723933},
    {"wi":0.0385501531786156,  "xi":0.6111553551723933},
    {"wi":0.0370551285402400,  "xi":-0.6489654712546573},
    {"wi":0.0370551285402400,  "xi":0.6489654712546573},
    {"wi":0.0354722132568824,  "xi":-0.6852363130542333},
    {"wi":0.0354722132568824,  "xi":0.6852363130542333},
    {"wi":0.0338051618371416,  "xi":-0.7198818501716109},
    {"wi":0.0338051618371416,  "xi":0.7198818501716109},
    {"wi":0.0320579283548516,  "xi":-0.7528199072605319},
    {"wi":0.0320579283548516,  "xi":0.7528199072605319},
    {"wi":0.0302346570724025,  "xi":-0.7839723589433414},
    {"wi":0.0302346570724025,  "xi":0.7839723589433414},
    {"wi":0.0283396726142595,  "xi":-0.8132653151227975},
    {"wi":0.0283396726142595,  "xi":0.8132653151227975},
    {"wi":0.0263774697150547,  "xi":-0.8406292962525803},
    {"wi":0.0263774697150547,  "xi":0.8406292962525803},
    {"wi":0.0243527025687109,  "xi":-0.8659993981540928},
    {"wi":0.0243527025687109,  "xi":0.8659993981540928},
    {"wi":0.0222701738083833,  "xi":-0.8893154459951141},
    {"wi":0.0222701738083833,  "xi":0.8893154459951141},
    {"wi":0.0201348231535302,  "xi":-0.9105221370785028},
    {"wi":0.0201348231535302,  "xi":0.9105221370785028},
    {"wi":0.0179517157756973,  "xi":-0.9295691721319396},
    {"wi":0.0179517157756973,  "xi":0.9295691721319396},
    {"wi":0.0157260304760247,  "xi":-0.9464113748584028},
    {"wi":0.0157260304760247,  "xi":0.9464113748584028},
    {"wi":0.0134630478967186,  "xi":-0.9610087996520538},
    {"wi":0.0134630478967186,  "xi":0.9610087996520538},
    {"wi":0.0111681394601311,  "xi":-0.9733268277899110},
    {"wi":0.0111681394601311,  "xi":0.9733268277899110},
    {"wi":0.0088467598263639,  "xi":-0.9833362538846260},
    {"wi":0.0088467598263639,  "xi":0.9833362538846260},
    {"wi":0.0065044579689784,  "xi":-0.9910133714767443},
    {"wi":0.0065044579689784,  "xi":0.9910133714767443},
    {"wi":0.0041470332605625,  "xi":-0.9963401167719553},
    {"wi":0.0041470332605625,  "xi":0.9963401167719553},
    {"wi":0.0017832807216964,  "xi":-0.9993050417357722},
    {"wi":0.0017832807216964,  "xi":0.9993050417357722}
]

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
  Legendre: (x, n) => {
    n = n == undefined ? 1 : n
    let sum = 0
    for (let k=0;k<=n;k++){
      sum += x**k * NumCalc.nCr(n, k) * NumCalc.nCr(2*n-2*k, n) * x**(n-2*k)
    }
    return 2**n * sum
  },
  Quadrature: (f, a, b) =>{
    
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

  NIntegrate: (f, a, b) => {
    let lower = a
    let upper = b
    let integrand;

    if (a == b){
      return 0
    }
    if (b == Number.NEGATIVE_INFINITY || a == Number.POSITIVE_INFINITY) {
      return -NumCalc.NIntegrate(f, b, a)
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
        return f((b-a)/2 * x + (a+b)/2) * (b-a)/2
      }
    }
    let sum = 0
    for (let i=0;i<NumCalc_Gaussian_Wi_xi.length;i++){
      sum += NumCalc_Gaussian_Wi_xi[i].wi * integrand(NumCalc_Gaussian_Wi_xi[i].xi)
    }
    return sum
  }

}