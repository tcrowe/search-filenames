'use strict';
var equal = require('ajv/lib/compile/equal');
var validate = (function() {
  var refVal = [];
  return function validate(data, dataPath, parentData, parentDataProperty, rootData) {
    'use strict';
    var vErrors = null;
    var errors = 0;
    if ((data && typeof data === "object" && !Array.isArray(data))) {
      if (data.concurrency === undefined) data.concurrency = 8;
      if (data.followSymlinks === undefined) data.followSymlinks = false;
      var errs__0 = errors;
      var valid1 = true;
      var data1 = data.concurrency;
      var errs_1 = errors;
      if (typeof data1 !== "number") {
        var dataType1 = typeof data1;
        var coerced1 = undefined;
        if (dataType1 == 'boolean' || data1 === null || (dataType1 == 'string' && data1 && data1 == +data1)) coerced1 = +data1;
        if (coerced1 === undefined) {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.concurrency',
            schemaPath: '#/properties/concurrency/type',
            params: {
              type: 'number'
            },
            message: 'should be number'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        } else {
          data1 = coerced1;
          data['concurrency'] = coerced1;
        }
      }
      if (typeof data1 === "number") {
        if (data1 > 64 || data1 !== data1) {
          var err = {
            keyword: 'maximum',
            dataPath: (dataPath || '') + '.concurrency',
            schemaPath: '#/properties/concurrency/maximum',
            params: {
              comparison: '<=',
              limit: 64,
              exclusive: false
            },
            message: 'should be <= 64'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        if (data1 < 1 || data1 !== data1) {
          var err = {
            keyword: 'minimum',
            dataPath: (dataPath || '') + '.concurrency',
            schemaPath: '#/properties/concurrency/minimum',
            params: {
              comparison: '>=',
              limit: 1,
              exclusive: false
            },
            message: 'should be >= 1'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
      }
      var valid1 = errors === errs_1;
      var data1 = data.rootPath;
      if (data1 === undefined) {
        valid1 = false;
        var err = {
          keyword: 'required',
          dataPath: (dataPath || '') + "",
          schemaPath: '#/required',
          params: {
            missingProperty: 'rootPath'
          },
          message: 'should have required property \'rootPath\''
        };
        if (vErrors === null) vErrors = [err];
        else vErrors.push(err);
        errors++;
      } else {
        var errs_1 = errors;
        if (typeof data1 !== "string") {
          var dataType1 = typeof data1;
          var coerced1 = undefined;
          if (dataType1 == 'number' || dataType1 == 'boolean') coerced1 = '' + data1;
          else if (data1 === null) coerced1 = '';
          if (coerced1 === undefined) {
            var err = {
              keyword: 'type',
              dataPath: (dataPath || '') + '.rootPath',
              schemaPath: '#/properties/rootPath/type',
              params: {
                type: 'string'
              },
              message: 'should be string'
            };
            if (vErrors === null) vErrors = [err];
            else vErrors.push(err);
            errors++;
          } else {
            data1 = coerced1;
            data['rootPath'] = coerced1;
          }
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.include;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.include[' + i1 + ']',
                  schemaPath: '#/properties/include/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.include',
            schemaPath: '#/properties/include/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.includeGlobs;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.includeGlobs[' + i1 + ']',
                  schemaPath: '#/properties/includeGlobs/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.includeGlobs',
            schemaPath: '#/properties/includeGlobs/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.includeRegExp;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.includeRegExp[' + i1 + ']',
                  schemaPath: '#/properties/includeRegExp/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.includeRegExp',
            schemaPath: '#/properties/includeRegExp/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.exclude;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.exclude[' + i1 + ']',
                  schemaPath: '#/properties/exclude/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.exclude',
            schemaPath: '#/properties/exclude/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.excludeGlobs;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.excludeGlobs[' + i1 + ']',
                  schemaPath: '#/properties/excludeGlobs/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.excludeGlobs',
            schemaPath: '#/properties/excludeGlobs/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.excludeRegExp;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.excludeRegExp[' + i1 + ']',
                  schemaPath: '#/properties/excludeRegExp/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.excludeRegExp',
            schemaPath: '#/properties/excludeRegExp/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
      var data1 = data.followSymlinks;
      var errs_1 = errors;
      if (typeof data1 !== "boolean") {
        var dataType1 = typeof data1;
        var coerced1 = undefined;
        if (data1 === 'false' || data1 === 0 || data1 === null) coerced1 = false;
        else if (data1 === 'true' || data1 === 1) coerced1 = true;
        if (coerced1 === undefined) {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.followSymlinks',
            schemaPath: '#/properties/followSymlinks/type',
            params: {
              type: 'boolean'
            },
            message: 'should be boolean'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        } else {
          data1 = coerced1;
          data['followSymlinks'] = coerced1;
        }
      }
      var valid1 = errors === errs_1;
      var data1 = data.statTypes;
      if (data1 !== undefined) {
        var errs_1 = errors;
        if (Array.isArray(data1)) {
          var errs__1 = errors;
          var valid1;
          for (var i1 = 0; i1 < data1.length; i1++) {
            var data2 = data1[i1];
            var errs_2 = errors;
            if (typeof data2 !== "string") {
              var dataType2 = typeof data2;
              var coerced2 = undefined;
              if (dataType2 == 'number' || dataType2 == 'boolean') coerced2 = '' + data2;
              else if (data2 === null) coerced2 = '';
              if (coerced2 === undefined) {
                var err = {
                  keyword: 'type',
                  dataPath: (dataPath || '') + '.statTypes[' + i1 + ']',
                  schemaPath: '#/properties/statTypes/items/type',
                  params: {
                    type: 'string'
                  },
                  message: 'should be string'
                };
                if (vErrors === null) vErrors = [err];
                else vErrors.push(err);
                errors++;
              } else {
                data2 = coerced2;
                data1[i1] = coerced2;
              }
            }
            var schema2 = validate.schema.properties.statTypes.items.enum;
            var valid2;
            valid2 = false;
            for (var i2 = 0; i2 < schema2.length; i2++)
              if (equal(data2, schema2[i2])) {
                valid2 = true;
                break;
              } if (!valid2) {
              var err = {
                keyword: 'enum',
                dataPath: (dataPath || '') + '.statTypes[' + i1 + ']',
                schemaPath: '#/properties/statTypes/items/enum',
                params: {
                  allowedValues: schema2
                },
                message: 'should be equal to one of the allowed values'
              };
              if (vErrors === null) vErrors = [err];
              else vErrors.push(err);
              errors++;
            }
            var valid2 = errors === errs_2;
          }
        } else {
          var err = {
            keyword: 'type',
            dataPath: (dataPath || '') + '.statTypes',
            schemaPath: '#/properties/statTypes/type',
            params: {
              type: 'array'
            },
            message: 'should be array'
          };
          if (vErrors === null) vErrors = [err];
          else vErrors.push(err);
          errors++;
        }
        var valid1 = errors === errs_1;
      }
    } else {
      var err = {
        keyword: 'type',
        dataPath: (dataPath || '') + "",
        schemaPath: '#/type',
        params: {
          type: 'object'
        },
        message: 'should be object'
      };
      if (vErrors === null) vErrors = [err];
      else vErrors.push(err);
      errors++;
    }
    validate.errors = vErrors;
    return errors === 0;
  };
})();
validate.schema = {
  "type": "object",
  "required": ["rootPath"],
  "properties": {
    "concurrency": {
      "type": "number",
      "minimum": 1,
      "maximum": 64,
      "default": 8,
      "description": "How many IO operations can be done simultaenously"
    },
    "rootPath": {
      "type": "string"
    },
    "include": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "includeGlobs": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "includeRegExp": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "exclude": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "excludeGlobs": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "excludeRegExp": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "followSymlinks": {
      "type": "boolean",
      "default": false
    },
    "statTypes": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": ["block-device", "character-device", "directory", "fifo", "file", "symlink", "socket"]
      }
    }
  }
};
validate.errors = null;
module.exports = validate;