export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    },
    path: {
      type: Array,
      default() {
        return []
      }
    },
    currentKey: {
      type: String,
      default() {
        return 'content'
      }
    },
    bsColSize: {
      type: Number
    },
    styleClass: {
      type: Array
    },
    placeholder: {
      type: String
    }
  },
  methods: {
    getId($index) {
      if ($index !== undefined) {
        return this.path.concat($index).join('.')
      } else {
        return this.path.join('.')
      }
    },
    // clearInput() {
    //   // this.value[this.currentKey] = null
    //   let initValue = null
    //   switch (this.$options.name) {
    //     case 'TextInput':
    //       initValue = ''
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'NumberInput':
    //       initValue = ''
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'Checkbox':
    //       initValue = false
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'CheckList':
    //       initValue = []
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'CheckListWithOther':
    //       initValue = []
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'RadioInput':
    //       initValue = ''
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'SelectDate':
    //       initValue = ''
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'SelectList':
    //       initValue = ''
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //     case 'bsRadioInput':
    //       initValue = ''
    //       this.$set(this.value, this.currentKey, initValue)
    //       break
    //   }
    // },
    anchorIdFormat(item) {
      if (item && item.title) {
        return item.title.replace(/\W/gm, '-').toLowerCase()
      }
    },
    helpText(schema) {
      if (schema.description) {
        return `${schema.title.replace(/\W/gm, '-').toLowerCase()}-help`
      }
    },
  },
  computed: {
    val:{
      get() { return this.value },
      set(val) {this.$emit('input', val)}
    },
    getPlaceholder() {
      if (this.placeholder) {
        return this.placeholder
      }
      return ''
    },
    getBsColSize() {
      if (this.bsColSize) {
        return `col-md-${this.bsColSize}`
      }
      return 'col-md-12'
    },
    getStyleClass() {
      if (this.styleClass) {
        return `${this.styleClass}`
      }
      return ''
    }
  }
}
