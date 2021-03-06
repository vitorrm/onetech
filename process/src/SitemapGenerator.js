"use strict";

const sm = require('sitemap');
const fs = require('fs');

const ObjectFilters = require('./ObjectFilters');

class SitemapGenerator {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  generate(objects) {
    const sitemap = sm.createSitemap({hostname: 'https://onetech.info'});

    sitemap.add({url: "/"});

    for (let filter of ObjectFilters.filters) {
      sitemap.add({url: `/?p=/filter/${filter.key}`});
    }

    for (let object of objects) {
      const path = encodeURIComponent(`${object.id}-${object.name.replace(/\W+/g, '-')}`);
      if (object.isVisible()) {
        sitemap.add({url: `/?p=/${path}`});
        if (!object.isNatural() && object.transitionsToward[0]) {
          sitemap.add({url: `/?p=/${path}/tech-tree`});
          sitemap.add({url: `/?p=/${path}/recipe`});
        }
      }
    }

    fs.writeFileSync(this.rootDir + "sitemap.xml", sitemap.toString());
  }
}

module.exports = SitemapGenerator;
