# demolishedCompressor

demolishedcompressor pack's a .js file into a PNG image with an HTML payload. When opened in a browser, the HTML extracts and executes the javascript.

## Install

    npm install demolishedcompressor

## Example


     import { Compressor } from 'demolishedcompressor';
    
    // packs foo.js into output.png.html
    
    const html = 'put html here'

    Compressor.Pngify("foo.js","output.png.html",html);


## Live example


The example below uses demolishedPlayer ( WebGL engine), demolishedSynth (DSP/Procedual audio) and procedual textures created using
demolishedTexture and GLSL Shader code and some custom markup. 

Un packed size 12173 bytes, packed result is 6235 without any major minification of code.

https://magnusthor.github.io/demolishedcompressor/output.png.html

Note , Click the canvas to start audio.

