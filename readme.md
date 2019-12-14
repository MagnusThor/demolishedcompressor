# demolishedCompressor

demolishedCompressor pack's a .js/json/text file into a PNG image with an optinal HTML payload. 

The default behavior is when a packed file opened in a browser the HTML is extracted and the javascript executes. This option (default) is designed to pack/compress 4k, 8k and 64k demos build using Javascript into one "executable".

By using the external/custom unpacker you can pack 1-n resources and take advantage of demolishedcompressor and its functionality.

## Install

    npm install demolishedcompressor

## API

### Compress/Pack ( Pngify )    

    Pngify(src: string, dest: string, preHTML?: string, useScript?: boolean): Promise<any>

### TypeScript definition 

    static Mjolnir(src: string, dest: string, map: any): Promise<any>;
    static Pngify(src: string, dest: string, preHTML?: string, useScript?: boolean): Promise<any>;
}




### Decompress/Unpack

### Create an instance of unpacker

     let instance = U.I();

### Unpack a file     

    
    instance.F("packedfile.png",  (result) => {
       
       // deal with the unpacked result
       // i.e JSON.parse, eval etc.  
      });

### TypeScript definition 
 

    declare class U {
    u(i: HTMLImageElement, cb: (result: any) => {}): void;
    F(file: string, cb: (result: any) => {}): void;
    constructor();
    static I(): U;
    }


## Examples


### How to compress a file that automatically unpacks and executes when opened

     import { Compressor } from 'demolishedcompressor';
    
    
    const html = '<p>replace this with your html</p>'

    // packs foo.js into output.png.html
    
    Compressor.Pngify("foo.js","output.png.html",html,true);



Compile and run the script 

### How to compress a file that will use external/custom unpacker


    import { Compressor } from 'demolishedcompressor';
    
    // packs /tiny/rawsong.json into tiny.png
    
    let html = ``;

    Compressor.Pngify("/tiny-efflux/rawsong.json","/tiny-efflux/tiny.png",html,false)


Compile and run the script 

## Live example's

Below you find a short description of each example as well as links that lets you se the result.

### Example 1

This example uses demolishedPlayer (WebGL & GLSL Shader rendering engine), demolishedSynth (DSP/Procedual audio) and procedual textures created using demolishedTexture and GLSL Shader code and some custom markup. 

Unpacked size 12173 bytes, packed result is 6235 without any major minification of code.

https://magnusthor.github.io/demolishedcompressor/example/builds/demo.png.html


Note , Click the canvas to start audio.


### Example 2

This example packs a song created using Efflux ( https://www.igorski.nl/application/efflux/ ) unpacks and plays the song.


https://magnusthor.github.io/demolishedcompressor/tiny-efflux/index.html


### Example 3

TBD

https://magnusthor.github.io/demolishedcompressor/example/builds/foo-mjolnir.png.html


