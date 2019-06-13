# demolishedCompressor

demolishedcompressor pack's a .js file into a PNG image with an HTML payload when saved with an .html extension and opened in a browser, the HTML extracts and executes.

## Install

    npm install demolishedcompressor

## Example


     import { Compressor } from './index';
    // packs foo.js into output.png.html
    
    const html = 'put html here'

    Compressor.Pngify("foo.js","output.png.html",html);



