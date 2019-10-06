<template>
  <div class="editor-container editor">
    <div class="title-container">
      <input
        :value="articleTitle"
        placeholder="タイトル"
        @input="handleInputTitle"
      />
    </div>

    <editor-menu-bar :editor="editor" class="editor-menu-bar">
      <div slot-scope="{ commands, isActive }">
        <a
          class="button is-dark"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
          >ul</a
        >
        <a
          class="button is-dark"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
          >ol</a
        >
      </div>
    </editor-menu-bar>

    <div class="content">
      <editor-content :editor="editor" />
    </div>

    <editor-menu-bubble :editor="editor">
      <div
        slot-scope="{ commands, isActive, menu }"
        class="menububble"
        :class="{ 'is-active': menu.isActive }"
        :style="`left: ${menu.left}px; bottom: ${menu.bottom}px;`"
      >
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          B
        </button>
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          I
        </button>
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.code() }"
          @click="commands.code"
        >
          Code
        </button>
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          quote
        </button>
        <button
          class="menububble__button"
          :class="{ 'is-active': isActive.link() }"
          @click="commands.link"
        >
          link
        </button>
      </div>
    </editor-menu-bubble>
  </div>
</template>

<style lang="scss">
.editor {
  position: relative;
  &__floating-menu {
    position: absolute;
    margin-top: -0.25rem;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.2s, visibility 0.2s;
    &.is-active {
      opacity: 1;
      visibility: visible;
    }
  }
}

.content {
  iframe {
    &.embed-youtube {
      width: 608px;
      height: 342px;
    }
  }

  p {
    margin-bottom: 1.2rem;

    img {
      display: block;
      margin: 0 auto;
    }

    a {
      @apply text-blue-400;
    }
    code {
      @apply bg-gray-400 text-red-400 p-1;
    }
  }

  pre {
    margin-bottom: 1.2rem;
    @apply bg-white;

    code {
      @apply text-red-400 p-1;
    }
  }

  .amazon-card {
    cursor: pointer;
    display: flex;
    justify-content: center;
    a {
      width: 80%;
      display: flex;
      flex-direction: column;
      border: 1px solid #f2f2f2;
      border-radius: 4px;
      padding: 20px;

      .item-detail {
        display: flex;
      }
      .detail-button {
        width: 80%;
        border: 1px solid #f2f2f2;
        border-radius: 4px;
      }
    }
    img {
      height: 100px;
    }
  }

  p {
    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>

<style>
.menububble {
  position: absolute;
  display: flex;
  z-index: 20;
  margin-bottom: 0.5rem;
  transform: translateX(-50%);
  visibility: hidden;
  opacity: 0;
  background: rgb(0, 0, 0);
  border-radius: 5px;
  padding: 0.3rem;
  transition: opacity 0.2s ease 0s, visibility 0.2s ease 0s;
}
.menububble.is-active {
  opacity: 1;
  visibility: visible;
}
.menububble__button {
  display: inline-flex;
  color: rgb(255, 255, 255);
  margin-right: 0.2rem;
  cursor: pointer;
  background: rgba(0, 0, 0, 0);
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
}
.menububble__button.is-active {
  background-color: rgba(255, 255, 255, 0.2);
}
.menububble__button:last-child {
  margin-right: 0px;
}

.editor-menu-bar {
  position: sticky;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.editor-container {
}
.title-container input {
  color: #444444;
  width: 100%;
  font-size: 32px;
  border: none;
  outline: none;
}
.content {
  color: #444444;
  margin-top: 50px;
  min-height: 200px;
  font-size: 18px;
  line-height: 36px;
}

.content div {
  outline: none;
}
</style>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Editor, EditorContent, EditorMenuBar, EditorMenuBubble } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Image,
  History,
  HardBreak
} from 'tiptap-extensions'
// import { AmazonCard } from '../editor/amazonCard'

@Component({
  components: {
    EditorContent,
    EditorMenuBar,
    EditorMenuBubble
  },
  async asyncData() {}
})
export default class ArticleEditor extends Vue {
  @Prop() readonly editor!: any
  @Prop() readonly articleTitle!: string
  @Prop() readonly articleContent!: string
  @Prop() readonly editable!: boolean

  visibleEmbedYoutubeDigalog: boolean = false
  command: any = null
  embedSrc: string = ''

  get embedSrcUrl(): string {
    // const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    // const match = this.embedSrc.match(regExp)
    // if (match && match[7].length === 11) {
    //   return `https://www.youtube.com/embed/${match[7]}`
    // }
    return ''
  }

  beforeDestroy(): void {
    this.editor.destroy()
  }

  mounted(): void {
    const editorInstance = new Editor({
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new Heading({ levels: [1, 2, 3] }),
        new ListItem(),
        new OrderedList(),
        new BulletList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Image(),
        new History(),
        new HardBreak(),
        // new AmazonCard()
      ],
      content: this.articleContent || '',
      autoFocus: true
    })
    this.$emit('update:editor', editorInstance)
  }

  handleInputTitle(event): void {
    this.$emit('update:articleTitle', event.target.value)
  }
  insertEmbedNode(): void {
    this.command({ src: this.embedSrcUrl })
  }
  showEmbedYoutubeDialog(command): void {
    this.command = command
    this.visibleEmbedYoutubeDigalog = !this.visibleEmbedYoutubeDigalog
  }
}
</script>
