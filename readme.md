# demolishedCompressor

demolishedcompressor pack's a .js file into a PNG image with an HTML payload. When opened in a browser, the HTML extracts and executes the javascript.

## Install

    npm install demolishedcompressor

## Example


     import { Compressor } from 'demolishedcompressor';
    
    // packs foo.js into output.png.html
    
    const html = 'put html here'

    Compressor.Pngify("foo.js","output.png.html",html,true);


## Live example


### Example 1

This example uses demolishedPlayer ( WebGL engine), demolishedSynth (DSP/Procedual audio) and procedual textures created using
demolishedTexture and GLSL Shader code and some custom markup. 

Un packed size 12173 bytes, packed result is 6235 without any major minification of code.

https://magnusthor.github.io/demolishedcompressor/example/output.png.html

Note , Click the canvas to start audio.


### Example 2

TBD

https://magnusthor.github.io/demolishedcompressor/tiny-efflux/index.html




