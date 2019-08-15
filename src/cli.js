#!/usr/bin/env node

const getopts = require("getopts");
const isNil = require("lodash/isNil");
const isArray = require("lodash/isArray");
const isString = require("lodash/isString");
const searchFilenames = require("./index");
const opts = getopts(process.argv);

const searchOpts = {
  concurrency: opts["concurrency"],
  rootPath: opts["root-path"] || process.cwd(),
  include: opts.include,
  includeGlobs: opts["include-glob"],
  includeRegExp: opts["include-regexp"],
  exclude: opts.exclude,
  excludeGlobs: opts["exclude-globs"],
  excludeRegExp: opts["exclude-regexp"],
  followSymlinks: opts["follow-symlinks"],
  statTypes: opts["stat-type"]
};

if (isString(searchOpts.include) === true) {
  searchOpts.include = [searchOpts.include];
}

if (isString(searchOpts.includeGlobs) === true) {
  searchOpts.includeGlobs = [searchOpts.includeGlobs];
}

if (isString(searchOpts.includeRegExp) === true) {
  searchOpts.includeRegExp = [searchOpts.includeRegExp];
}

if (isString(searchOpts.exclude) === true) {
  searchOpts.exclude = [searchOpts.exclude];
}

if (isString(searchOpts.excludeGlobs) === true) {
  searchOpts.excludeGlobs = [searchOpts.excludeGlobs];
}

if (isString(searchOpts.excludeRegExp) === true) {
  searchOpts.excludeRegExp = [searchOpts.excludeRegExp];
}

if (isString(searchOpts.statTypes) === true) {
  searchOpts.statTypes = [searchOpts.statTypes];
}

const format = opts.format || "text";
const searcher = searchFilenames(searchOpts);
let exitCode = 0;
// const any = [];
// const blockDevices = [];
// const characterDevices = [];
// const fifos = [];
// const sockets = [];
// const symlinks = [];
// const directories = [];
// const files = [];

searcher.on("error", function(err) {
  exitCode = 1;

  const { message, stack } = err;

  if (format === "json") {
    if (
      isNil(err.validation) === false &&
      isArray(err.validation.errors) === true
    ) {
      err.validation.errors.forEach(function(item) {
        console.error(JSON.stringify(item));
      });
    } else {
      console.error({ error: { message, stack } });
    }
  } else {
    console.error("search-filenames error");
    console.error("message", message);
    if (
      isNil(err.validation) === false &&
      isArray(err.validation.errors) === true
    ) {
      err.validation.errors.forEach(function(item) {
        console.error(item.dataPath, item.message);
      });
    } else {
      console.error("stack", stack);
    }
  }
});

function writeEmitted(emitType, res) {
  let absolutePath;

  if (isString(res) === true) {
    absolutePath = res;
  } else {
    absolutePath = res.absolutePath;
  }

  if (format === "json") {
    console.log(JSON.stringify({ type: emitType, absolutePath }));
  } else {
    console.log(absolutePath);
  }
}

// searcher.on("any", res => writeEmitted("any", res));
searcher.on("block-device", res => writeEmitted("block-device", res));
searcher.on("character-device", res => writeEmitted("character-device", res));
searcher.on("fifo", res => writeEmitted("fifo", res));
searcher.on("socket", res => writeEmitted("socket", res));
searcher.on("symlink", res => writeEmitted("symlink", res));
searcher.on("directory", res => writeEmitted("directory", res));
searcher.on("file", res => writeEmitted("file", res));

searcher.on("end", function() {
  process.exit(exitCode);
});

searcher.start();
