import { Compressor } from './index';
// packs foo.js into output.png.html

let html = `<style>body {margin:0;padding:0}</style><canvas style="width:100%;height:100vh;left:0;position:absolute" id="webgl" width="1280" height="720"/><`;


Compressor.Pngify("foo.js",
"output.png.html",
html)