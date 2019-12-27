"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExifSectionParser_1 = require("./ExifSectionParser");
var DateUtil_1 = require("./DateUtil");
var simplify;
(function (simplify) {
    var degreeTags = [{
            section: ExifSectionParser_1.ExifSections.GPSIFD,
            type: 0x0002,
            name: 'GPSLatitude',
            refType: 0x0001,
            refName: 'GPSLatitudeRef',
            posVal: 'N'
        },
        {
            section: ExifSectionParser_1.ExifSections.GPSIFD,
            type: 0x0004,
            name: 'GPSLongitude',
            refType: 0x0003,
            refName: 'GPSLongitudeRef',
            posVal: 'E'
        }];
    var dateTags = [{
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x0132,
            name: 'ModifyDate'
        },
        {
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x9003,
            name: 'DateTimeOriginal'
        },
        {
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x9004,
            name: 'CreateDate'
        },
        {
            section: ExifSectionParser_1.ExifSections.SubIFD,
            type: 0x0132,
            name: 'ModifyDate',
        }];
    function castDegreeValues(getTagValue, setTagValue) {
        degreeTags.forEach(function (t) {
            var degreeVal = getTagValue(t);
            if (degreeVal) {
                var degreeRef = getTagValue({ section: t.section, type: t.refType, name: t.refName });
                var degreeNumRef = degreeRef === t.posVal ? 1 : -1;
                var degree = (degreeVal[0] + (degreeVal[1] / 60) + (degreeVal[2] / 3600)) * degreeNumRef;
                setTagValue(t, degree);
            }
        });
    }
    simplify.castDegreeValues = castDegreeValues;
    function castDateValues(getTagValue, setTagValue) {
        dateTags.forEach(function (t) {
            var dateStrVal = getTagValue(t);
            if (dateStrVal) {
                //some easy checks to determine two common date formats
                var timestamp = DateUtil_1.DateUtil.parseExifDate(dateStrVal);
                if (typeof timestamp !== 'undefined') {
                    setTagValue(t, timestamp);
                }
            }
        });
    }
    simplify.castDateValues = castDateValues;
    function simplifyValue(values, format) {
        if (Array.isArray(values)) {
            values = values.map(function (value) {
                if (format === 10 || format === 5) {
                    return value[0] / value[1];
                }
                return value;
            });
            if (values.length === 1) {
                values = values[0];
            }
        }
        return values;
    }
    simplify.simplifyValue = simplifyValue;
})(simplify = exports.simplify || (exports.simplify = {}));
//# sourceMappingURL=simplify.js.map