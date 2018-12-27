(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}(function () { 'use strict';

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
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

  var markovChainChat =
  /*#__PURE__*/
  function () {
    function markovChainChat(textFile) {
      _classCallCheck(this, markovChainChat);

      this.textData = this.readAndProcess(textFile);
    }

    _createClass(markovChainChat, [{
      key: "readAndProcess",
      value: function () {
        var _readAndProcess = _asyncToGenerator(
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
                  console.log('[[markovChainChat]] data: ', data); //let result  = await processData( content )

                  return _context.abrupt("return", data);

                case 5:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function readAndProcess(_x) {
          return _readAndProcess.apply(this, arguments);
        }

        return readAndProcess;
      }()
    }]);

    return markovChainChat;
  }();

  module.exports = markovChainChat;

}));
