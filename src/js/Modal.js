/*!
 * loltgt ensemble.Modal
 *
 * @version 0.0.1
 * @link https://github.com/loltgt/ensemble-modal
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */
 
'use strict';

/**
 * @namespace ensemble
 * @exports Modal
 */

import base from '../../../ensemble-stack-d1/lib/base.js';


/**
 * ensemble.Modal component.
 *
 * @class
 * @extends base
 * @inheritdoc
 * @param {Element} [element] - A valid Element node to display in the modal dialog
 * @param {object} options - Options object
 * @param {string} [options.ns=modal] - The namespace for modal
 * @param {string} [options.root=body] - The root Element node
 * @param {(string|string[])} [options.className=modal] - The component CSS class name
 * @param {boolean} [options.fx=true] - Switch for allow effects
 * @param {boolean} [options.windowed=false] - Switch for framing in a window
 * @param {boolean} [options.cloning=true] - Allow cloning of passed element(s)
 * @param {boolean} [options.backClose=true] - Switch for closing on tap/click outside the content
 * @param {boolean} [options.keyboard=true] - Switch for keyboard navigation
 * @param {object} [options.close] - Custom parameters for close button
 * @param {function} [options.onOpen] - onOpen callback, fires when open modal
 * @param {function} [options.onClose] - onOpen callback, fires when close modal
 * @param {function} [options.onShow] - onShow callback, fires when show modal, after it openes
 * @param {function} [options.onHide] - onHide callback, fires when hide modal, before it closes
 * @param {function} [options.onContent] - onContent callback, fires when a content will be shown
 * @example
 * var modal = new ensemble.Modal(document.getElementById('inline-content-to-display'), {});
 * modal.open();
 * modal.close();
 * @todo arguments
 */
class Modal extends base {

  /**
   * Options object default properties.
   *
   * @returns {object}
   */
  _defaults() {
    return {
      ns: 'modal',
      root: 'body',
      className: 'modal',
      fx: true,
      windowed: false,
      cloning: true,
      backClose: true,
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

  /**
   * Methods binding.
   */
  _bindings() {
    this.open = this.binds(this.open);
    this.close = this.binds(this.close);
    this.backx = this.binds(this.backx);
    this.keyboard = this.binds(this.keyboard);
  }

  /**
   * Constructor method.
   */
  constructor() {
    if (! new.target) {
      throw 'ensemble.Modal error: Bad invocation, must be called with new.';
    }

    super(...arguments);
  }

  /**
   * The generator creates the container box with almost everything the component needs.
   *
   * @todo TODO
   */
  generator() {
    const opts = this.options;

    const data = this.box = this.data({
      onclick: false
    });

    const box = this.box.wrap = this.compo('dialog', false, {
      className: typeof opts.className == 'object' ? opts.className.join(' ') : opts.className,
      hidden: true,
      ariaModal: true,
      role: 'dialog',
      onclick: function() {
        data.onclick && typeof data.onclick == 'function' && data.onclick.apply(this, arguments);
      }
    });
    //TODO
    // data.cnt
    const cnt = this.cnt = this.compo(false, 'content');

    const close = this.compo('button', ['button', 'close'], opts.close);

    box.append(cnt);

    if (opts.windowed) {
      box.classList.add(opts.ns + '-windowed');
      cnt.append(close);
    } else {
      box.append(close);
    }
    if (opts.backClose) {
      this.box.onclick = this.backx;
    }

    if (opts.fx) {
      box.classList.add(opts.ns + '-fx');
    }

    this.root = this.selector(opts.root);
    this.built = true;
  }

  /**
   * In this stage the component is populated with all the content progeny.
   *
   * @param {Element} target - The element that is invoking
   * @todo TODO
   */
  populate(target) {
    console.log('ensemble.Modal', 'populate()', target);

    if (! this.element) return;

    const content = this.content(this.element);

    this.cnt.append(content);
  }

  /**
   * Processing when the component is resumed.
   *
   * @param {Element} target - The element that is invoking
   * @todo TODO
   */
  resume(target) {
    console.log('ensemble.Modal', 'resume()', target);
  }

  /**
   * The single content.
   *
   * @param {Element} node - A valid Element node
   * @param {boolean} clone - Eventually clones Element nodes
   * @returns {Element} wrap - The wrapped (cloned) Element node
   * @todo TODO
   */
  content(node, clone) {
    const opts = this.options;
    const wrap = this.compo(false, 'object');

    clone = typeof clone != 'undefined' ? clone : opts.cloning;

    let inner = clone ? this.cloneNode(node, true) : node;

    opts.onContent.call(this, this, wrap, inner);

    if (inner) {
      wrap.inject(inner);
    }

    return wrap;
  }

  /**
   * @todo TODO
   */
  destroy() {
    const root = this.root;
    const box = this.box.wrap;

    this.removeNode(root, box);
    this.built = false;
  }

  /**
   * Opens the modal.
   *
   * @param {Event} e - An Event
   * @param {Element} target - The element that is invoking
   */
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

    console.log('ensemble.Modal', 'open()', this);
  }

  /**
   * Closes the modal.
   *
   * @param {Event} e - An Event
   * @param {Element} target - The element that is invoking
   */
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

    console.log('ensemble.Modal', 'close()', this);
  }

