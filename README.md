# onetech

> One Hour One Life Crafting Reference

View here: https://vitorrm.github.io/onetech-2hol/

This site is built using the game data directly from [the game data repository](https://github.com/jasonrohrer/OneLifeData7).
It shows the relationships between items, and lets you explore how things are crafted.

Unlike the wiki, which contains "wisdom" about the game, this site contains only "knowledge".
This is a reference. For a better guide, go to the [game wiki](https://onehouronelife.gamepedia.com/One_Hour_One_Life_Wiki).


## Build Setup

The project is split into two parts:
- A node script that processes the latest data from the game data repository
- The site itself, built in VueJS


### Site

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


### Processing Script

The script is under the folder `process`. It will pull the latest data from the game data repository (if provided `download` as a command line argument), and then generate JSON files for the objects. It will also composite the sprites and create PNGs for each object in the game.

To get it running, you will need to install [ImageMagick](https://www.imagemagick.org/script/index.php) and [Canvas dependencies](https://github.com/Automattic/node-canvas/blob/v1.x/Readme.md#installation), and then:

``` bash
cd process

# install dependencies
npm install

# run script including downloading latest data and processing sprites
node process.js dev download

# after downloading once, you can run without the download argument
node process.js dev

# if you want to re-process the sprites
node process.js dev sprites

# remove the dev argument to process for production (before building)
node process.js
```


### Modded Support

If you have a modded version of `OneLifeData7`, consider forking this repository and setting these environment variables before processing:

``` bash
export ONETECH_MOD_NAME="My Awesome Mod"
export ONETECH_MOD_URL="https://my-awesome-mod.com"
export ONETECH_PROCESS_GIT_PATH="/path/to/my/awesome-mod-data"
# or
export ONETECH_PROCESS_GIT_URL="https://github.com/my/awesome-mod-data"
```

This will use the given name and URL in the header of each page. It will also use a separate `static-mod` directory to avoid conflicts.

After you have run the process and build scripts, and pushed the changes up to your fork, you can go to the GitHub project settings and setup GitHub Pages to use the master branch. This will make the site publicly accessible.
