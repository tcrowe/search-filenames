const fs = require("fs");
const path = require("path");
const { EventEmitter } = require("events");
const queue = require("async/queue");
const micromatch = require("micromatch");
const isNil = require("lodash/isNil");
const isArray = require("lodash/isArray");
const isRegExp = require("lodash/isRegExp");
const optsValidator = require("./opts-validator");

/**
 * Create a file searcher which emits filenames that match
 * @method searchFilenames
 * @param {object} opts see ./opts-schema.json for the options
 * @returns {object} event emitter
 */
function searchFilenames(opts) {
  const emitter = new EventEmitter();
  let listStatQueue;

  function end(err) {
    if (isNil(err) === false) {
      emitter.emit("error", err);
    }

    if (isNil(listStatQueue) === false) {
      listStatQueue.kill();
    }

    emitter.emit("end");
  }

  function validateOpts() {
    const valid = optsValidator(opts);

    if (valid === false) {
      const { errors } = optsValidator;
      const err = new Error("Validation error");
      err.validation = { errors };
      end(err);
      return false;
    }

    return true;
  }

  function startList() {
    const {
      concurrency,
      rootPath,
      include = [],
      includeGlobs = [],
      exclude = [],
      excludeGlobs = [],
      followSymlinks = false,
      statTypes = []
    } = opts;

    let { includeRegExp, excludeRegExp } = opts;

    const rootResolvedPath = path.resolve(rootPath);

    let includeGlobsMatcher;
    let excludeGlobsMatcher;

    if (isArray(includeGlobs) === true && includeGlobs.length > 0) {
      includeGlobsMatcher = micromatch.matcher(includeGlobs);
    }

    if (isArray(excludeGlobs) === true && excludeGlobs.length > 0) {
      excludeGlobsMatcher = micromatch.matcher(excludeGlobs);
    }

    if (isArray(includeRegExp) === true && includeRegExp.length > 0) {
      includeRegExp = includeRegExp.map(function(item) {
        if (isRegExp(item) === false) {
          return new RegExp(item, "gi");
        }

        return item;
      });
    }

    if (isArray(excludeRegExp) === true && excludeRegExp.length > 0) {
      excludeRegExp = excludeRegExp.map(function(item) {
        if (isRegExp(item) === false) {
          return new RegExp(item, "gi");
        }

        return item;
      });
    }

    function pathExcluded(absolutePath) {
      const basename = path.basename(absolutePath);

      const stringFound = exclude.some(function(item) {
        return (
          absolutePath.includes(item) === true ||
          basename.includes(item) === true
        );
      });

      if (stringFound === true) {
        return true;
      }

      // glob / micromatch
      if (
        excludeGlobsMatcher !== undefined &&
        (excludeGlobsMatcher(absolutePath) === true ||
          excludeGlobsMatcher(basename) === true)
      ) {
        return true;
      }

      // reg exp
      if (excludeRegExp !== undefined && excludeRegExp.length > 0) {
        return excludeRegExp.some(function(item) {
          return (
            item.test(absolutePath) === true || item.test(basename) === true
          );
        });
      }

      return false;
    }

    function pathIncluded(absolutePath) {
      const basename = path.basename(absolutePath);

      const stringMatch = include.some(function(item) {
        return (
          absolutePath.includes(item) === true ||
          basename.includes(item) === true
        );
      });

      if (stringMatch === true) {
        return true;
      }

      if (
        includeGlobsMatcher !== undefined &&
        (includeGlobsMatcher(absolutePath) === true ||
          includeGlobsMatcher(basename) === true)
      ) {
        return true;
      }

      if (includeRegExp !== undefined && includeRegExp.length > 0) {
        return includeRegExp.some(function(item) {
          return (
            item.test(absolutePath) === true || item.test(basename) === true
          );
        });
      }

      return false;
    }

    function processFileList({ absolutePath, filenameList }) {
      if (filenameList.length === 0) {
        return;
      }

      if (pathExcluded(absolutePath) === true) {
        return;
      }

      filenameList
        .map(function(filename) {
          const operation = "stat";
          return {
            operation,
            absolutePath: path.join(absolutePath, filename)
          };
        })
        .filter(function(item) {
          if (pathExcluded(item.absolutePath) === true) {
            return false;
          }
          return true;
        })
        .forEach(function(item) {
          listStatQueue.push(item);
        });
    }

    function emitType(typeName) {
      return statTypes.length === 0 || statTypes.includes(typeName) === true;
    }

    function processStat({ lstat, stat, absolutePath }) {
      const isSymbolicLink = lstat.isSymbolicLink();
      const isDirectory = stat.isDirectory();
      const isBlockDevice = stat.isBlockDevice();
      const isCharacterDevice = stat.isCharacterDevice();
      const isFIFO = stat.isFIFO();
      const isSocket = stat.isSocket();
      const isFile = stat.isFile();
      const operation = "list";

      const match = pathIncluded(absolutePath);

      if (isDirectory === true) {
        if (isSymbolicLink === false) {
          listStatQueue.push({ operation, absolutePath });
        } else if (isSymbolicLink === true && followSymlinks === true) {
          listStatQueue.push({ operation, absolutePath });
        }

        if (
          match === true &&
          (emitType("directory") === true || emitType("symlink") === true)
        ) {
          emitter.emit("any", {
            statType: "directory",
            absolutePath,
            isSymbolicLink
          });
        }

        if (
          match === true &&
          isSymbolicLink === true &&
          emitType("symlink") === true
        ) {
          emitter.emit("symlink", absolutePath);
        }

        if (match === true && emitType("directory") === true) {
          emitter.emit("directory", absolutePath);
        }

        return;
      }

      if (
        match === true &&
        isBlockDevice === true &&
        emitType("block-device") === true
      ) {
        emitter.emit("any", { statType: "block-device", absolutePath });
        emitter.emit("block-device", absolutePath);
        return;
      }

      if (
        match === true &&
        isCharacterDevice === true &&
        emitType("character-device") === true
      ) {
        emitter.emit("any", { statType: "chracter-device", absolutePath });
        emitter.emit("chracter-device", absolutePath);
        return;
      }

      if (match === true && isFIFO === true && emitType("fifo") === true) {
        emitter.emit("any", { statType: "fifo", absolutePath });
        emitter.emit("fifo", absolutePath);
        return;
      }

      if (match === true && isSocket === true && emitType("socket") === true) {
        emitter.emit("any", { statType: "socket", absolutePath });
        emitter.emit("socket", absolutePath);
        return;
      }

      if (match === true && isFile === true && emitType("file") === true) {
        emitter.emit("any", { statType: "file", absolutePath });
        emitter.emit("file", absolutePath);
        return;
      }
    }

    function worker({ operation, absolutePath }, done) {
      if (pathExcluded(absolutePath) === true) {
        return false;
      }

      if (operation === "list") {
        fs.readdir(absolutePath, function(err, filenameList) {
          if (isNil(err) === false) {
            return done(err);
          }

          processFileList({ absolutePath, filenameList });
          done();
        });
      } else if (operation === "stat") {
        fs.lstat(absolutePath, function(err, lstat) {
          if (isNil(err) === false) {
            console.log("lstat error", absolutePath, err);
            return done(err);
          }

          fs.stat(absolutePath, function(err, stat) {
            if (isNil(err) === false) {
              if (lstat.isSymbolicLink() === true && err.code === "ENOENT") {
                /*

                this is when there is a symlink that exists but the place
                it points to doesn't exist

                */
                return done();
              }

              return done(err);
            }

            processStat({ lstat, stat, absolutePath });
            done();
          });
        });
      } else {
        throw new Error("unknown operation");
      }
    }

    listStatQueue = queue(worker, concurrency);
    listStatQueue.error(end);

    fs.exists(rootResolvedPath, function(exists) {
      if (exists === false) {
        const err = new Error(`rootPath doesn't exist: ${rootPath}`);
        return end(err);
      }

      const operation = "list";
      const absolutePath = rootResolvedPath;
      listStatQueue.push({ operation, absolutePath });
    });
  }

  emitter.start = function() {
    const valid = validateOpts();

    if (valid === false) {
      return;
    }

    startList();
    listStatQueue.drain(end);
  };

  return emitter;
}

module.exports = searchFilenames;
