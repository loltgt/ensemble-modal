/*!
 * loltgt ensemble.Modal
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */
 
'use strict';

(function(window, module, require, ensemble) {

  const base = ensemble ? ensemble.base : require('../ensemble-stack-d1/base');


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
        onOpen: function() {},
        onClose: function() {},
        onShow: function() {},
        onHide: function() {}
      };
    }

    _bindings() {
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.backx = this.backx.bind(this);
      this.keyboard = this.keyboard.bind(this);
    }

    constructor(element, options = {}) {
      super();

      this._bindings();

      this.options = this.defaults(this._defaults(), options);
      this.element = element;
    }

    generator() {
      const opts = this.options;

      this.root = this.selector(opts.root);

      const box = this.box = this.compo('dialog', true, {
        className: opts.ns,
        hidden: true,
        ariaModal: true,
        role: 'dialog'
      });

      if (opts.backClose) {
        box.onclick = this.backx;
      }

      const cnt = this.cnt = this.compo('content');
      box.append(cnt);

      const close = this.compo('button', 'close', opts.close);

      if (opts.windowed) {
        box.classList.add(opts.ns + '-windowed');
        cnt.append(close);
      } else {
        box.append(close);
      }

      if (opts.fx) {
        box.classList.add(opts.ns + '-fx');
      }

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
      const cloning = typeof clone != 'undefined' ? clone : this.options.cloning;
      const wrap = this.compo('object');

      if (node) {
        this.appendNode(wrap, cloning ? this.cloneNode(node, true) : node);
      }

      return wrap;
    }

    //TODO
    destroy() {
      this.box.remove();
      this.built = false;
    }

    open(e) {
      e.preventDefault();
      e.target.blur();

      if (this.opened) return;

      const opts = this.options;
      // target
      const target = e.target;

      if (this.built) {
        this.resume(e.target);
      } else {
        this.generator();
        this.populate(e.target);
      }

      this.opened = true;
      opts.onOpen.call(this, this);
      this.show();

      if (opts.keyboard) {
        this.event('keydown').add(this.keyboard);
      }

      console.log('open', this);
    }

    close(e) {
      e.preventDefault();
      e.target.blur();

      if (! this.opened) return;

      const opts = this.options;

      this.opened = false;
      opts.onClose.call(this, this);
      this.hide();

      if (opts.keyboard) {
        this.event('keydown').remove(this.keyboard);
      }

      console.log('close', this);
    }

    show() {
      const self = this;
      const root = this.root;
      const box = this.box;

      self.appendNode(root, box);

      setTimeout(function() {
        box.delAttr('hidden');

        self.options.onShow.call(self, self);
      });
    }

    hide() {
      const self = this;
      const root = this.root;
      const box = this.box;

      box.setAttr('hidden', true);

      setTimeout(function() {
        self.removeNode(root, box);

        self.options.onHide.call(self, self);
      }, this.timing(box));
    }

    backx(e) {
      const target = e.target;

      if (target != this.box && target != this.cnt) return;

      this.close(e);
    }

    keyboard(e) {
      const kcode = e.keyCode || 0;

      // Escape
      if (kcode === 27) this.close(e);
    }

  }


  window.ensemble = { ...ensemble, ...{ Modal } };
  module.exports = Modal;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
