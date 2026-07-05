class Router {
    constructor() {
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            PATCH: [],
            DELETE: []
        };
    }

    add(method, path, ...handlers) {
        const keys = [];

        const pattern = path.replace(/:([^/]+)/g, (_, key) => {
            keys.push(key);
            return "([^/]+)";
        });

        const regex = new RegExp(`^${pattern}$`);

        this.routes[method].push({
            regex,
            keys,
            handlers
        });
    }

    get(path, ...handlers) {
        this.add("GET", path, ...handlers);
    }

    post(path, ...handlers) {
        this.add("POST", path, ...handlers);
    }

    put(path, ...handlers) {
        this.add("PUT", path, ...handlers);
    }

    patch(path, ...handlers) {
        this.add("PATCH", path, ...handlers);
    }

    delete(path, ...handlers) {
        this.add("DELETE", path, ...handlers);
    }

    match(req) {
        const routes = this.routes[req.method];

        if (!routes) return null;

        for (const route of routes) {
            const match = req.path.match(route.regex);

            if (!match) continue;

            req.params = {};

            route.keys.forEach((key, index) => {
                req.params[key] = match[index + 1];
            });

            return route.handlers;
        }

        return null;
    }
}

export default Router;