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
        onHide: function() {},
        onContent: function() {}
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
    }

    //TODO
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

      if (! this.opened) return;

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

      this.delay(function() {
        box.show();

        opts.onShow.call(self, self, target);
      });
    }

    hide(target) {
      const opts = this.options;
      const root = this.root;
      const box = this.box;

      box.hide();

      this.delay(function() {
        box.uninstall(root);

        opts.onHide.call(self, self, target);
      }, box, 3e2);
    }

    //TODO
    backx(e) {
      this.event(e);

      if (e.target != this.box && e.target != this.cnt) return;

      this.close(e);
    }

    keyboard(e) {
      this.event(e);

      const kcode = e.keyCode || 0;

      // Escape
      if (kcode === 27) this.close(e);
    }

  }


  window.ensemble = { ...ensemble, ...{ Modal } };
  module.exports = Modal;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
