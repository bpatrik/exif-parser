import { ExifData } from "./ExifData";
export declare class ExifParser {
    private stream;
    flags: {
        readBinaryTags: boolean;
        resolveTagNames: boolean;
        simplifyValues: boolean;
        imageSize: boolean;
        hidePointers: boolean;
        returnTags: boolean;
    };
    constructor(stream: any);
    enableBinaryFields(enable: boolean): this;
    enablePointers(enable: boolean): this;
    enableTagNames(enable: boolean): this;
    enableImageSize(enable: boolean): this;
    enableReturnTags(enable: boolean): this;
    enableSimpleValues(enable: boolean): this;
    parse(): ExifData;
}
