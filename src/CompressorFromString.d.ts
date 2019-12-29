import { CompressorBase } from "./CompressorBase";
export declare class CompressString extends CompressorBase {
    static Pngify(src: string, dest: string, preHTML?: string, customScript?: string): Promise<any>;
}
