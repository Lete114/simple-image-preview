import './main.css'

const html = document.documentElement
const body = document.body
const mask = document.createElement('div')
mask.classList.add('sip-mask')
body.appendChild(mask)

function getScrollbarWidth() {
  return window.innerWidth - html.clientWidth + 'px'
}

export default function simpleImagePreview(s?: string | NodeList, options?: { zIndex: string }) {
  if (options?.zIndex) {
    mask.style.setProperty('--sip-z-index', options.zIndex)
  }
  const imgs = s instanceof NodeList ? s : document.querySelectorAll(s || 'img')
  imgs.forEach(function (target) {
    if (!(target instanceof HTMLImageElement)) return
    target.classList.add('sip-cursor')
    target.addEventListener('click', function () {
      const src = target.getAttribute('src')
      if (!src) return

      html.style.setProperty('--sip-hide-scrollbar', getScrollbarWidth())
      body.classList.add('sip-hide-scrollbar')
      mask.style.setProperty('visibility', 'visible')

      const img = document.createElement('img')
      img.src = src
      const bounding = target.getBoundingClientRect()

      // Set clone image initial position
      // eslint-disable-next-line max-len
      const style = `position:absolute;top:${bounding.top}px;left:${bounding.left}px;width:${bounding.width}px;height:${bounding.height}px`
      img.setAttribute('style', style)
      target.classList.add('sip-hide')

      mask.appendChild(img)

      img.offsetTop // force reflow
      img.classList.add('sip-img')
      img.removeAttribute('style')

      // Close the preview image
      mask.addEventListener('click', function () {
        // Preview image back to original position
        img.setAttribute('style', `${style};transform:none`)

        // Hide the mask at the end of the transition and show the original image and delete the cloned image
        img.addEventListener(
          'transitionend',
          function () {
            target.classList.remove('sip-hide')
            body.classList.remove('sip-hide-scrollbar')
            html.style.removeProperty('--sip-hide-scrollbar')
            img.remove()
            mask.style.removeProperty('visibility')
          },
          { once: true } // only execute once
        )
      })
    })
  })
}
