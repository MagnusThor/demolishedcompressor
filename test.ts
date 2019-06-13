import { Compressor } from './index';

// packs foo.js into output.png.html
Compressor.Pngify("foo.js","output.png.html",`<canvas style="width:100%;height:100vh;float:left" id="webgl"/>`);