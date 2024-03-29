import { CompressorBase } from "./CompressorBase";
export class CompressString extends CompressorBase {
    static Pngify(src: string,preHTML?: string, customScript?: string): Promise<any> {
       
        return new Promise( (resolve: any, reject: any) => {
            let buffer = Buffer.from(src);
            this.Compress(buffer, preHTML, customScript).then( (result:Buffer) => {
                resolve(result);
            });
        }).catch(err => console.log(err));
    }
}
