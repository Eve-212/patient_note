<template>
  <div>
    <div v-for="(v, k, index) in list" :key="index">
      <!-- Card Title -->
      <template v-if="sortType === 'completion'">
        <h3 v-if="k === 'incompleted'" class="card_title">未完成</h3>
        <h3 v-else class="card_title">已完成</h3> 
      </template>
      <template v-else-if="sortType === 'doc_id'">
        <h3 class="card_title">
          <emp-span class="mr-1" :id="k" :hide_id="true"></emp-span>
          <small class="text-muted">醫師</small>
        </h3> 
      </template>
      <template v-else="sortType === 'bed_no'">
        <h3 class="card_title"><span>{{k}}</span> 
          <small class="text-muted ml-1">樓</small>
        </h3>
      </template>

      <!-- Card Content -->
      <div class="card_wrap mb-4">
        <div class="card mt-2 mr-sm-2 mr-0" v-for="(v1, index1) in v" :key="index1">
          <div class="card-header">
            <span class="bed_no px-1 py-1" :class="{ female: v1.ipd.sex == '0' }">{{v1.ipd.bed_no}}</span>｜<span class="font-weight-bold">{{v1.ipd.name}}</span>
            <small class="text-muted float-right">{{v1.ipd.chr_no}}</small>
          </div>
          <div class="card-body">
            <p class="mb-0">{{ age(v1.ipd.birthdate) }} y/o, {{sex(v1.ipd.sex)}}</p>
            <div v-if="v1.ipd.icd10_in[0]"><ICDSpan :icd="v1.ipd.icd10_in[0]"></ICDSpan></div>
            <p>主責醫師：<EmpSpan class="mr-1" :id="v1.ipd.doc_id" :hide_id="true"></EmpSpan></p>
            <div class="d-flex">
              <div v-for="n in 3">
                <button 
                  class="btn btn-sm mx-1 px-1"
                  title="2018-10-12 未完成">
                  <span v-if="n === 1">住院</span>
                  <span v-if="n === 2">Prog.</span>
                  <span v-if="n === 3">出院</span>
                  <span class="badge badge-danger text-white">1</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ICDSpan from '@/components/sys/ICDSpan.vue'
import EmpSpan from '@/components/sys/EmpSpan.vue'

export default {
  components: {
    ICDSpan,
    EmpSpan
  },
  props: ['sortType', 'list'],
  methods: {
    sex(value) {
      return value ? 'male' : 'female'
    },
    age(value) {
      return parseInt(
        (Date.now() - Date.parse(value)) / (60 * 60 * 24 * 365 * 1000)
      )
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/sass/main.scss';
.card_title {
  border-bottom: 1px lighten($color-grey-dark, 20%) solid;
  padding-bottom: 5px;
  text-transform: capitalize;
  span {
    font-size: 1.5rem;
    font-weight: 400;
  }
  small {
    font-size: $default-font-size;
  }
}
.card_wrap {
  display: flex;
  flex-wrap: wrap;
  font-size: $default-font-size;
  .card {
    width: 15rem;
    border-left: 4px solid $color-tertiary;
    &.incompleted {
      border-left: 4px solid $color-secondary-light;
    }
    @media screen and (max-width: $break-small) {
      width: 100%;
    }
    .card-header {
      .bed_no {
        background: $color-primary;
        color: $color-white;
        border-radius: 5px;
        &.female {
          background: $color-secondary-light;
        }
      }
    }
    .card-body {
      @media screen and (max-width: $break-small) {
        padding: px-to-vw(18, 450);
      }
    }
    button {
      font-size: 12px;
      background: darken($color-grey-light, 5%);
    }
  }
}
</style>