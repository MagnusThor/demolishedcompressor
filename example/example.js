"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
// packs foo.min.js into output.png.html
let html = `<canvas style="width:100%;height:100vh;left:0;position:absolute" id=w width=640 height=360/>
<style>body{margin:0;background:0}</style>`;
index_1.Compressor.Pngify("/example/demo.min.js", "/example/output.png.html", html, true);