class U {
    /** unpack the data packed as a PNG image using demolishedCompressor
     *
     *
     * @param {HTMLImageElement} i
     * @param {(result: any) => {}} cb
     * @memberof Unpack
     */
     u(i: HTMLImageElement, cb: (result: any) => {}) {
        let c = document.createElement("canvas");
        c.width = i.width, c.height = i.height;
        let x = c.getContext("2d") as CanvasRenderingContext2D;
        x.drawImage(i, 0, 0);
        let d = x.getImageData(0, 0, i.width, i.height).data;
        let a = new Array<string>(); let s = 10000;
        let f = String.fromCharCode; let p = a.push.bind(a)
        const l = (o: number) => {
            for (let i = o; i < o + s && i < d.length; i += 4) {
                if (d[i] + d[i + 1] + d[i + 2] > 0) {
                    p(f(d[i]));
                    p(f(d[i + 1]));
                    p(f(d[i + 2]));
                }
            }
            if (o < d.length) {
                l(o + s);
            }
            else {
                cb(a.join(""));
            }
        }
        l(0);
    }
    /**
     * Load demolshedCompressor file, unpack and call the provided callback (cb) when done.
     *
     * @static
     * @param {string} file
     * @param {(result: any) => {}} cb
     * @memberof Unpack
     */
     F(file: string, cb: (result: any) => {}) {
        let l = new Image();
        l.src = file;
        l.onload = (e: any) => {
            this.u(l, cb);
        }
    }
    constructor(){
    }
    /**
     * Get a new instance of Unpacker (U)
     *
     * @static
     * @returns {U}
     * @memberof U
     */
    static I():U{
        return new U();
    }
}