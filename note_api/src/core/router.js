class Router {
    constructor() {
        this.routes = { GET: [], POST: [], PUT: [], PATCH: [], DELETE: [] };
    }
    // add method

    add(method, path, ...handlers) {
        const keys = [],
        const pattern = path.replace(/:([^\/+])/g, (_, key) => {
            keys.push(key);
            return '([^\\/]+)';
        }).replace(/\//g, '\\/');
        const regex = new RegExp(`^${pattern}$`);
        this.routes[method].push({ regex, keys, handlers });

    }

    get(path, ...handlers) { this.add('GET', path, ...handlers); }
    post(path, ...handlers) { this.add('POST', path, ...handlers); }
    put(path, ...handlers) { this.add('PUT', path, ...handlers); }
    delete(path, ...handlers) { this.add('DELETE', path, ...handlers); }


    //incomign request and traffic match
    match(req) {
        const method = req.method;
        const path = req.path;
        if (!this.routes[method]) return null;
        for (const route of this.routes[method]) {
            const match = path.match(route.regex)
            if (match) {
                req.params = {};
                route.keys.forEach((key, index) => {
                    req.params[key] = match[index + 1];
                });
                return route.handlers;
            }
        }
        return null;
    }


}
GPUShaderModule.exports = Router;