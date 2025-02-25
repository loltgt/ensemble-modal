/*!
 * ensemble Modal
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble-modal
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */
 
'use strict';

/**
 * @namespace ensemble
 * @exports Modal
 */

import base from "@loltgt/ensemble";


/**
 * Modal ensemble component
 *
 * @class
 * @extends base
 * @inheritdoc
 * @param {Element} [element] A valid Element node to display in the modal dialog
 * @param {object} options Options object
 * @param {string} [options.ns=modal] The namespace for modal
 * @param {string} [options.root=body] A root Element node
 * @param {string[]} [options.className=modal] The component CSS class name
 * @param {boolean} [options.dialog=false] Allow dialog mode
 * @param {boolean} [options.effects=true] Allow effects
 * @param {boolean} [options.clone=true] Allow clone of passed elements
 * @param {boolean} [options.backdrop=true] Allow backdrop, close on tap or click from outside the modal
 * @param {boolean} [options.keyboard=true] Allow keyboard navigation
 * @param {object} [options.close] Parameters for close button
 * @param {object} [options.locale] Localization strings
 * @param {function} [options.onOpen] onOpen callback, on modal open
 * @param {function} [options.onClose] onOpen callback, on modal close
 * @param {function} [options.onShow] onShow callback, on modal show, after openes
 * @param {function} [options.onHide] onHide callback, on modal hide, before closes
 * @param {function} [options.onContent] onContent callback, on content shown
 * @example
 * var modal = new ensemble.Modal(document.getElementById('inline-content'), {dialog: true});
 * modal.open();
 */
class Modal extends base {

  /**
   * Default properties
   *
   * @returns {object}
   */
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

  /**
   * Methods binding
   */
  binds() {
    this.open = this.wrap(this.open);
    this.close = this.wrap(this.close);
    this.backdrop = this.wrap(this.backdrop);
    this.keyboard = this.wrap(this.keyboard);
  }

  /**
   * Constructor method
   *
   * @constructs
   */
  constructor() {
    super(...arguments);
  }

  /**
   * Element generator
   */
  generator() {
    const opts = this.options;

    const data = this.modal = this.data({
      onclick: false
    });

    const modal = this.modal.$ = this.compo('dialog', false, {
      className: typeof opts.className == 'object' ? Object.values(opts.className).join(' ') : opts.className,
      hidden: true,
      // ariaModal: true,
      // role: 'dialog',
      onclick: function() {
        data.onclick && typeof data.onclick == 'function' && data.onclick.apply(this, arguments);
      }
    });
    const stage = this.stage = this.compo(false, 'content');

    const close = this.compo('button', ['button', 'close'], opts.close);

    const {locale} = opts;
    close.ariaLabel = locale.close;

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

  /**
   * On this stage the component is populated with progeny
   *
   * @param {Element} target The element is invoking
   */
  populate(target) {
    console.log('populate', this, target);

    const {element: el} = this;
    if (! el) return;

    const content = this.content(el);

    this.stage.append(content);
  }

  /**
   * Processing when the component is resumed
   *
   * @param {Element} target The element is invoking
   */
  resume(target) {
    console.log('resume', this, target);
  }

  /**
   * The single content
   *
   * @param {Element} node A valid Element node
   * @param {boolean} clone Clones Element nodes
   * @returns {Element} compo A compo wrapped Element
   */
  content(node, clone) {
    const {options: opts} = this;
    const compo = this.compo(false, 'object');

    clone = clone ?? opts.clone;
    let inner = clone ? this.cloneNode(node, true) : node;

    opts.onContent.call(this, this, compo, inner);

    if (inner) {
      compo.fill(inner);
    }

    return compo;
  }

  /**
   * Destroys the modal
   */
  destroy() {
    const {root} = this;
    const modal = this.modal.$;

    this.removeNode(root, modal);
    this.built = false;
  }

  /**
   * Opens the modal
   *
   * @param {Event} evt An Event
   * @param {Element} target The element is invoking
   */
  open(evt, target) {
    this.event().prevent(evt);

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
  
    this.event().blur(evt);

    console.log('open', this, target);
  }

  /**
   * Closes the modal
   *
   * @param {Event} evt An Event
   * @param {Element} target The element is invoking
   */
  close(evt, target) {
    this.event().prevent(evt);

    if (! this.opened) return;

    const {options: opts} = this;

    this.opened = false;
    opts.onClose.call(this, this, target, evt);
    this.hide(target);

    if (opts.keyboard) {
      this.event('keydown').remove(this.keyboard);
    }
  
    this.event().blur(evt);

    console.log('close', this, target);
  }

  /**
   * Shows the modal
   *
   * @param {Element} target The element is invoking
   */
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

  /**
   * Hides the modal
   *
   * @param {Element} target The element is invoking
   */
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

  /**
   * Handles the close on tap or click outside the content
   *
   * @param {Event} evt An Event
   */
  backdrop(evt) {
    this.event().prevent(evt);

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

  /**
   * Handles keyboard inputs
   *
   * @param {Event} evt An Event
   */
  keyboard(evt) {
    this.event().prevent(evt);

    switch (evt.keyCode) {
      // Close
      case 27: this.close(evt); break;
    }
  }

}


export { Modal };
