# Ode.js reactive library

Disclaimer: Please do not use this in production! Educational purposes only.

This is the third edition of the Ode.js reactive library that earlier had some templating and proxies. This edition is based on my blog about reactive javascript: [here.](https://opiispanen.com/blog/reactive-vanillajs)

The big idea is to use proxies to detect changes and register callback functions to react on those changes. No templating, just use JS DOM features.