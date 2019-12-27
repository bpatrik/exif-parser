export declare class JpegParser {
    static parseSections(stream: any, iterator: any): void;
    static getSizeFromSOFSection(stream: any): {
        height: any;
        width: any;
    };
    static getSectionName(markerType: any): {
        name: string;
        index?: number;
    };
}
