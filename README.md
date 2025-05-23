# ensemble Modal

ensemble.Modal JavaScript class, based on ensemble from loltgt

This modal dialog component supports JS and inline content.

It has built-in HTMLDialogElement.

It comes with options and hooks to customize.


## Demo

Live demo on this page: [https://loltgt.github.io/ensemble-modal/demo/](https://loltgt.github.io/ensemble-modal/demo/)

View source from `demo` to discover options and examples.


## Install

Using npm:
```shell
npm install --save-dev loltgt/ensemble-modal
```

## Usage

Simple usage example:
```javascript
const modal = new ensemble.Modal(document.querySelector(".inline-content"));

document.querySelector("button").addEventListener("click", modal.open);
```

## License

[MIT License](LICENSE)
