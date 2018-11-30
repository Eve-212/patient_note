<template>
<div :class="bsColSize">
  <div :id="anchorIdFormat(schema)"></div>
  <slot name="section-title" :childIsSection="isSection"></slot>
  <slot name="title" :childIsSection="isSection"></slot> 
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Options</th>

      </tr>
    </thead>
    <tbody>
      <tr v-for="(opts,item) in options" :key="item">
        <th scope="row">{{schema.properties[item].title}} : {{value[currentKey][item]}}</th>
        <td>
          <div v-for="(opt,score) in opts" :key="score" class="form-check">
              <input class="form-check-input" v-model="value[currentKey][item]"  type="radio" :name="item" :id="getId([item,score])" :value="score" checked>
              <label class="form-check-label" :for="getId([item,score])">
                  ({{score}} Point) {{opt}}
              </label>
          </div>
        </td>
      </tr>
      
  
      <tr>
        <th scope="row">Total : {{total}} </th>
        <td></td>

      </tr>

    </tbody>
  </table>
</div>
</template>

<script>
//import moment from 'moment'
import Proto from '@/components/mixins/Proto.js'

export default {
  name: 'FuncAssess',
  mixins: [Proto],
  data() {
    return {
      options: {
        bath: [
            "Needs help with bathing more than one part of the body, getting in or out of the tub or shower. Requires total bathing.",
            "Bathes self completely or needs help in bathing only a single part of the body such as the back, genital area or disabled extremity."
        ],
        dress:[
            "Needs help with dressing self or needs to be completely dressed.",
            "Get clothes from closets and drawers and puts on clothes and outer garments complete with fasteners. May have help trying shoes."
        ],
        toilet:[
            "Needs help transferring to the toilet, cleaning self or uses bedpan or commode.",
            "Goes to toilet, gets on and off, arranges clothes, cleans genital area without help."
        ],
        transfer:[
            "Needs help in moving from bed to chair or requires a complete transfer.",
            "Moves in and out of bed or chair unassisted. Mechanical transferring aides are acceptable."
        ],
        continence:[
            "Is partially or totally incontinent of bowel or bladder.",
            "Exercises complete self control over urination and defecation."
        ],
        feed:[
            "Needs Partial or total help with feeding or requires parenteral feeding.",
            "Gets food from plate into mouth without help. Preparation of food may be done by another person."
        ]
        
      }
    }
  },
  computed:{
      total(){
        let $sum=0;
        for(let $item in this.value[this.currentKey] ){
            $sum+=this.value[this.currentKey][$item];
        }
        return $sum;
      }
  },

  mounted() {
      if (this.value[this.currentKey]){
        for (let key in this.schema.properties){
          
          if (this.value[this.currentKey][key]===undefined ){
              this.value[this.currentKey][key]=1;
          }
        }

      }
      
  }
}
</script>
<style>
</style>
