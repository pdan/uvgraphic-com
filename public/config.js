System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "babel",
  babelOptions: {
    "optional": [
      "runtime",
      "optimisation.modules.system"
    ]
  },
  paths: {
    "github:*": "packages/github/*",
    "npm:*": "packages/npm/*"
  },
  buildCSS: false,

  map: {
    "OwlFonk/OwlCarousel": "github:OwlFonk/OwlCarousel@1.3.2",
    "angular": "github:angular/bower-angular@1.4.6",
    "angular-route": "github:angular/bower-angular-route@1.4.6",
    "babel": "npm:babel-core@5.8.25",
    "babel-runtime": "npm:babel-runtime@5.8.24",
    "core-js": "npm:core-js@1.1.4",
    "css": "github:systemjs/plugin-css@0.1.18",
    "jquery": "github:components/jquery@2.1.4",
    "socket.io-client": "github:socketio/socket.io-client@1.3.7",
    "sroze/ngInfiniteScroll": "github:sroze/ngInfiniteScroll@1.2.1",
    "usablica/persian.js": "github:usablica/persian.js@0.3.0",
    "github:angular/bower-angular-route@1.4.6": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:sroze/ngInfiniteScroll@1.2.1": {
      "angular": "github:angular/bower-angular@1.4.6"
    },
    "npm:babel-runtime@5.8.24": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@1.1.4": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});
