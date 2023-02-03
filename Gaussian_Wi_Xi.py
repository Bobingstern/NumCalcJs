import numpy as np
from scipy.special import roots_legendre, eval_legendre
roots, weights = roots_legendre(300)

print(roots)
print(weights)

a = []
for i in range(len(roots)):
    a.append({"wi":weights[i], "xi":roots[i]})
print(a)