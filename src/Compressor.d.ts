import { CompressorBase } from "./CompressorBase";
export declare class Compressor extends CompressorBase {
    static Mjolnir(src: string, dest: string, map: any): Promise<any>;
    private static loadFile;
    static Pngify(src: string, dest: string, preHTML?: string, customScript?: string): Promise<any>;
}
