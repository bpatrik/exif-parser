"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*jslint browser: true, devel: true, bitwise: false, debug: true, eqeq: false, es5: true, evil: false, forin: false, newcap: false, nomen: true, plusplus: true, regexp: false, unparam: false, sloppy: true, stupid: false, sub: false, todo: true, lets: true, white: true */
var simplify_1 = require("./simplify");
var JpegParser_1 = require("./JpegParser");
var ExifSectionParser_1 = require("./ExifSectionParser");
var exif_tags_1 = require("./exif-tags");
var ExifData_1 = require("./ExifData");
var ExifParser = /** @class */ (function () {
    function ExifParser(stream) {
        this.stream = stream;
        this.flags = {
            readBinaryTags: false,
            resolveTagNames: true,
            simplifyValues: true,
            imageSize: true,
            hidePointers: true,
            returnTags: true
        };
    }
    ExifParser.prototype.enableBinaryFields = function (enable) {
        this.flags.readBinaryTags = enable;
        return this;
    };
    ExifParser.prototype.enablePointers = function (enable) {
        this.flags.hidePointers = !enable;
        return this;
    };
    ExifParser.prototype.enableTagNames = function (enable) {
        this.flags.resolveTagNames = enable;
        return this;
    };
    ExifParser.prototype.enableImageSize = function (enable) {
        this.flags.imageSize = enable;
        return this;
    };
    ExifParser.prototype.enableReturnTags = function (enable) {
        this.flags.returnTags = enable;
        return this;
    };
    ExifParser.prototype.enableSimpleValues = function (enable) {
        this.flags.simplifyValues = enable;
        return this;
    };
    ExifParser.prototype.parse = function () {
        var start = this.stream.mark(), stream = start.openWithOffset(0), flags = this.flags, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset, getTagValue, setTagValue;
        if (flags.resolveTagNames) {
            tags = {};
            getTagValue = function (t) {
                return tags[t.name];
            };
            setTagValue = function (t, value) {
                tags[t.name] = value;
            };
        }
        else {
            tags = [];
            getTagValue = function (t) {
                var i;
                for (i = 0; i < tags.length; ++i) {
                    if (tags[i].type === t.type && tags[i].section === t.section) {
                        return tags.value;
                    }
                }
            };
            setTagValue = function (t, value) {
                var i;
                for (i = 0; i < tags.length; ++i) {
                    if (tags[i].type === t.type && tags[i].section === t.section) {
                        tags.value = value;
                        return;
                    }
                }
            };
        }
        JpegParser_1.JpegParser.parseSections(stream, function (sectionType, sectionStream) {
            var validExifHeaders, sectionOffset = sectionStream.offsetFrom(start);
            if (sectionType === 0xE1) {
                validExifHeaders = ExifSectionParser_1.ExifSectionParser.parseTags(sectionStream, function (ifdSection, tagType, value, format) {
                    //ignore binary fields if disabled
                    if (!flags.readBinaryTags && format === 7) {
                        return;
                    }
                    if (tagType === 0x0201) {
                        thumbnailOffset = value[0];
                        if (flags.hidePointers) {
                            return;
                        }
                    }
                    else if (tagType === 0x0202) {
                        thumbnailLength = value[0];
                        if (flags.hidePointers) {
                            return;
                        }
                    }
                    else if (tagType === 0x0103) {
                        thumbnailType = value[0];
                        if (flags.hidePointers) {
                            return;
                        }
                    }
                    //if flag is set to not store tags, return here after storing pointers
                    if (!flags.returnTags) {
                        return;
                    }
                    if (flags.simplifyValues) {
                        value = simplify_1.simplify.simplifyValue(value, format);
                    }
                    if (flags.resolveTagNames) {
                        var sectionTagNames = ifdSection === ExifSectionParser_1.ExifSections.GPSIFD ? exif_tags_1.Tags.GPS : exif_tags_1.Tags.Exif;
                        var name_1 = sectionTagNames[tagType];
                        if (!name_1) {
                            name_1 = exif_tags_1.Tags.Exif[tagType];
                        }
                        if (!tags.hasOwnProperty(name_1)) {
                            tags[name_1] = value;
                        }
                    }
                    else {
                        tags.push({
                            section: ifdSection,
                            type: tagType,
                            value: value
                        });
                    }
                });
                if (validExifHeaders) {
                    app1Offset = sectionOffset;
                }
            }
            else if (flags.imageSize && JpegParser_1.JpegParser.getSectionName(sectionType).name === 'SOF') {
                imageSize = JpegParser_1.JpegParser.getSizeFromSOFSection(sectionStream);
            }
        });
        if (flags.simplifyValues) {
            simplify_1.simplify.castDegreeValues(getTagValue, setTagValue);
            simplify_1.simplify.castDateValues(getTagValue, setTagValue);
        }
        return new ExifData_1.ExifData(start, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset);
    };
    return ExifParser;
}());
exports.ExifParser = ExifParser;
//# sourceMappingURL=ExifParser.js.map