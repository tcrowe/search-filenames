const path = require("path");
const isNil = require("lodash/isNil");
const isArray = require("lodash/isArray");
const searchFilenames = require("../src");
const rootPath = path.join(__dirname, "..");

describe("searchFilenames", function() {
  it("validation error", function() {
    const include = "no";
    const fails = [
      searchFilenames(),
      searchFilenames({ rootPath, include, concurrency: "five" }),
      searchFilenames({ rootPath, include, concurrency: "-1" }),
      searchFilenames({ rootPath, include, concurrency: 65 }),
      // searchFilenames({ rootPath, include, include: "no" }),
      searchFilenames({ rootPath, include, exclude: "no" }),
      searchFilenames({ rootPath, include, followSymlinks: "no" })
    ];

    fails.forEach(function(searcher) {
      let validationErrors = false;
      searcher.on("error", function(err) {
        if (
          isNil(err) === false &&
          isNil(err.validation) === false &&
          isArray(err.validation.errors) === true
        ) {
          validationErrors = true;
        }
      });
      searcher.start();
      validationErrors.should.be.true();
    });
  });

  it("include", function(done) {
    const include = ["cli.js", "search-home.js"];
    const exclude = ["node_modules"];
    const searchOpts = { rootPath, include, exclude };
    const searcher = searchFilenames(searchOpts);
    const matches = [];
    searcher.on("any", any => matches.push(any));
    searcher.on("end", function() {
      matches.should.have.length(2);
      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/examples/search-home.js`
      });
      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/src/cli.js`
      });
      done();
    });
    searcher.start();
  });

  it("includeGlobs", function(done) {
    const includeGlobs = ["*.json"];
    const exclude = ["node_modules"];
    const searchOpts = { rootPath, includeGlobs, exclude };
    const searcher = searchFilenames(searchOpts);
    const matches = [];
    searcher.on("any", any => matches.push(any));
    searcher.on("end", function() {
      matches.should.have.length(2);
      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/package.json`
      });
      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/src/opts-schema.json`
      });
      done();
    });
    searcher.start();
  });

  it("includeRegExp", function(done) {
    const includeRegExp = ["search-home", ".json$"];
    const exclude = ["node_modules"];
    const searchOpts = { rootPath, includeRegExp, exclude };
    const searcher = searchFilenames(searchOpts);
    const matches = [];
    searcher.on("any", any => matches.push(any));
    searcher.on("end", function() {
      matches.should.have.length(3);
      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/examples/search-home.js`
      });
      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/package.json`
      });

      matches.should.containEql({
        statType: "file",
        absolutePath: `${rootPath}/src/opts-schema.json`
      });
      done();
    });
    searcher.start();
  });
});
