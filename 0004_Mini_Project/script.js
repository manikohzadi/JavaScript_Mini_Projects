// script.js

class Route {
  constructor(path, handler) {
    this.handler = handler;

    const { regex, paramNames } = this._pathToRegex(path);
    this.regex = regex;
    this.paramNames = paramNames;
  }

  _pathToRegex(path) {
    const parts = path.split("/").filter(Boolean);
    const paramNames = [];
    const regexParts = parts.map((part) => {
      if (part.startsWith(":")) {
        paramNames.push(part.slice(1));
        return "([^/]+)";
      }
      return part;
    });
    const regex = new RegExp("^/" + regexParts.join("/") + "$");
    return { regex, paramNames };
  }

  match(url) {
    const match = url.match(this.regex);
    if (!match) return null;

    const values = match.slice(1);
    const params = {};
    this.paramNames.forEach((name, i) => {
      params[name] = values[i];
    });
    return params;
  }
}

class RouteTable {
  constructor() {
    this.routes = [];
  }

  add(path, handler) {
    const route = new Route(path, handler);
    this.routes.push(route);
  }

  resolve(url) {
    for (const route of this.routes) {
      const params = route.match(url);
      if (params) {
        return route.handler(params);
      }
    }
    console.log("No route found for", url);
  }
}

const router = new RouteTable();

router.add("/hello", () => {
  console.log("Hello World!");
});

router.add("/users/:id", (params) => {
  console.log("User id is", params.id);
});

router.resolve("/hello");
router.resolve("/users/42");
router.resolve("/users/abc");
router.resolve("/not-found");
