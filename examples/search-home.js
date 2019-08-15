const searchFilenames = require("../src/index");

const searchOpts = {
  concurrency: 6,
  rootPath: process.env.HOME,
  includeGlobs: ["*.sublime-workspace"],
  exclude: ["node_modules", ".git"]
};

const searcher = searchFilenames(searchOpts);

searcher.on("error", err => console.error("searcher error", err));
searcher.on("file", res => console.log("file match", res));

searcher.start();
