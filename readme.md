# demolishedCompressor

demolishedcompressor pack's a .js file into a PNG image with an HTML payload. When opened in a browser, the HTML extracts and executes the javascript.

## Install

    npm install demolishedcompressor

## Example


     import { Compressor } from 'demolishedcompressor';
    
    // packs foo.js into output.png.html
    
    const html = 'put html here'

    Compressor.Pngify("foo.js","output.png.html",html);



