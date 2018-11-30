export default {
  props: {
    schema: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      default() {
        return null
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
    },
    sectionKeys: {
      type: Array      
    },
    bsColSize: {
      type: Number
    },
    styleClass: {
      type: Array
    },
    placeholder: {
      type: String
    },
    inputGroup: {
      type: Boolean,
      default() {
        return false
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
    val: {
      get() { return this.value },
      set(val) {this.$emit('input', val)}
    },
    isSection() {
      return this.$isSection
    },
    getPlaceholder() {
      if (this.placeholder) {
        return this.placeholder
      }
      return ''
    },
    getBsColSize() {
      if (this.bsColSize) {
        return `col-lg-${this.bsColSize} col-md-6 col-12`
      }
      return 'col-md-12'
    },
    getStyleClass() {
      if (this.styleClass) {
        return `${this.styleClass}`
      }
      return ''
    }
  },
  created() {
    // add isSection property to first level components
    if (!this.$isSection && this.sectionKeys.includes(this.currentKey)) {
      this.$isSection = true
    }          
  }
}
