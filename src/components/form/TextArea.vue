<template>
  <div :class="getBsColSize">
    <slot name="section-title" :childIsSection="isSection"></slot>
    <div class="form-group" :id="anchorIdFormat(schema)" :class="[getStyleClass]">
      <slot name="label" :getId="getId" :childIsSection="isSection" :classes="[]"></slot>
      <textarea
        :id="getId()"
        :name="currentKey"
        v-model="val"
        :placeholder="hint"
        :aria-describedby="helpText(schema)"
        rows="10"
        class="form-control"
      ></textarea>
    </div>
  </div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'TextArea',
  mixins: [Proto],
  data() {
    return {
      hint: 'Insert text here ...'
    }
  }
}
</script>

<style>
textarea {
  width: 100%;
  height: 17rem;
}
</style>


