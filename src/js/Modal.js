/*!
 * ensemble Modal
 *
 * @version 0.4.0
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
 * @param {object} [options.icons] Set icons model
 * @param {string} [options.icons.type='text'] Set icons type: text, font, svg, symbol, shape
 * @param {string} [options.icons.prefix='icon'] Set icons CSS class name prefix, for icons: font
 * @param {string} [options.icons.src] Set icons SVG symbol href or SVG image hash, for icons: symbol, svg
 * @param {string} [options.icons.viewBox] Set icons SVG viewBox
 * @param {boolean} [options.effects=true] Allow effects
 * @param {boolean} [options.clone=true] Allow clone of passed elements
 * @param {boolean} [options.backdrop=true] Allow backdrop, close on tap or click from outside the modal
 * @param {boolean} [options.keyboard=true] Allow keyboard navigation
 * @param {object} [options.close] Parameters for close button
 * @param {function} [options.close.trigger] Function trigger, default to self.close
 * @param {string} [options.close.text] Icon text, for icons: text
 * @param {string} [options.close.icon] Icon name, symbol href, shape path, URL hash
 * @param {string} [options.close.viewBox] Icon SVG viewBox
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
      icons: {
        type: 'shape',
        prefix: 'icon'
      },
      effects: true,
      dialog: false,
      clone: true,
      backdrop: true,
      keyboard: true,
      close: {
        trigger: this.close,
        text: '\u00D7',
        icon: 'm20 4-8 8 8 8-8-8-8 8 8-8-8-8 8 8 8-8Z',
        viewBox: '0 0 24 24'
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

    const path = 'close';
    const {close: closeParams, icons, locale} = opts;
    const close = this.compo('button', ['button', path], {
      onclick: closeParams.trigger,
      innerText: icons.type == 'text' ? closeParams.text : '',
      ariaLabel: locale.close
    });

    if (icons.type != 'text') {
      const {type, prefix, src, viewBox} = icons;
      const {icon: ref, viewBox: v} = closeParams;
      const icon = this.icon(type, type == 'font' ? ref : path, prefix, src ?? ref, ref ?? path, v ?? viewBox);

      close.append(icon);
    }

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

    const el = this.element;
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
    const opts = this.options;
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
   * Opens the modal
   *
   * @param {Event} evt An Event
   * @param {Element} target The element is invoking
   */
  open(evt, target) {
    this.event().prevent(evt);

    if (this.opened) return;

    const opts = this.options;

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

    const opts = this.options;

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
    let regex = new RegExp(ns + '-content');

    if (regex.test(target.className) || regex.test(parent.className)) {
      console.log('backdrop', 'close', this, target, parent);

      this.close(evt);
    }

    regex = new RegExp(ns + '-object');

    if (! regex.test(target.className)) {
      console.log('backdrop', 'return', this, target, parent);

      return;
    }
  
    // [DOM]
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
