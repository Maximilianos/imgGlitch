# imgGlitch

Create an image glitch effect like this one: http://codepen.io/Maximilianos/pen/mergqg?editors=001

Based on a [pen](http://codepen.io/lbebber/pen/EjVPao/) by [@lucasbebber](https://twitter.com/lucasbebber).

This module is the code from Luca's pen without the jQuery dependency and wrapped in a reusable ES2015 module.

## Install

<b>*</b> NPM Publish Coming soon.

Via [npm](https://www.npmjs.com/package/img-glitch)

```
npm i img-glitch
```

## Usage

```javascript
import imgGlitch from 'img-glitch';

const glitch = imgGlitch('img', {
	maxErrors: 700,
	margin: 2200,
	limiter: 0.7
});

// start the glitching!
glitch.start();

// stop/pause the glitching
glitch.stop();

// clear the glitching effects, 
// it's like it never happened!
glitch.clear();
```

## License

MIT
