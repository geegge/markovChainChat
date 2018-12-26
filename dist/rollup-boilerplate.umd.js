(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.makeItUpperCase = factory());
}(this, function () { 'use strict';

    function transformMessage(message) {
      return message.toUpperCase();
    }

    function makeItUpperCase(chatLogFile) {
      return transformMessage(chatLogFile);
    }

    return makeItUpperCase;

}));