  /**
   * Shows the modal.
   *
   * @param {Element} target - The element that is invoking
   */
  show(target) {
    const opts = this.options;
    const root = this.root;
    const data = this.box;
    const box = this.box.wrap;

    box.install(root);

    this.delay(function() {
      box.show();

      opts.onShow.call(self, self, target);
    });
  }

  /**
   * Hides the modal.
   *
   * @param {Element} target - The element that is invoking
   */
  hide(target) {
    const opts = this.options;
    const root = this.root;
    const data = this.box;
    const box = this.box.wrap;

    box.hide();

    this.delay(function() {
      box.uninstall(root);

      opts.onHide.call(self, self, target);
    }, box, 3e2);
  }

  /**
   * Handles the close on tap/click outside the content.
   *
   * @param {Event} e - An Event
   * @todo test
   */
  backx(e) {
    this.event(e);

    const target = e.target;
    const parent = target.parentElement;
    const ns = this.options.ns;

    var regex;

    regex = new RegExp(ns + '-content');

    if (regex.test(target.className) || regex.test(parent.className)) {
      console.log('ensemble.Modal', 'backx()', 'outside cropbox area', ':then: close', parent, target);

      this.close(e);
    }

    regex = new RegExp(ns + '-object');

    if (! regex.test(target.className)) {
      console.log('ensemble.Modal', 'backx()', 'outside cropbox area', ':then: skip', parent, target);

      return;
    }

    const inner = target.firstElementChild;
    const inner_w = inner.offsetWidth;
    const inner_h = inner.offsetHeight;
    const target_t = target.offsetTop;
    const target_l = target.offsetLeft;
    const target_w = target.offsetWidth;
    const target_h = target.offsetHeight;

    const x = event.x;
    const y = event.y;

    const crop_t = (target_h - inner_h) / 2;
    const crop_l = (target_w - inner_w) / 2;
    const crop_b = crop_t + inner_h;
    const crop_r = crop_l + inner_w;

    console.log('ensemble.Modal', 'backx()', 'coords', { x, y }, { target_t, target_l, target_w, target_h }, { crop_t, crop_r, crop_b, crop_l });

    if (
      (y > target_t || x > target_l || x < target_w || y < target_h) &&
      (y < crop_t || x > crop_r || y > crop_b || x < crop_l)
    ) {
      console.log('ensemble.Modal', 'backx()', 'outside cropbox area', ':then: close', parent, target);

      this.close(e);
    }
  }

  /**
   * Captures keyboard codes corresponding to functions to be triggered.
   *
   * @param {Event} e - An Event
   */
  keyboard(e) {
    this.event(e);

    const kcode = e.keyCode || 0;

    // Escape
    if (kcode == 27) this.close(e);
  }

}


export { Modal };
