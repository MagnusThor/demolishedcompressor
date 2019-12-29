import { Compressor } from "../src/Compressor";

// packs /tiny/song.js into tiny.png
let html = ``;
Compressor.Pngify("/tiny-efflux/rawsong.json","/tiny-efflux/tiny.png",html)