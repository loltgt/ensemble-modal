(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.ensemble = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  'use strict';
  /*!
   * loltgt ensemble.Compo
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */
  // (function(window, module, require, ensemble) {

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Modal = void 0;

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var REJECTED_TAG_NAMES = /html|head|body|meta|link|style|script/i;
  var REJECTED_TAGS = /(<(html|head|body|meta|link|style|script)*>)/i;
  var DENIED_PROPS = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;

  var Compo = /*#__PURE__*/function () {
    //private proposal
    //TODO
    // tag, name
    function Compo(ns, tag, name, props) {
      _classCallCheck(this, Compo);

      if (!(this instanceof Compo ? this.constructor : void 0)) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      var _ns = this._ns = '_' + ns;

      var ctag = name ? tag.toString() : 'div';

      if (REJECTED_TAG_NAMES.test(ctag)) {
        throw new Error("ensemble.Compo error: The tag name provided ('".concat(ctag, "') is not a valid name."));
      }

      var node = this[_ns] = document.createElement(ctag);
      this[_ns].__compo = this;

      if (props && _typeof(props) == 'object') {
        for (var prop in props) {
          var cprop = prop.toString();

          if (DENIED_PROPS.test(cprop)) {
            throw new Error("ensemble.Compo error: The property name provided ('".concat(cprop, "')' is not a valid name."));
          }

          if (cprop.indexOf('on') === 0 && props[cprop]) {
            node[cprop] = props[cprop].bind(this);
          } else if (_typeof(props[cprop]) != 'object') {
            node[cprop] = props[cprop];
          } else if (cprop === 'children') {
            if (_typeof(props[cprop]) == 'object' && props[cprop].length) {
              var _iterator = _createForOfIteratorHelper(props.children),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var child = _step.value;
                  var _tag = child.tag;
                  var _name2 = child.name;
                  var _props = child.props;
                  this.append(new Compo(ns, _tag, _name2, _props));
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
          }
        }
      } //TODO args coherence


      if (name != false && name != true) {
        var _name = node.className;
        node.className = ns + '-' + tag;

        if (name) {
          node.className += ' ' + ns + '-' + name;
        }

        if (_name) {
          node.className += ' ' + _name;
        }
      }
    } // return bool


    _createClass(Compo, [{
      key: "install",
      value: function install(root, cb) {
        typeof cb === 'function' && cb.call(this, this[this._ns]);
        return !!root.appendChild(this[this._ns]);
      } // return bool

    }, {
      key: "uninstall",
      value: function uninstall(root, cb) {
        typeof cb === 'function' && cb.call(this, this[this._ns]);
        return !!root.removeChild(this[this._ns]);
      } // return bool

    }, {
      key: "up",
      value: function up(pholder, cb) {
        typeof cb === 'function' && cb.call(this, this[this._ns]);
        return !!pholder.replaceWith(this[this._ns]);
      } // return bool

    }, {
      key: "append",
      value: function append(compo) {
        var _ns = this._ns;
        return !!this[_ns].appendChild(compo[_ns]);
      } // return bool

    }, {
      key: "prepend",
      value: function prepend(compo) {
        var _ns = this._ns;
        return !!this[_ns].prependChild(compo[_ns]);
      } // return bool

    }, {
      key: "remove",
      value: function remove(compo) {
        var _ns = this._ns;
        return !!this[_ns].removeChild(compo[_ns]);
      } //TODO

    }, {
      key: "replace",
      value: function replace(compo) {} //TODO

    }, {
      key: "clone",
      value: function clone() {
        var deep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      }
    }, {
      key: "inject",
      value: function inject(node) {
        if (node instanceof Element === false || REJECTED_TAG_NAMES.test(node.tagName) || REJECTED_TAGS.test(node.innerHTML)) {
          throw new Error('ensemble.Compo error: The remote object could not be resolved into a valid node.');
        }

        this.empty();

        this[this._ns].appendChild(node);
      }
    }, {
      key: "empty",
      value: function empty() {
        while (this.first) {
          this.remove(this.first);
        }
      }
    }, {
      key: "hasAttr",
      value: function hasAttr(attr) {
        return this[this._ns].hasAttribute(attr);
      }
    }, {
      key: "getAttr",
      value: function getAttr(attr) {
        return this[this._ns].getAttribute(attr);
      } // return undef

    }, {
      key: "setAttr",
      value: function setAttr(attr, value) {
        this[this._ns].setAttribute(attr, value);
      } // return undef

    }, {
      key: "delAttr",
      value: function delAttr(attr) {
        this[this._ns].removeAttribute(attr);
      }
    }, {
      key: "getStyle",
      value: function getStyle(prop) {
        return window.getComputedStyle(this[this._ns])[prop];
      }
    }, {
      key: "show",
      value: function show() {
        this[this._ns].hidden = false;
      }
    }, {
      key: "hide",
      value: function hide() {
        this[this._ns].hidden = true;
      }
    }, {
      key: "enable",
      value: function enable() {
        this[this._ns].disabled = false;
      }
    }, {
      key: "disable",
      value: function disable() {
        this[this._ns].disabled = true;
      }
    }, {
      key: "node",
      get: function get() {
        console.warn('ensemble.Compo', 'Direct access to the Element node is strongly discouraged.');
        return this[this._ns];
      }
    }, {
      key: "parent",
      get: function get() {
        var _ns = this._ns;
        return this[_ns].parentElement && '__compo' in this[_ns].parentElement ? this[_ns].parentElement.__compo : null;
      }
    }, {
      key: "children",
      get: function get() {
        return Array.prototype.map.call(this[this._ns].children, function (node) {
          return node.__compo;
        });
      }
    }, {
      key: "first",
      get: function get() {
        var _ns = this._ns;
        return this[_ns].firstElementChild ? this[_ns].firstElementChild.__compo : null;
      }
    }, {
      key: "last",
      get: function get() {
        var _ns = this._ns;
        return this[_ns].lastElementChild ? this[_ns].lastElementChild.__compo : null;
      }
    }, {
      key: "previous",
      get: function get() {
        var _ns = this._ns;
        return this[_ns].previousElementSibling ? this[_ns].previousElementSibling.__compo : null;
      }
    }, {
      key: "next",
      get: function get() {
        var _ns = this._ns;
        return this[_ns].nextElementSibling ? this[_ns].nextElementSibling.__compo : null;
      }
    }, {
      key: "classList",
      get: function get() {
        return this[this._ns].classList;
      }
    }, {
      key: Symbol.toStringTag,
      get: //TODO undef
      function get() {
        return 'ensemble.Compo';
      }
    }], [{
      key: "isCompo",
      value: function isCompo(obj) {
        return Symbol.for(obj) === Symbol.for(Compo.prototype);
      }
    }]);

    return Compo;
  }();
  /*!
   * loltgt ensemble.Data
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  var Data = /*#__PURE__*/function () {
    function Data(ns, obj) {
      _classCallCheck(this, Data);

      if (!(this instanceof Data ? this.constructor : void 0)) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      if (obj && _typeof(obj) === 'object') {
        Object.assign(this, {}, obj);
      }

      var _ns = this._ns = '_' + ns;

      this[_ns] = {
        ns: ns
      };
    }

    _createClass(Data, [{
      key: "compo",
      value: function compo(tag, name, props) {
        var defer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var fresh = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
        var stale = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
        var ns = this[this._ns].ns;
        var compo;

        if (defer) {
          compo = {
            ns: ns,
            tag: tag,
            name: name,
            props: props,
            fresh: fresh,
            stale: stale
          };
        } else {
          compo = new Compo(ns, tag, name, props);
        }

        if (fresh && typeof fresh === 'function') {
          compo.fresh = props.onfresh = fresh;
        }

        if (stale && typeof stale === 'function') {
          compo.stale = props.onstale = stale;
        }

        return compo;
      }
    }, {
      key: "render",
      value: function () {
        var _render = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(slot) {
          var _ns;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _ns = this._ns;

                  if (this[_ns][slot] && this[_ns][slot].rendered) {
                    this[_ns][slot].fresh();
                  } else {
                    this[_ns][slot] = {
                      rendered: true,
                      fresh: this[slot].fresh,
                      stale: this[slot].stale,
                      params: this[slot]
                    };
                    this[slot] = new Compo(this[slot].ns, this[slot].tag, this[slot].name, this[slot].props);

                    this[_ns][slot].fresh();
                  }

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function render(_x) {
          return _render.apply(this, arguments);
        }

        return render;
      }()
    }, {
      key: "stale",
      value: function () {
        var _stale = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(slot) {
          var _ns;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _ns = this._ns;

                  if (this[_ns][slot] && this[_ns][slot].rendered) {
                    this[_ns][slot].stale();
                  }

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function stale(_x2) {
          return _stale.apply(this, arguments);
        }

        return stale;
      }()
    }, {
      key: "reflow",
      value: function () {
        var _reflow = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(slot, force) {
          var _ns;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _ns = this._ns;

                  if (force) {
                    this[_ns][slot] = this.compo(this[_ns][slot].params.ns, this[_ns][slot].params.name, this[_ns][slot].params.props);
                  } else if (this[_ns][slot] && this[_ns][slot].rendered) {
                    this[_ns][slot].fresh();
                  }

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        function reflow(_x3, _x4) {
          return _reflow.apply(this, arguments);
        }

        return reflow;
      }()
    }, {
      key: Symbol.toStringTag,
      get: function get() {
        return 'ensemble.Data';
      }
    }], [{
      key: "isData",
      value: function isData(obj) {
        return Symbol.for(obj) === Symbol.for(Data.prototype);
      }
    }]);

    return Data;
  }();
  /*!
   * loltgt ensemble.Event
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  var Event = /*#__PURE__*/function () {
    function Event(ns, name, node) {
      _classCallCheck(this, Event);

      if (!(this instanceof Event ? this.constructor : void 0)) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      var _ns = this._ns = '_' + ns;

      node = (Compo.isCompo(node) ? node.node : node) || document;
      this[_ns] = {
        name: name,
        node: node
      };
    }

    _createClass(Event, [{
      key: "add",
      value: function add(handle) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        this[this._ns].node.addEventListener(this[this._ns].name, handle, options);
      }
    }, {
      key: "remove",
      value: function remove(handle) {
        this[this._ns].node.removeEventListener(this[this._ns].name, handle);
      }
    }, {
      key: Symbol.toStringTag,
      get: function get() {
        return 'ensemble.Event';
      }
    }], [{
      key: "isEvent",
      value: function isEvent(obj) {
        return Symbol.for(obj) === Symbol.for(Event.prototype);
      }
    }]);

    return Event;
  }();
  /*!
   * loltgt ensemble.base
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  var base = /*#__PURE__*/function () {
    function base() {
      _classCallCheck(this, base);

      if (!(this instanceof base ? this.constructor : void 0)) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }
    }

    _createClass(base, [{
      key: "defaults",
      value: function defaults(_defaults, options) {
        var j = {};

        for (var k in _defaults) {
          if (_defaults[k] != null && _typeof(_defaults[k]) === 'object') {
            j[k] = Object.assign(_defaults[k], options[k]);
          } else {
            j[k] = typeof options[k] != 'undefined' ? options[k] : _defaults[k];
          }
        }

        return j;
      }
    }, {
      key: "compo",
      value: function compo(tag, name, props) {
        return tag ? new Compo(this.options.ns, tag, name, props) : Compo;
      }
    }, {
      key: "data",
      value: function data(obj) {
        return obj ? new Data(this.options.ns, obj) : Data;
      }
    }, {
      key: "event",
      value: function event(_event, node) {
        var concurrency = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

        if (typeof _event === 'string') {
          return new Event(this.options.ns, _event, node);
        } else if (_event) {
          _event.preventDefault();

          _event.target.blur();
        } else {
          return Event;
        }
      }
    }, {
      key: "selector",
      value: function selector(query, node) {
        var all = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        node = node || document;
        return all ? node.querySelectorAll(query) : node.querySelector(query);
      } // return bool

    }, {
      key: "appendNode",
      value: function appendNode(root, node) {
        return !!root.appendChild(node);
      } // return bool

    }, {
      key: "prependNode",
      value: function prependNode(root, node) {
        return !!root.prependChild(node);
      } // return bool

    }, {
      key: "removeNode",
      value: function removeNode(root, node) {
        return !!root.removeChild(node);
      }
    }, {
      key: "cloneNode",
      value: function cloneNode(node) {
        var deep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        return node.cloneNode(deep);
      }
    }, {
      key: "hasAttr",
      value: function hasAttr(node, attr) {
        return node.hasAttribute(attr);
      }
    }, {
      key: "getAttr",
      value: function getAttr(node, attr) {
        return node.getAttribute(attr);
      } // return undef

    }, {
      key: "setAttr",
      value: function setAttr(node, attr, value) {
        node.setAttribute(attr, value);
      } // return undef

    }, {
      key: "delAttr",
      value: function delAttr(node, attr) {
        node.removeAttribute(attr);
      }
    }, {
      key: "binds",
      value: function binds(method) {
        var self = this;
        return function (e) {
          method.call(self, e, this);
        };
      }
    }, {
      key: "delay",
      value: function delay(func, node, dtime) {
        var delay = node ? this.timing(node) : 0;
        setTimeout(func, delay || dtime);
      }
    }, {
      key: "timing",
      value: function timing(node) {
        var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'transitionDuration';
        var time = Compo.isCompo(node) ? node.getStyle(prop) : window.getComputedStyle(node)[prop];

        if (time) {
          time = time.indexOf('s') ? parseFloat(time) * 1e3 : parseInt(time);
        }

        return time || 0;
      }
    }]);

    return base;
  }();
  /*!
   * loltgt ensemble.Modal
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  var Modal = /*#__PURE__*/function (_base) {
    _inherits(Modal, _base);

    var _super = _createSuper(Modal);

    function Modal(element) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, Modal);

      _this = _super.call(this);

      _this._bindings();

      _this.options = _this.defaults(_this._defaults(), options);
      Object.freeze(_this.options);
      _this.element = element;
      return _this;
    }

    _createClass(Modal, [{
      key: "_defaults",
      value: function _defaults() {
        return {
          ns: 'modal',
          root: 'body',
          fx: true,
          windowed: false,
          cloning: true,
          backClose: false,
          keyboard: true,
          close: {
            onclick: this.close,
            innerText: "\xD7",
            ariaLabel: 'Close'
          },
          onOpen: function onOpen() {},
          onClose: function onClose() {},
          onShow: function onShow() {},
          onHide: function onHide() {},
          onContent: function onContent() {}
        };
      }
    }, {
      key: "_bindings",
      value: function _bindings() {
        this.open = this.binds(this.open);
        this.close = this.binds(this.close);
        this.backx = this.binds(this.backx);
        this.keyboard = this.binds(this.keyboard);
      }
    }, {
      key: "generator",
      value: function generator() {
        var opts = this.options;
        var box = this.box = this.compo('dialog', true, {
          className: opts.ns,
          hidden: true,
          ariaModal: true,
          role: 'dialog',
          onclick: opts.backClose ? this.backx : null
        });
        var cnt = this.cnt = this.compo('content');
        var close = this.compo('button', 'close', opts.close);
        box.append(cnt);

        if (opts.windowed) {
          box.classList.add(opts.ns + '-windowed');
          cnt.append(close);
        } else {
          box.append(close);
        }

        if (opts.fx) {
          box.classList.add(opts.ns + '-fx');
        }

        this.root = this.selector(opts.root);
        this.built = true;
        return box;
      }
    }, {
      key: "populate",
      value: function populate(target) {
        var content = this.content(this.element);
        this.cnt.append(content);
      }
    }, {
      key: "resume",
      value: function resume(target) {
        console.log('resume', target);
      }
    }, {
      key: "content",
      value: function content(node, clone) {
        var opts = this.options;
        var wrap = this.compo('object');
        clone = typeof clone != 'undefined' ? clone : opts.cloning;
        var inner = clone ? this.cloneNode(node, true) : node;
        opts.onContent.call(this, this, wrap, inner);

        if (inner) {
          wrap.inject(inner);
        }

        return wrap;
      } //TODO

    }, {
      key: "destroy",
      value: function destroy() {
        this.box.remove();
        this.built = false;
      }
    }, {
      key: "open",
      value: function open(e, target) {
        this.event(e);
        if (this.opened) return;
        var opts = this.options;

        if (this.built) {
          this.resume(target);
        } else {
          this.generator();
          this.populate(target);
        }

        this.opened = true;
        opts.onOpen.call(this, this, target, e);
        this.show(target);

        if (opts.keyboard) {
          this.event('keydown').add(this.keyboard);
        }

        console.log('open', this);
      }
    }, {
      key: "close",
      value: function close(e, target) {
        this.event(e);
        if (!this.opened) return;
        var opts = this.options;
        this.opened = false;
        opts.onClose.call(this, this, target, e);
        this.hide(target);

        if (opts.keyboard) {
          this.event('keydown').remove(this.keyboard);
        }

        console.log('close', this);
      }
    }, {
      key: "show",
      value: function show(target) {
        var opts = this.options;
        var root = this.root;
        var box = this.box;
        box.install(root);
        this.delay(function () {
          box.show();
          opts.onShow.call(self, self, target);
        });
      }
    }, {
      key: "hide",
      value: function hide(target) {
        var opts = this.options;
        var root = this.root;
        var box = this.box;
        box.hide();
        this.delay(function () {
          box.uninstall(root);
          opts.onHide.call(self, self, target);
        }, box, 3e2);
      } //TODO

    }, {
      key: "backx",
      value: function backx(e) {
        this.event(e);
        if (e.target != this.box && e.target != this.cnt) return;
        this.close(e);
      }
    }, {
      key: "keyboard",
      value: function keyboard(e) {
        this.event(e);
        var kcode = e.keyCode || 0; // Escape

        if (kcode === 27) this.close(e);
      }
    }]);

    return Modal;
  }(base);

  _exports.Modal = Modal;
});
//# sourceMappingURL=ensemble-modal-compat.js.map
