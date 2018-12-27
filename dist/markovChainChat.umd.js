(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.markovChainChat = factory());
}(this, function () { 'use strict';

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  var fs = require('fs');

  var loadDataFile = function loadDataFile(file) {
    return new Promise(function (resolve, reject) {
      fs.readFile(file, 'utf8', function (err, data) {
        if (err) reject(err);
        resolve(data);
      });
    });
  };

  var readAndProcess =
  /*#__PURE__*/
  function () {
    var _ref = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee(filePath) {
      var data;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return loadDataFile(filePath);

            case 2:
              data = _context.sent;
              console.log('data: ', data); //let result  = await processData( content )

              return _context.abrupt("return", data);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function readAndProcess(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  function markovChainChat(chatLogFile) {
    readAndProcess(chatLogFile);
  }

  return markovChainChat;

}));
