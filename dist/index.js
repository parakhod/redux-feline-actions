'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getReducerName = function getReducerName(s) {
  return s.replace(/([a-z])([A-Z0-9])/g, '$1_$2').toUpperCase();
};

var createActions = function createActions(actions) {
  return Object.keys(actions).reduce(function (p, name) {
    return _extends({}, p, _defineProperty({}, name, function () {
      var action = actions[name];

      var payloadData = typeof action === 'function' ? action.apply(undefined, arguments) : typeof action === 'string' || action === true ? arguments.length <= 0 ? undefined : arguments[0] : action;

      var reducerName = getReducerName(typeof action === 'string' ? action : payloadData.useReducer || name);

      var payload = {};
      var meta = {};

      if (payloadData) {
        payload = {
          payload: payloadData
        };

        if (payloadData.meta) {
          meta = {
            meta: _typeof(payloadData.meta) === 'object' ? payloadData.meta : {
              value: payloadData.meta
            }
          };
        }
      }

      return _extends({
        type: reducerName
      }, payload, meta);
    }));
  }, {});
};

exports.getReducerName = getReducerName;
exports.createActions = createActions;
exports.default = {
  getReducerName: getReducerName,
  createActions: createActions
};