<template>
  <div>
    <div>
      <input v-model="text" type="text" class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal">
    </div>
    <div class="canvas-section">
      <div class="border shadow p-1">
        <div class="image-preview-section relative border-0 border-gray-600 bg-white flex justify-center items-center p-10 font-bold"
          style="width: 600px; height: 315px; margin: 0 auto;">
          <div class="text-section align-center text-4xl">
            <p>{{ text }}</p>
          </div>
          <div class="water-mark absolute" style="right: 10px; bottom: 10px">astapi.dev</div>
        </div>
      </div>

      <div class="flex justify-center mt-4 mb-4">
        <button @click="toCanvas" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">toCanvas</button>
        <button @click="upload" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">upload</button>
      </div>
    </div>
  </div> 
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/storage'

@Component({})
export default class AdminIndex extends Vue {
  text: string | (string|null)[] = ''
  articleId: string | (string|null)[] = ''

  mounted() {
    if (this.$route.query.text) {
      this.text = this.$route.query.text;
      this.articleId = this.$route.query.articleId;
    }
  }
  toCanvas() {
    if (process.client) {
      const html2canvas = require('html2canvas');
      html2canvas(document.querySelector('.image-preview-section')).then(function(canvas) {
        // console.log(canvas.toDataURL());
        // let link = document.createElement('a')
        // link.href = canvas.toDataURL()
        // link.download = 'cancas.png'
        // link.click()
        document.body.appendChild(canvas);
      });
    }
  }
  async upload() {
    if (process.client) {
      const html2canvas = require('html2canvas');
      html2canvas(document.querySelector('.image-preview-section')).then(async (canvas) => {
        const mill = new Date().getTime()
        const fileName = `${this.articleId}.png`
        const filePath = `/og_images/${fileName}`
        const ref = this.$firebase.storage().ref().child(filePath)
        const  metadata = {
          contentType: 'image/png',
        };
        await ref.putString(canvas.toDataURL().split(',')[1], 'base64', metadata)
        if (typeof this.articleId === 'string') {
          await this.$firestore.collection('articles').doc(this.articleId).update({
            ogImageUrl: `/api/images/${fileName}`,
          })
        }
        alert('upload done.')
      });
    }
  }
}
</script>
