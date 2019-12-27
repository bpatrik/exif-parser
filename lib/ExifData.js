"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JpegParser_1 = require("./JpegParser");
var OrientationTypes;
(function (OrientationTypes) {
    OrientationTypes[OrientationTypes["TOP_LEFT"] = 1] = "TOP_LEFT";
    OrientationTypes[OrientationTypes["TOP_RIGHT"] = 2] = "TOP_RIGHT";
    OrientationTypes[OrientationTypes["BOTTOM_RIGHT"] = 3] = "BOTTOM_RIGHT";
    OrientationTypes[OrientationTypes["BOTTOM_LEFT"] = 4] = "BOTTOM_LEFT";
    OrientationTypes[OrientationTypes["LEFT_TOP"] = 5] = "LEFT_TOP";
    OrientationTypes[OrientationTypes["RIGHT_TOP"] = 6] = "RIGHT_TOP";
    OrientationTypes[OrientationTypes["RIGHT_BOTTOM"] = 7] = "RIGHT_BOTTOM";
    OrientationTypes[OrientationTypes["LEFT_BOTTOM"] = 8] = "LEFT_BOTTOM";
})(OrientationTypes = exports.OrientationTypes || (exports.OrientationTypes = {}));
var ThumbnailTypes;
(function (ThumbnailTypes) {
    ThumbnailTypes[ThumbnailTypes["jpeg"] = 6] = "jpeg";
    ThumbnailTypes[ThumbnailTypes["tiff"] = 1] = "tiff";
})(ThumbnailTypes = exports.ThumbnailTypes || (exports.ThumbnailTypes = {}));
var ExifData = /** @class */ (function () {
    function ExifData(startMarker, tags, imageSize, thumbnailOffset, thumbnailLength, thumbnailType, app1Offset) {
        this.startMarker = startMarker;
        this.tags = tags;
        this.imageSize = imageSize;
        this.thumbnailOffset = thumbnailOffset;
        this.thumbnailLength = thumbnailLength;
        this.thumbnailType = thumbnailType;
        this.app1Offset = app1Offset;
    }
    ExifData.prototype.hasThumbnail = function (mime) {
        if (!this.thumbnailOffset || !this.thumbnailLength) {
            return false;
        }
        if (typeof mime !== 'string') {
            return true;
        }
        if (mime.toLowerCase().trim() === 'image/jpeg') {
            return this.thumbnailType === ThumbnailTypes.jpeg;
        }
        if (mime.toLowerCase().trim() === 'image/tiff') {
            return this.thumbnailType === ThumbnailTypes.tiff;
        }
        return false;
    };
    ExifData.prototype.getThumbnailOffset = function () {
        return this.app1Offset + 6 + this.thumbnailOffset;
    };
    ExifData.prototype.getThumbnailLength = function () {
        return this.thumbnailLength;
    };
    ExifData.prototype.getThumbnailBuffer = function () {
        return this.getThumbnailStream().nextBuffer(this.thumbnailLength);
    };
    ExifData.prototype.getThumbnailStream = function () {
        return this.startMarker.openWithOffset(this.getThumbnailOffset());
    };
    ExifData.prototype.getImageSize = function () {
        return this.imageSize;
    };
    ExifData.prototype.getThumbnailSize = function () {
        var stream = this.getThumbnailStream(), size;
        JpegParser_1.JpegParser.parseSections(stream, function (sectionType, sectionStream) {
            if (JpegParser_1.JpegParser.getSectionName(sectionType).name === 'SOF') {
                size = JpegParser_1.JpegParser.getSizeFromSOFSection(sectionStream);
            }
        });
        return size;
    };
    return ExifData;
}());
exports.ExifData = ExifData;
//# sourceMappingURL=ExifData.js.map