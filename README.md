# ensemble Modal

ensemble.Modal JavaScript class from loltgt

This modal dialog supports remote and inline content.

The base for **ensemble Lightbox**.

It comes with options and hooks to customize.


## Install

Using npm:
```shell
npm install --save-dev github:loltgt/ensemble-modal
```

## Usage

Simple usage example:
```javascript
var modal = new ensemble.Modal(
  document.getElementById('inline-content'),
  {
    windowed: true
  }
);

modal.open();
```

## License

[MIT License](LICENSE)
