export declare enum ExifSections {
    IFD0 = 1,
    IFD1 = 2,
    GPSIFD = 3,
    SubIFD = 4,
    InteropIFD = 5
}
export declare class ExifSectionParser {
    static parseTags(stream: any, iterator: any): boolean;
    private static readExifValue;
    private static getBytesPerComponent;
    private static readExifTag;
    private static readIFDSection;
    private static readHeader;
}
