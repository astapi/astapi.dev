import { Image } from 'tiptap-extensions'

export class ImageTag extends Image {
  get schema() {
    return {
      ...super.schema,
      attrs: {
        src: {},
        alt: {
          default: null,
        },
        title: {
          default: null,
        },
        style: {},
      },
      toDOM: node => ['img', node.attrs],
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs: dom => ({
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
            style: dom.getAttribute('style'),
          }),
        },
      ],
    };
  }
}
