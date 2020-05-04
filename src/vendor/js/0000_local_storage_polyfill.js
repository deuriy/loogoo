// localStorage polyfill for IOS private mode
(function() {
    try {
        localStorage.setItem('_storage_test', 'test');
        localStorage.removeItem('_storage_test');
    } catch (exc) {
        var tmp_storage = {};
        var p = '__websiteStorage__';
        Storage.prototype.setItem = function(k, v) {
            tmp_storage[p + k] = v;
        };
        Storage.prototype.getItem = function(k) {
            return tmp_storage[p + k] === undefined ? null : tmp_storage[p + k];
        };
        Storage.prototype.removeItem = function(k) {
            delete tmp_storage[p + k];
        };
        Storage.prototype.clear = function() {
            tmp_storage = {};
        };
    }
})();