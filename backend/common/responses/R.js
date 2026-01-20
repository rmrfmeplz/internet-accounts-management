class R {
    #code
    #message
    #data

    constructor(code, message, data) {
        this.#code = code
        this.#message = message
        this.#data = data
    }

    static success(data) {
        return new R(1, null, data)
    }

    static fail(message) {
        return new R(0, message, null)
    }

    static new(code, message, data) {
        return new R(code, message, data)
    }

    // noinspection JSUnusedGlobalSymbols
    toJSON() {
        return {code: this.#code, message: this.#message, data: this.#data}
    }

}

module.exports = R