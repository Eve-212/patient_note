
<template>
  <div :class="getBsColSize">
    <div
      :id="anchorIdFormat(schema)"
      :class="[getStyleClass]"
    >
      <template v-if="inputGroup">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label
              class="input-group-text"
              :for="getId()"
            >{{ schema.title }}</label>
          </div>
          <select
            :id="getId()"
            class="custom-select"
            v-model="val"
          >
            <template v-if="placeholder">
              <option value="">{{ placeholder }}</option>
            </template>
            <option
              v-for="(item, index) in schema.attrs.values"
              :key="index"
              :value="item"
            >
              {{ item }}
            </option>
          </select>
        </div>
      </template>
      <div
        class="form-group row"
        v-if="!inputGroup"
      >
        <label :for="getId()">{{ schema.title }}</label>
        <select
          :id="getId()"
          v-model="val"
        >
          <template v-if="placeholder">
            <option value="">{{ placeholder }}</option>
          </template>
          <option
            v-for="(item, index) in schema.attrs.values"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'SelectList',
  mixins: [Proto],
  data() {
    return {}
  },
  created: function() {
    // if (!(this.currentKey in this.value)) {
    //   // this.value[this.currentKey] = {}
    //   this.$set(this.value, this.currentKey, '')
    //   //this.value["keyOnCreate"] = {};
    // }
  }
}
</script>

<style>
</style>