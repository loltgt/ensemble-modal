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
 * @param {boolean} [options.dialog=true] Use HTMLDialogElement
 * @param {boolean} [options.modal=true] Allow modal mode
 * @param {boolean} [options.window=false] Allow window framed mode
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
 * @param {function} [options.onContent] onContent callback, on content layout
 * @param {function} [options.onInit] onInit callback, on component initialization
 * @param {function} [options.onResume] onResume callback, on component resuming
 * @example
 * const modal = new ensemble.Modal(document.querySelector(".inline-content"));
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
      dialog: true,
      modal: true,
      window: false,
      icons: {
        type: 'shape',
        prefix: 'icon'
      },
      effects: true,
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
      onContent: () => {},
      onInit: () => {},
      onResume: () => {}
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
   * Constructor
   *
   * @constructs
   */
  constructor() {
    super(...arguments);
  }

  /**
   * Initializes the component
   *
   * @emits #options.onInit
   *
   * @param {Element} target The element is invoking
   */
  init(target) {
    const el = this.element;
    if (! el) return;

    this.layout();

    const content = this.$ = this.content(el);

    this.stage.append(content);

    /**
     * @event #options.onInit
     * @type {function}
     * @param {object} this
     * @param {Element} target
     */
    this.options.onInit.call(this, this, target);
  }

  /**
   * Processing on component resume
   *
   * @emits #options.onResume
   *
   * @param {Element} target The element is invoking
   */
  resume(target) {
    /**
     * @event #options.onResume
     * @type {function}
     * @param {object} this
     * @param {Element} target
     */
    this.options.onResume.call(this, this, target);
  }

  /**
   * Lead layout
   */
  layout() {
    const opts = this.options;

    const data = this.modal = this.data({
      onclick: false
    });

    const modal = this.modal.$ = this.compo(opts.dialog ? 'dialog' : false, false, {
      className: typeof opts.className == 'object' ? Object.values(opts.className).join(' ') : opts.className,
      hidden: true,
      onclick: function() {
        data.onclick && typeof data.onclick == 'function' && data.onclick.apply(this, arguments);
      }
    });
    const body = this.modal.body = this.compo(false, 'body');
    const stage = this.stage = this.compo(false, 'stage');
    const nav = this.nav = this.data(true);

    const path = 'close';
    const {close: closeParams, icons, locale} = opts;
    const close = nav[path] = this.compo('button', ['button', path], {
      onclick: closeParams.trigger,
      innerText: icons.type == 'text' ? closeParams.text : '',
      ariaLabel: locale.close
    });

    if (icons.type != 'text') {
      const {type, prefix, src, viewBox} = icons;
      const {icon: ref, viewBox: v} = closeParams;
      const icon = this.icon(type, type == 'font' ? ref : path, prefix, src ?? ref, ref ?? path, v ?? viewBox);

      const svg = icon.first;
      svg.setAttr('stroke', 'currentColor');
      svg.setAttr('stroke-width', '2px');

      close.append(icon);
    }

    body.append(stage);
    body.append(close);
    modal.append(body);

    if (opts.window) {
      modal.classList.add(`${opts.ns}-window`);
    }
    if (opts.backdrop) {
      modal.classList.add(`${opts.ns}-backdrop`);
      data.onclick = this.backdrop;
    }

    if (opts.effects) {
      modal.classList.add(`${opts.ns}-effects`);
    }

    this.root = this.selector(opts.root);
    this.built = true;
  }

  /**
   * The content
   *
   * @emits #options.onContent
   *
   * @param {Element} node A valid Element node
   * @param {boolean} clone Clones Element nodes
   * @returns {Compo} compo A compo wrapped Element
   */
  content(node, clone) {
    const opts = this.options;
    const compo = this.compo(false, 'content');

    clone = clone ?? opts.clone;
    let inner = clone ? this.cloneNode(node, true) : node;

    /**
     * @event #options.onContent
     * @type {function}
     * @param {object} this
     * @param {Compo} compo
     * @param {Element} inner
     */
    opts.onContent.call(this, this, compo, inner);

    if (inner) {
      compo.fill(inner);
    }

    return compo;
  }

  /**
   * Opens the modal
   *
   * @emits #options.onOpen
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
      this.init(target);
    }

    this.opened = true;

    /**
     * @event #options.onOpen
     * @type {function}
     * @param {object} this
     * @param {Element} target
     * @param {Event} evt
     */
    opts.onOpen.call(this, this, target, evt);

    this.show(target);

    if (opts.keyboard) {
      this.event('keydown').add(this.keyboard);
    }
  
    this.event().blur(evt);
  }

  /**
   * Closes the modal
   *
   * @emits #options.onClose
   *
   * @param {Event} evt An Event
   * @param {Element} target The element is invoking
   */
  close(evt, target) {
    this.event().prevent(evt);

    if (! this.opened) return;

    const opts = this.options;

    this.opened = false;

    /**
     * @event #options.onOpen
     * @type {function}
     * @param {object} this
     * @param {Element} target
     * @param {Event} evt
     */
    opts.onClose.call(this, this, target, evt);

    this.hide(target);

    if (opts.keyboard) {
      this.event('keydown').remove(this.keyboard);
    }
  
    this.event().blur(evt);
  }

  /**
   * Shows the modal
   *
   * @emits #options.onShow
   *
   * @param {Element} target The element is invoking
   */
  show(target) {
    const {options: opts, root} = this;
    const modal = this.modal.$;
    const ns = modal.ns, dialog = modal[ns];
    const self = this;

    modal.bind(root);

    this.target = target;

    this.delay(() => {
      // [DOM]
      if (opts.dialog) {
        try {
          if (opts.modal)
            dialog.showModal();
          else
            dialog.show();

          // note: autofocus is forced
          dialog.focus();
        } catch (err) {
          console.error('show', err.message);

          modal.setAttr('open', '');
        }
      // note: [fallback] set focused element
      } else {
        const button = this.selector('button', dialog);
        if (button) {
          button.focus();
          button.blur();
        }
      }

      modal.show();

      /**
       * @event #options.onShow
       * @type {function}
       * @param {object} this
       * @param {Element} target
       */
      opts.onShow.call(self, self, target);
    });
  }

  /**
   * Hides the modal
   *
   * @emits #options.onHide
   *
   * @param {Element} target The element is invoking
   */
  hide(target) {
    const {options: opts, root} = this;
    const modal = this.modal.$;
    const ns = modal.ns, dialog = modal[ns];
    const self = this;

    modal.hide();

    // [DOM]
    if (opts.dialog) {
      try {
        dialog.close();
      } catch (err) {
        console.error('hide', err.message);

        modal.delAttr('open');
      }
    // note: [fallback] revert to previous focused element
    } else if (this.target) {
      this.target.focus();
    }
    // note: unset focus
    const doc = document;
    doc.hasFocus() && doc.activeElement.blur();

    this.delay(() => {
      modal.unbind(root);

      /**
       * @event #options.onHide
       * @type {function}
       * @param {object} this
       * @param {Element} target
       */
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

    const opts = this.options;
    const target = evt.target;
    const regex = new RegExp(`${opts.ns}-backdrop`);

    if (regex.test(target.className) || regex.test(target.parentElement.className)) {
      this.close(evt);
    }
  }

  /**
   * Handles keyboard inputs
   *
   * @param {Event} evt An Event
   */
  keyboard(evt) {
    switch (evt.keyCode) {
      // Close
      case 27: this.event().prevent(evt), this.close(evt); break;
    }
  }

}


export { Modal };
