<template>
  <div :class="getBsColSize">
     <div 
      :id="anchorIdFormat(schema)" 
      :class="[getStyleClass]">
        <div           
          :for="currentKey">{{ schema.title }}
        </div>
        <quill-editor 
          v-model="val"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)">
        </quill-editor>
     </div>
     {{ val }}
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'quillTextArea',
  mixins: [Proto],
  components: {
    quillEditor
  },
  data() {
    return {
      // content: null,
      editorOption: {
        // put quill options
        theme: 'snow'
      }
    }
  },
  methods: {
    onEditorBlur(quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus(quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady(quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.content = html
    }
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
}
</script>

<style>
.ql-container {
  height: 10rem;
}
</style>
