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
        return ''
      }
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
    clearInput() {
      // this.value[this.currentKey] = null
      let initValue = null
      switch (this.$options.name) {
        case 'TextInput':
          initValue = ''
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'NumberInput':
          initValue = ''
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'Checkbox':
          initValue = false
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'CheckList':
          initValue = []
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'CheckListWithOther':
          initValue = []
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'RadioInput':
          initValue = ''
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'SelectDate':
          initValue = ''
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'SelectList':
          initValue = ''
          this.$set(this.value, this.currentKey, initValue)
          break
        case 'bsRadioInput':
          initValue = ''
          this.$set(this.value, this.currentKey, initValue)
          break
      }
    },
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
    getPlaceholder() {
      if (this.schema.attrs) {
        if (this.schema.attrs.placeholder) {
          return this.schema.attrs.placeholder
        }
      }
      return ''
    }
  },
  computed: {
    bsColSize() {
      if (this.schema.attrs.bsColSize) {
        return `col-lg-${this.schema.attrs.bsColSize}`
      }
      return 'col-lg-12'
    },
    styleClass() {
      if (this.schema.attrs.styleClass) {
        return `${this.schema.attrs.styleClass}`
      }
      return ''
    },
    showInputField() {
      let schemaAttrs = this.schema.attrs
      //dependsOn name is Array?
      if (schemaAttrs) {
        if (schemaAttrs.dependsOn) {
          if (schemaAttrs.dependsOn.values && schemaAttrs.dependsOn.name) {
            if (Array.isArray(this.value[schemaAttrs.dependsOn.name])) {
              for (let i = 0; i < schemaAttrs.dependsOn.values.length; i++) {
                if (this.value[schemaAttrs.dependsOn.name].indexOf(
                    schemaAttrs.dependsOn.values[i])) {
                  return true
                } else {
                  this.clearInput()
                  return false
                }
              }
            } else {
              if (
                schemaAttrs.dependsOn.values.indexOf(
                  this.value[schemaAttrs.dependsOn.name]
                ) !== -1
              ) {
                return true
              } else {
                this.clearInput()
                return false
              }
            }
          }
          return true
        }
        return true
      }
      return true
    }
  }
}
