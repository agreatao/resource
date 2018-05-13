class api {
    constructor(options) {
        this.baseURL = options.baseURL || '';
        this.params = options.params || {};
    }
    get(url, params) {
        params = Object.assign({}, this.params, params);
        return fetch(this.baseURL + url + '?' + new URLSearchParams(params).toString());
    }
    post(url, params) {
        params = Object.assign({}, this.params, params);
        return fetch(this.baseURL + url, {
            method: 'POST',
            body: new URLSearchParams(params)
        });
    }
}

export default api;