"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Compressor_1 = require("../src/Compressor");
var html = "<canvas style=\"width:100%;height:100vh;left:0;position:absolute\" id=w width=640 height=360/>\n<style>body{margin:0;background:0}</style>";
Compressor_1.Compressor.Pngify("/example/builds/demo.min.js", "/example/builds/demo.png.html", html);
