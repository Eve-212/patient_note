<template>
  <div class="tree-style">   
    <tree-charter :json="treeData"></tree-charter>
  </div>  
</template>

<script>
import TreeCharter from './TreeCharter'

export default {
  name: 'FamilyTree',
  components: {
    TreeCharter
  },
  data() {
    return {
      treeData: {
        name: '77',
        image_url: 'https://image.flaticon.com/icons/svg/136/136830.svg',
        mate: {
          name: '73',
          image_url: 'https://image.flaticon.com/icons/svg/32/32341.svg'
        },
        children: [
          {
            name: '56',
            image_url: 'https://image.flaticon.com/icons/svg/109/109553.svg'
          },
          {
            name: '53',
            image_url:
              'data:image/png;base64,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',
            mate: {
              name: '50',
              image_url: 'https://image.flaticon.com/icons/svg/118/118797.svg'
            },
            children: [
              {
                name: '30',
                image_url:
                  'data:image/png;base64,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'
              },
              {
                name: '31',
                image_url: 'https://image.flaticon.com/icons/svg/106/106874.svg'
              },
              {
                name: '37',
                image_url: 'https://image.flaticon.com/icons/svg/106/106874.svg'
              }
            ]
          },
          {
            name: '46',
            image_url: 'https://image.flaticon.com/icons/svg/136/136830.svg'
          }
        ]
      }
    }
  }
}
</script>

<style>
.tree-style {
  overflow-x: scroll;
}
</style>
