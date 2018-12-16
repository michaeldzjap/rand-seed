![NPM Version](https://img.shields.io/npm/v/rand-seed.svg?branch=master)
![downloads](https://img.shields.io/npm/dt/rand-seed.svg)
[![Build Status](https://travis-ci.org/michaeldzjap/waveplayer.js.svg?branch=master)](https://travis-ci.org/michaeldzjap/waveplayer.js) ![dependencies](https://img.shields.io/david/michaeldzjap/waveplayer.js.svg)
![dev dependencies](https://img.shields.io/david/dev/michaeldzjap/waveplayer.js.svg)
[![License](https://img.shields.io/npm/l/react-signature-pad-wrapper.svg)](https://github.com/michaeldzjap/waveplayer.js/blob/master/LICENSE)

# rand-seed
A small seedable random number generator library written in TypeScript

The default `Math.random()` function doesn't allow for setting a seed. This library offers a number of different semi-random number generators which may be initialised with an arbitrary seed in string format, hence, making it possible to produce sequences of semi-random numbers that are always the same for a given seed. The implemented algorithms are detailed [here](https://stackoverflow.com/a/47593316/7024747).

## Installation
This package is available through _npm_:

```
npm install --save rand-seed
```

## Usage
Either import directly

```html
<script src="path-to-rand-seed/rand-seed.js"></script>
```

or import in your own scripts using

```javascript
import {Rand, PRNG} from 'rand-seed';
```

Then simply create a new instance with an (optional) seed:

```javascript
const rand = new Rand('1234');

rand.next(); // Generate a new random number
```

If no seed is specified the call to `rand.next()` will simply be forwarded to `Math.random()`. In case of a supplied seed, the _sfc32_ algorithm will be used by default. Currently, three different algorithms are provided: _sfc32_, _mulberry32_ and _xoshiro128**_. If you would like to use a different algorithm, create a new instance like so:

```javascript
// Create a new random number generator using the xoshiro128** algorithm
const rand = new Rand('1234', PRNG.xoshiro128ss);
```

## Example
A simple example is included. This may be run with _node_: `node example/index.js`
