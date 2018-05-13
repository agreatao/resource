Object.prototype.keyValue = function(callback) {
    for(let props in this) {
        callback.call(this, props, this[props]);
    }
};
