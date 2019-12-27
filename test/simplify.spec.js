"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simplify_1 = require("../lib/simplify");
var assert = require("assert");
describe('simplify', function () {
    it('should castDateValues', function () {
        var values = {
            'DateTimeOriginal': '1970:01:01 00:00:00',
            'CreateDate': '1970-01-01T00:00:00-05:00',
            'ModifyDate': '1970-01-01T00:00:00-05:00'
        };
        var setValues = {};
        function getTagValue(tag) {
            return values[tag.name];
        }
        function setTagValue(tag, value) {
            setValues[tag.name] = value;
        }
        simplify_1.simplify.castDateValues(getTagValue, setTagValue);
        assert.strictEqual(Object.keys(setValues).length, 3);
        assert.strictEqual(setValues.DateTimeOriginal, 0);
        assert.strictEqual(setValues.CreateDate, 5 * 3600);
        assert.strictEqual(setValues.ModifyDate, 5 * 3600);
    });
});
//# sourceMappingURL=simplify.spec.js.map