# Simple-Image-Preview

A lightweight image preview library

- preview site: [https://lete114.github.io/simple-image-preview](https://lete114.github.io/simple-image-preview)

## Installation

```bash
npm install simple-image-preview
```

Or

```html
<script src="https://cdn.jsdelivr.net/npm/simple-image-preview/dist/simple-image-preview.umd.js"></script>
```

## Usage

```js
import simpleImagePreview from 'simple-image-preview'

// Pass in a css selector (default: img)
simpleImagePreview('main img') // will select all `img` tags under the `main` tag

// Pass in a NodeList data structure
const imgs = document.querySelectorAll('main img')
simpleImagePreview(imgs)

// custom z-index (default: 1)
simpleImagePreview('main img', { zIndex: 100 })
```

## options

### zIndex

Type: `Number`

Default: `1`

custom z-index
