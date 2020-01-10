# search-filenames

It works similarly to `find` command found on some systems but with less options and potentially more speed. I've seen some other utilities doing this but this is pretty good and the source should be easy to understand if you decide to look at it.

There's no short version to any of the CLI options. If there's interest for that we can talk about it.

## Table of Contents

## Install

For using the JS API:

`npm install search-filenames`

Using globally with CLI:

`npm install --global search-filenames`

## Alias

If you want to use a shorter version I recommend creating an alias in your shell files.

```sh
alias inhere="search-filenames --root-path $PWD --exclude node_modules --exclude .git --include"

inhere "cli.js"
```

## CLI

```sh
search-filenames --root-path ~ --exclude node_modules --exclude .git --include-glob '*.sublime-workspace' --concurrency=16
```

| Option              | one or many | Description                                                         |
| ------------------- | ----------- | ------------------------------------------------------------------- |
| `--root-path`       | one         | Where to begin searching                                            |
| `--include`         | many        | The filename includes the text exactly                              |
| `--include-glob`    | many        | The filename matches the glob pattern                               |
| `--include-regexp`  | many        | The filename matches the JavaScript `RegExp` pattern                |
| `--exclude`         | many        | The filename does not include the text exactly                      |
| `--exclude-glob`    | many        | The filename does not match the glob pattern                        |
| `--exclude-regexp`  | many        | The filename does not match the JavaScript `RegExp` pattern         |
| `--follow-symlinks` | one         | Search inside where the symlink directory goes. Defaults to `false` |
| `--concurrency`     | one         | How many I/O operations can it initiate at a time? Defaults to `8`  |
| `--stat-type`       | many        | Only include these stat types in the output                         |

Stat types correspond to what information we can get from the [node fs](https://nodejs.org/dist/latest/docs/api/fs.html#fs_class_fs_dirent) `fs.stat` and `fs.lstat` functions.

-   character-device `--stat-type character-device`
-   directory `--stat-type directory`
-   fifo `--stat-type fifo`
-   file `--stat-type file`
-   symlink `--stat-type symlink`
-   socket `--stat-type socket`

## JS API

```js
const searchFilenames = require("search-filenames");

const searchOpts = {
  concurrency: 6,
  rootPath: "/Users/tcrowe/projects",
  includeGlobs: ["*.sublime-workspace"],
  exclude: ["node_modules", ".git"]
};

const searcher = searchFilenames(searchOpts);

searcher.on("error", err => console.error("searcher error", err));
searcher.on("file", res => console.log("file", res));

searcher.start();
```

Events

-   `any` ➡️ ({ statType:`string`, absolutePath:`string` }) any files matched the conditions
-   `block-device` ➡️ (absolutePath:`string`)
-   `character-device` ➡️ (absolutePath:`string`)
-   `fifo` ➡️ (absolutePath:`string`)
-   `socket` ➡️ (absolutePath:`string`)
-   `symlink` ➡️ (absolutePath:`string`)
-   `directory` ➡️ (absolutePath:`string`)
-   `file` ➡️ (absolutePath:`string`)
-   `error` ➡️ (`Error`)
-   `end`

## Development

The development tasks run under `npm run dev`

## Copying, license, and contributing

Copyright (C) Tony Crowe 2020 <https://tcrowe.github.io/contact/>

Thank you for using and contributing to make search-filenames better.

⚠️ Please run `npm run prd` before submitting a patch.

⚖️ search-filenames is Free Software protected by the GPL 3.0 license. See [./COPYING](./COPYING) for more information. (free as in freedom)
