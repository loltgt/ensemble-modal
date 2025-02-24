/*!
 * ensemble Modal
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble-modal
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */
(function (exports) {
  'use strict';

  


  
  class locale {

    
    constructor(lang) {
      if (typeof locale[lang] == 'object') {
        return locale[lang];
      } else {
        return locale[0];
      }
    }

    
    static defaults() {
      return Object.fromEntries(['ETAGN', 'EPROP', 'EMTAG', 'EOPTS', 'EELEM', 'EMETH', 'DOM'].map(a => [a, a]));
    }
  }
  
  const l10n = locale.defaults();

  



  const REJECTED_TAGS$1 = 'html|head|body|meta|link|style|script';


  
  class part {

    
    render() {
      delete this.element;
      delete this.render;
    }

    
    bind(root, cb) {
      const el = this[this.ns];
      typeof cb == 'function' && cb.call(this, el);
      return !! root.appendChild(el);
    }

    
    unbind(root, cb) {
      const el = this[this.ns];
      typeof cb == 'function' && cb.call(this, el);
      return !! root.removeChild(el);
    }

    
    place(node, cb) {
      const el = this[this.ns];
      typeof cb == 'function' && cb.call(this, el);
      return !! node.replaceWith(el);
    }

    
    append(compo) {
      const ns = this.ns, el = this[ns];
      return !! el.appendChild(compo[ns]);
    }

    
    prepend(compo) {
      const ns = this.ns, el = this[ns];
      return !! el.prependChild(compo[ns]);
    }

    
    remove(compo) {
      const ns = this.ns, el = this[ns];
      return !! el.removeChild(compo[ns]);
    }

    
    fill(node) {
      if (! node instanceof Element || RegExp(REJECTED_TAGS$1, 'i').test(node.tagName) || RegExp(`(<(${REJECTED_TAGS$1})*>)`, 'i').test(node.innerHTML)) {
        throw new Error(l10n.EMTAG);
      }

      this.empty();

      return !! this[this.ns].appendChild(node);
    }

    
    empty() {
      while (this.first) {
        this.remove(this.first);
      }
    }

    
    get children() {
      return Array.prototype.map.call(this[this.ns].children, (node) => { return node._1; });
    }

    
    get first() {
      const el = this[this.ns];
      return el.firstElementChild ? el.firstElementChild._1 : null;
    }

    
    get last() {
      const el = this[this.ns];
      return el.lastElementChild ? el.lastElementChild._1 : null;
    }

  }

  



  const REJECTED_TAGS = 'html|head|body|meta|link|style|script';
  const DENIED_PROPS ='attributes|classList|innerHTML|outerHTML|nodeName|nodeType';


  
  class Compo extends part {

    
    constructor(ns, tag, name, props, options, elementNS) {
      super();

      const ns0 = this.ns = `_${ns}`;
      const tagName = tag ? tag.toString() : 'div';

      if (RegExp(REJECTED_TAGS, 'i').test(tagName)) {
        throw new Error(l10n.ETAGN);
      }

      const el = this[ns0] = this.element(ns, tagName, name, props, options, elementNS);

      this.__Compo = 1;
      this[ns0]._1 = this;

      if (props && typeof props == 'object') {
        for (const prop in props) {
          const p = prop.toString();

          if (RegExp(DENIED_PROPS).test(p)) {
            throw new Error(l10n.EPROP);
          }

          if (p.indexOf('on') === 0 && props[p] && typeof props[p] == 'function') {
            el[p] = props[p].bind(this);
          } else if (typeof props[p] != 'object') {
            el[p] = props[p];
          } else if (p == 'children') {
            if (typeof props[p] == 'object' && props[p].length) {
              for (const child of props.children) {
                const {tag, name, props} = child;
                this.append(new Compo(ns, tag, name, props));
              }
            }
          }
        }
      }

      if (name) {
        const nodeClass = el.className;

        el.className = '';

        if (typeof name == 'string') {
          el.className = `${ns}-${name}`;
        } else if (typeof name == 'object') {
          el.className = Object.values(name).map(a => `${ns}-${a}`).join(' ');
        }

        if (nodeClass) {
          el.className += ` ${nodeClass}`;
        }
      }

      this.render();
    }

    
    element(ns, tag, name, props, options, elementNS) {
      if (elementNS) return document.createElementNS(elementNS, tag, options);
      else return document.createElement(tag, options);
    }

    
    hasAttr(attr) {
      return this[this.ns].hasAttribute(attr);
    }

    
    getAttr(attr) {
      return this[this.ns].getAttribute(attr);
    }

    
    setAttr(attr, value) {
      this[this.ns].setAttribute(attr, value);
    }

    
    delAttr(attr) {
      this[this.ns].removeAttribute(attr);
    }

    
    getStyle(prop) {
      return getComputedStyle(this[this.ns])[prop];
    }

    
    show() {
      this[this.ns].hidden = false;
    }

    
    hide() {
      this[this.ns].hidden = true;
    }

    
    enable() {
      this[this.ns].disabled = false;
    }

    
    disable() {
      this[this.ns].disabled = true;
    }

    
    get node() {
      console.warn(l10n.DOM);

      return this[this.ns];
    }

    
    get parent() {
      const el = this[this.ns];
      return el.parentElement && el.parentElement._1 ? el.parentElement._1 : null;
    }

    
    get previous() {
      const el = this[this.ns];
      return el.previousElementSibling ? el.previousElementSibling._1 : null;
    }

    
    get next() {
      const el = this[this.ns];
      return el.nextElementSibling ? el.nextElementSibling._1 : null;
    }

    
    get classList() {
      return this[this.ns].classList;
    }

    
    static isCompo(obj) {
      return obj instanceof Compo;
    }

  }

  



  
  class Data {

    
    constructor(ns, obj) {
      if (obj && typeof obj == 'object') {
        Object.assign(this, {}, obj);
      }

      const ns0 = this.ns = `_${ns}`;

      this.__Data = 0;
      this[ns0] = {ns};
    }

    
    compo(tag, name, props, defer = false, load = false, unload = false) {
      const ns = this[this.ns].ns;
      let compo;

      if (defer) {
        compo = {ns, tag, name, props, load, unload};
      } else {
        compo = new Compo(ns, tag, name, props);
      }
      if (load && typeof load == 'function') {
        compo.load = props.onload = load;
      }
      if (unload && typeof unload == 'function') {
        compo.unload = props.onunload = unload;
      }

      return compo;
    }

    
    async render(slot) {
      const el = this[this.ns];
      const self = this;

      if (el[slot] && el[slot]._) {
        el[slot].load();
      } else {
        el[slot] = {_: self[slot], load: self[slot].load, unload: self[slot].unload};
        self[slot] = new Compo(self[slot].ns, self[slot].tag, self[slot].name, self[slot].props);
        el[slot].load();
      }
    }

    
    async unload(slot) {
      const el = this[this.ns];

      if (el[slot] && el[slot]._) {
        el[slot].unload();
      }
    }

    
    async reflow(slot, force) {
      const el = this[this.ns];

      if (force) {
        el[slot] = this.compo(el[slot]._.ns, el[slot]._.name, el[slot]._.props);
      } else if (el[slot] && el[slot]._) {
        el[slot].load();
      }
    }

    
    static isData(obj) {
      return obj instanceof Data;
    }

  }

  



  
  class Event {

    
    constructor(ns, name, node) {
      const ns0 = this.ns = `_${ns}`;

      node = (Compo.isCompo(node) ? node[ns] : node) || document;

      this.__Event = 0;
      this[ns0] = {name, node};
    }

    
    add(func, options = false) {
      const {node, name} = this[this.ns];
      node.addEventListener(name, func, options);
    }

    
    remove(func) {
      const {node, name} = this[this.ns];
      node.removeEventListener(name, func);
    }

    
    static isEvent(obj) {
      return obj instanceof Event;
    }

  }

  



  
  class base {

    
   

    
   

    
    constructor() {
      const args = arguments;
      let element, options;

      if (args.length > 1) {
        element = args[0];
        options = args[1];
     
      } else if (typeof args[0] == 'object' && args[0].nodeType) {
        element = args[0];
      } else {
        options = args[0];
      }

      if (options && typeof options != 'object') {
        throw new TypeError(l10n.EOPTS);
      }
      if (element && typeof element != 'object') {
        throw new TypeError(l10n.EELEM);
      }

      this.binds();

      this.options = this.opts(this.defaults(), options);
      Object.freeze(this.options);

      this.element = element;
    }

    
    opts(defaults, options = {}) {
      const opts = {};

      for (const key in defaults) {
        if (defaults[key] != null && typeof defaults[key] == 'object') {
          opts[key] = Object.assign(defaults[key], options[key]);
        } else {
          opts[key] = typeof options[key] != 'undefined' ? options[key] : defaults[key];
        }
      }

      return opts;
    }

    
    compo(tag, name, props) {
      const ns = this.options.ns;
      return tag != undefined ? new Compo(ns, tag, name, props) : Compo;
    }

    
    data(obj) {
      const ns = this.options.ns;
      return obj != undefined ? new Data(ns, obj) : Data;
    }

    
    event(event, node) {
      if (typeof event == 'string') {
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
    }

    
    appendNode(parent, node) {
      return !! parent.appendChild(node);
    }

    
    prependNode(parent, node) {
      return !! parent.prependChild(node);
    }

    
    removeNode(root, node) {
      return !! root.removeChild(node);
    }

    
    cloneNode(node, deep = false) {
      return node.cloneNode(deep);
    }

    
    hasAttr(node, attr) {
      return node.hasAttribute(attr);
    }

    
    getAttr(node, attr) {
      return node.getAttribute(attr);
    }

    
    setAttr(node, attr, value) {
      node.setAttribute(attr, value);
    }

    
    delAttr(node, attr) {
      node.removeAttribute(attr);
    }

    
    styleTime(node, prop) {
      let time = Compo.isCompo(node) ? node.getStyle(prop) : getComputedStyle(node)[prop];

      if (time) {
        time = time.indexOf('s') ? (parseFloat(time) * 1e3) : parseInt(time);
      }

      return time || 0;
    }

    
    wrap(method) {
      const self = this;

      if (this[method] && typeof method != 'function') {
        throw new TypeError(l10n.EMETH);
      }

      return function(event) { method.call(self, event, this); }
    }

    
    delay(func, node, time) {
      const delay = node ? this.styleTime(node, 'transitionDuration') : 0;

      setTimeout(func, delay || time);
    }

  }

  
   


  
  class Modal extends base {

    
    defaults() {
      return {
        ns: 'modal',
        root: 'body',
        className: 'modal',
        effects: true,
        dialog: false,
        clone: true,
        backdrop: true,
        keyboard: true,
        close: {
          onclick: this.close,
          innerText: '\u00D7'
        },
        locale: {
          close: 'Close'
        },
        onOpen: () => {},
        onClose: () => {},
        onShow: () => {},
        onHide: () => {},
        onContent: () => {}
      };
    }

    
    binds() {
      this.open = this.wrap(this.open);
      this.close = this.wrap(this.close);
      this.backdrop = this.wrap(this.backdrop);
      this.keyboard = this.wrap(this.keyboard);
    }

    
    constructor() {
      super(...arguments);
    }

    
    generator() {
      const opts = this.options;

      const data = this.modal = this.data({
        onclick: false
      });

      const modal = this.modal.$ = this.compo('dialog', false, {
        className: typeof opts.className == 'object' ? Object.values(opts.className).join(' ') : opts.className,
        hidden: true,
       
       
        onclick: function() {
          data.onclick && typeof data.onclick == 'function' && data.onclick.apply(this, arguments);
        }
      });
      const stage = this.stage = this.compo(false, 'content');

      const close = this.compo('button', ['button', 'close'], opts.close);

      const {locale} = opts;
      close.ariaLabel = locale.close.toString();

      modal.append(stage);

      if (opts.dialog) {
        modal.classList.add(opts.ns + '-dialog');
        stage.append(close);
      } else {
        modal.append(close);
      }
      if (opts.backdrop) {
        data.onclick = this.backdrop;
      }

      if (opts.effects) {
        modal.classList.add(opts.ns + '-effects');
      }

      this.root = this.selector(opts.root);
      this.built = true;
    }

    
    populate(target) {
      console.log('populate', this, target);

      const {element: el} = this;
      if (! el) return;

      const content = this.content(el);

      this.stage.append(content);
    }

    
    resume(target) {
      console.log('resume', this, target);
    }

    
    content(node, clone) {
      const {options: opts} = this;
      const compo = this.compo(false, 'object');

     
      clone = typeof clone != 'undefined' ? clone : opts.clone;
      let inner = clone ? this.cloneNode(node, true) : node;

      opts.onContent.call(this, this, compo, inner);

      if (inner) {
        compo.fill(inner);
      }

      return compo;
    }

    
    destroy() {
      const {root} = this;
      const modal = this.modal.$;

      this.removeNode(root, modal);
      this.built = false;
    }

    
    open(evt, target) {
      this.event(evt);

      if (this.opened) return;

      const {options: opts} = this;

      if (this.built) {
        this.resume(target);
      } else {
        this.generator();
        this.populate(target);
      }

      this.opened = true;
      opts.onOpen.call(this, this, target, evt);
      this.show(target);

      if (opts.keyboard) {
        this.event('keydown').add(this.keyboard);
      }

      console.log('open', this, target);
    }

    
    close(evt, target) {
      this.event(evt);

      if (! this.opened) return;

      const {options: opts} = this;

      this.opened = false;
      opts.onClose.call(this, this, target, evt);
      this.hide(target);

      if (opts.keyboard) {
        this.event('keydown').remove(this.keyboard);
      }

      console.log('close', this, target);
    }

    
    show(target) {
      const {options: opts, root} = this;
      const modal = this.modal.$;
      const self = this;

      modal.bind(root);

      this.delay(() => {
        modal.show();

        opts.onShow.call(self, self, target);
      });
    }

    
    hide(target) {
      const {options: opts, root} = this;
      const modal = this.modal.$;
      const self = this;

      modal.hide();

      this.delay(() => {
        modal.unbind(root);

        opts.onHide.call(self, self, target);
      }, modal, 3e2);
    }

    
    backdrop(evt) {
      this.event(evt);

      const target = evt.target;
      const parent = target.parentElement;
      const ns = this.options.ns;

      var regex;

      regex = new RegExp(ns + '-content');

      if (regex.test(target.className) || regex.test(parent.className)) {
        console.log('backdrop', 'close', this, target, parent);

        this.close(evt);
      }

      regex = new RegExp(ns + '-object');

      if (! regex.test(target.className)) {
        console.log('backdrop', 'return', this, target, parent);

        return;
      }
    
      const inner = target.firstElementChild;
      const inner_w = inner.offsetWidth;
      const inner_h = inner.offsetHeight;
      const target_t = target.offsetTop;
      const target_l = target.offsetLeft;
      const target_w = target.offsetWidth;
      const target_h = target.offsetHeight;

      const x = evt.x;
      const y = evt.y;

      const crop_t = (target_h - inner_h) / 2;
      const crop_l = (target_w - inner_w) / 2;
      const crop_b = crop_t + inner_h;
      const crop_r = crop_l + inner_w;

      console.log('backdrop', 'coords', {x, y}, {target_t, target_l, target_w, target_h}, {crop_t, crop_r, crop_b, crop_l});

      if (
        (y > target_t || x > target_l || x < target_w || y < target_h) &&
        (y < crop_t || x > crop_r || y > crop_b || x < crop_l)
      ) {
        console.log('backdrop', 'close', this, target, parent);

        this.close(evt);
      }
    }

    
    keyboard(evt) {
      this.event(evt);

      switch (evt.keyCode) {
       
        case 27: this.close(evt); break;
      }
    }

  }

  exports.Modal = Modal;

})(this.ensemble = this.ensemble || {});
