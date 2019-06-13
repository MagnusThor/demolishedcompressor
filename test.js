"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
// packs foo.js into output.png.html
index_1.Compressor.Pngify("foo.js", "output.png.html", `<style>body {margin:0;padding:0}</style><canvas style="width:100%;height:100vh;left:0;position:absolute" id="webgl"/><`);
