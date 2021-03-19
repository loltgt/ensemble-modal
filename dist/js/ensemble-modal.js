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
  const REJECTED_TAG_NAMES = /html|head|body|meta|link|style|script/i;
  const REJECTED_TAGS = /(<(html|head|body|meta|link|style|script)*>)/i;
  const DENIED_PROPS = /attributes|classList|innerHTML|outerHTML|nodeName|nodeType/;

  class Compo {
    //private proposal
    //TODO
    // tag, name
    constructor(ns, tag, name, props) {
      if (!new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      const _ns = this._ns = '_' + ns;

      const ctag = name ? tag.toString() : 'div';

      if (REJECTED_TAG_NAMES.test(ctag)) {
        throw new Error(`ensemble.Compo error: The tag name provided (\'${ctag}\') is not a valid name.`);
      }

      const node = this[_ns] = document.createElement(ctag);
      this[_ns].__compo = this;

      if (props && typeof props == 'object') {
        for (const prop in props) {
          const cprop = prop.toString();

          if (DENIED_PROPS.test(cprop)) {
            throw new Error(`ensemble.Compo error: The property name provided (\'${cprop}\')' is not a valid name.`);
          }

          if (cprop.indexOf('on') === 0 && props[cprop]) {
            node[cprop] = props[cprop].bind(this);
          } else if (typeof props[cprop] != 'object') {
            node[cprop] = props[cprop];
          } else if (cprop === 'children') {
            if (typeof props[cprop] == 'object' && props[cprop].length) {
              for (const child of props.children) {
                const tag = child.tag;
                const name = child.name;
                const props = child.props;
                this.append(new Compo(ns, tag, name, props));
              }
            }
          }
        }
      } //TODO args coherence


      if (name != false && name != true) {
        const _name = node.className;
        node.className = ns + '-' + tag;

        if (name) {
          node.className += ' ' + ns + '-' + name;
        }

        if (_name) {
          node.className += ' ' + _name;
        }
      }
    } // return bool


    install(root, cb) {
      typeof cb === 'function' && cb.call(this, this[this._ns]);
      return !!root.appendChild(this[this._ns]);
    } // return bool


    uninstall(root, cb) {
      typeof cb === 'function' && cb.call(this, this[this._ns]);
      return !!root.removeChild(this[this._ns]);
    } // return bool


    up(pholder, cb) {
      typeof cb === 'function' && cb.call(this, this[this._ns]);
      return !!pholder.replaceWith(this[this._ns]);
    } // return bool


    append(compo) {
      const _ns = this._ns;
      return !!this[_ns].appendChild(compo[_ns]);
    } // return bool


    prepend(compo) {
      const _ns = this._ns;
      return !!this[_ns].prependChild(compo[_ns]);
    } // return bool


    remove(compo) {
      const _ns = this._ns;
      return !!this[_ns].removeChild(compo[_ns]);
    } //TODO


    replace(compo) {} //TODO


    clone(deep = false) {}

    inject(node) {
      if (node instanceof Element === false || REJECTED_TAG_NAMES.test(node.tagName) || REJECTED_TAGS.test(node.innerHTML)) {
        throw new Error('ensemble.Compo error: The remote object could not be resolved into a valid node.');
      }

      this.empty();

      this[this._ns].appendChild(node);
    }

    empty() {
      while (this.first) {
        this.remove(this.first);
      }
    }

    hasAttr(attr) {
      return this[this._ns].hasAttribute(attr);
    }

    getAttr(attr) {
      return this[this._ns].getAttribute(attr);
    } // return undef


    setAttr(attr, value) {
      this[this._ns].setAttribute(attr, value);
    } // return undef


    delAttr(attr) {
      this[this._ns].removeAttribute(attr);
    }

    getStyle(prop) {
      return window.getComputedStyle(this[this._ns])[prop];
    }

    show() {
      this[this._ns].hidden = false;
    }

    hide() {
      this[this._ns].hidden = true;
    }

    enable() {
      this[this._ns].disabled = false;
    }

    disable() {
      this[this._ns].disabled = true;
    }

    get node() {
      console.warn('ensemble.Compo', 'Direct access to the Element node is strongly discouraged.');
      return this[this._ns];
    }

    get parent() {
      const _ns = this._ns;
      return this[_ns].parentElement && '__compo' in this[_ns].parentElement ? this[_ns].parentElement.__compo : null;
    }

    get children() {
      return Array.prototype.map.call(this[this._ns].children, node => {
        return node.__compo;
      });
    }

    get first() {
      const _ns = this._ns;
      return this[_ns].firstElementChild ? this[_ns].firstElementChild.__compo : null;
    }

    get last() {
      const _ns = this._ns;
      return this[_ns].lastElementChild ? this[_ns].lastElementChild.__compo : null;
    }

    get previous() {
      const _ns = this._ns;
      return this[_ns].previousElementSibling ? this[_ns].previousElementSibling.__compo : null;
    }

    get next() {
      const _ns = this._ns;
      return this[_ns].nextElementSibling ? this[_ns].nextElementSibling.__compo : null;
    }

    get classList() {
      return this[this._ns].classList;
    }

    static isCompo(obj) {
      return Symbol.for(obj) === Symbol.for(Compo.prototype);
    } //TODO undef


    get [Symbol.toStringTag]() {
      return 'ensemble.Compo';
    }

  }
  /*!
   * loltgt ensemble.Data
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  class Data {
    constructor(ns, obj) {
      if (!new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      if (obj && typeof obj === 'object') {
        Object.assign(this, {}, obj);
      }

      const _ns = this._ns = '_' + ns;

      this[_ns] = {
        ns
      };
    }

    compo(tag, name, props, defer = false, fresh = false, stale = false) {
      const ns = this[this._ns].ns;
      let compo;

      if (defer) {
        compo = {
          ns,
          tag,
          name,
          props,
          fresh,
          stale
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

    async render(slot) {
      const _ns = this._ns;

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
    }

    async stale(slot) {
      const _ns = this._ns;

      if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].stale();
      }
    }

    async reflow(slot, force) {
      const _ns = this._ns;

      if (force) {
        this[_ns][slot] = this.compo(this[_ns][slot].params.ns, this[_ns][slot].params.name, this[_ns][slot].params.props);
      } else if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].fresh();
      }
    }

    static isData(obj) {
      return Symbol.for(obj) === Symbol.for(Data.prototype);
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Data';
    }

  }
  /*!
   * loltgt ensemble.Event
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  class Event {
    constructor(ns, name, node) {
      if (!new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      const _ns = this._ns = '_' + ns;

      node = (Compo.isCompo(node) ? node.node : node) || document;
      this[_ns] = {
        name,
        node
      };
    }

    add(handle, options = false) {
      this[this._ns].node.addEventListener(this[this._ns].name, handle, options);
    }

    remove(handle) {
      this[this._ns].node.removeEventListener(this[this._ns].name, handle);
    }

    static isEvent(obj) {
      return Symbol.for(obj) === Symbol.for(Event.prototype);
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Event';
    }

  }
  /*!
   * loltgt ensemble.base
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  class base {
    constructor() {
      if (!new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }
    }

    defaults(defaults, options) {
      const j = {};

      for (const k in defaults) {
        if (defaults[k] != null && typeof defaults[k] === 'object') {
          j[k] = Object.assign(defaults[k], options[k]);
        } else {
          j[k] = typeof options[k] != 'undefined' ? options[k] : defaults[k];
        }
      }

      return j;
    }

    compo(tag, name, props) {
      return tag ? new Compo(this.options.ns, tag, name, props) : Compo;
    }

    data(obj) {
      return obj ? new Data(this.options.ns, obj) : Data;
    }

    event(event, node, concurrency = true) {
      if (typeof event === 'string') {
        return new Event(this.options.ns, event, node);
      } else if (event) {
        event.preventDefault();
        event.target.blur();
      } else {
        return Event;
      }
    }

    selector(query, node, all = false) {
      node = node || document;
      return all ? node.querySelectorAll(query) : node.querySelector(query);
    } // return bool


    appendNode(root, node) {
      return !!root.appendChild(node);
    } // return bool


    prependNode(root, node) {
      return !!root.prependChild(node);
    } // return bool


    removeNode(root, node) {
      return !!root.removeChild(node);
    }

    cloneNode(node, deep = false) {
      return node.cloneNode(deep);
    }

    hasAttr(node, attr) {
      return node.hasAttribute(attr);
    }

    getAttr(node, attr) {
      return node.getAttribute(attr);
    } // return undef


    setAttr(node, attr, value) {
      node.setAttribute(attr, value);
    } // return undef


    delAttr(node, attr) {
      node.removeAttribute(attr);
    }

    binds(method) {
      const self = this;
      return function (e) {
        method.call(self, e, this);
      };
    }

    delay(func, node, dtime) {
      const delay = node ? this.timing(node) : 0;
      setTimeout(func, delay || dtime);
    }

    timing(node, prop = 'transitionDuration') {
      let time = Compo.isCompo(node) ? node.getStyle(prop) : window.getComputedStyle(node)[prop];

      if (time) {
        time = time.indexOf('s') ? parseFloat(time) * 1e3 : parseInt(time);
      }

      return time || 0;
    }

  }
  /*!
   * loltgt ensemble.Modal
   *
   * @version 0.0.1
   * @copyright Copyright (C) Leonardo Laureti
   * @license MIT License
   */


  class Modal extends base {
    _defaults() {
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
          innerText: '\u00D7',
          ariaLabel: 'Close'
        },
        onOpen: function () {},
        onClose: function () {},
        onShow: function () {},
        onHide: function () {},
        onContent: function () {}
      };
    }

    _bindings() {
      this.open = this.binds(this.open);
      this.close = this.binds(this.close);
      this.backx = this.binds(this.backx);
      this.keyboard = this.binds(this.keyboard);
    }

    constructor(element, options = {}) {
      super();

      this._bindings();

      this.options = this.defaults(this._defaults(), options);
      Object.freeze(this.options);
      this.element = element;
    }

    generator() {
      const opts = this.options;
      const box = this.box = this.compo('dialog', true, {
        className: opts.ns,
        hidden: true,
        ariaModal: true,
        role: 'dialog',
        onclick: opts.backClose ? this.backx : null
      });
      const cnt = this.cnt = this.compo('content');
      const close = this.compo('button', 'close', opts.close);
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

    populate(target) {
      const content = this.content(this.element);
      this.cnt.append(content);
    }

    resume(target) {
      console.log('resume', target);
    }

    content(node, clone) {
      const opts = this.options;
      const wrap = this.compo('object');
      clone = typeof clone != 'undefined' ? clone : opts.cloning;
      let inner = clone ? this.cloneNode(node, true) : node;
      opts.onContent.call(this, this, wrap, inner);

      if (inner) {
        wrap.inject(inner);
      }

      return wrap;
    } //TODO


    destroy() {
      this.box.remove();
      this.built = false;
    }

    open(e, target) {
      this.event(e);
      if (this.opened) return;
      const opts = this.options;

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

    close(e, target) {
      this.event(e);
      if (!this.opened) return;
      const opts = this.options;
      this.opened = false;
      opts.onClose.call(this, this, target, e);
      this.hide(target);

      if (opts.keyboard) {
        this.event('keydown').remove(this.keyboard);
      }

      console.log('close', this);
    }

    show(target) {
      const opts = this.options;
      const root = this.root;
      const box = this.box;
      box.install(root);
      this.delay(function () {
        box.show();
        opts.onShow.call(self, self, target);
      });
    }

    hide(target) {
      const opts = this.options;
      const root = this.root;
      const box = this.box;
      box.hide();
      this.delay(function () {
        box.uninstall(root);
        opts.onHide.call(self, self, target);
      }, box, 3e2);
    } //TODO


    backx(e) {
      this.event(e);
      if (e.target != this.box && e.target != this.cnt) return;
      this.close(e);
    }

    keyboard(e) {
      this.event(e);
      const kcode = e.keyCode || 0; // Escape

      if (kcode === 27) this.close(e);
    }

  }

  _exports.Modal = Modal;
});
//# sourceMappingURL=ensemble-modal.js.map
