<template>
  <div>
    <div v-for="(value, key, index) in list" :key="index">
      <!-- Card Title -->
      <template v-if="sortType === 'completion'">
        <h3 v-if="key === 'incompleted'" class="card_title">未完成</h3>
        <h3 v-else class="card_title">已完成</h3> 
      </template>
      <template v-else-if="sortType === 'doc_id'">
        <h3 class="card_title">
          <emp-span class="mr-1" :id="key" :hide_id="true"></emp-span>
          <small class="text-muted">醫師</small>
        </h3> 
      </template>
      <template v-else="sortType === 'bed_no'">
        <h3 class="card_title"><span>{{key}}</span> 
          <small class="text-muted">樓</small>
        </h3>
      </template>
      <!-- Card Content -->
      <div class="card_wrap mb-4">
        <div class="card mt-2 mr-sm-2 mr-0" v-for="(v, index) in value" :key="index">
          <div class="card-header d-flex align-items-center">
            <span class="bed_no px-1 py-1" :class="{ female: v.ipd.sex == '0' }">{{v.ipd.bed_no}}</span>｜
            <router-link 
              class="font-weight-bold" 
              :to="{ name: 'edit', params: { fee_no: v.fee_no }}"
            >{{v.ipd.name}}</router-link>
            <small class="text-muted ml-auto" >{{v.ipd.chr_no}}</small>
          </div>
          <div class="card-body">
            <p class="mb-0">{{ age(v.ipd.birthdate) }} y/o, {{sex(v.ipd.sex)}}</p>
            <div v-if="v.ipd.icd10_in[0]"><ICDSpan :icd="v.ipd.icd10_in[0]"></ICDSpan></div>
            <p>主責醫師：<EmpSpan class="mr-1" :id="v.ipd.doc_id" :hide_id="true"></EmpSpan></p>
            <div class="d-flex">
              <router-link 
                :to="{ name: 'edit', params: { fee_no: v.fee_no }}"
                :class="{disabled:v.admission.status != 'init'}">住院
              </router-link>
              <!-- <button 
                class="btn btn-sm" value="[1,2]"
                :class="{hint:v.progress.length != 0, disabled:v.progress.length == 0}">
                Prog.</button> -->
              <router-link
                :to="{ name: 'edit', params: { fee_no: v.fee_no }}" 
                class="btn btn-sm hint" 
                value="[1,2]">Prog.
              </router-link>
              <router-link
                :to="{ name: 'edit', params: { fee_no: v.fee_no }}"
                :class="{disabled:v.discharge.status != 'init'}">出院
              </router-link>
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
  text-transform: capitalize;
  span {
    font-size: 1.5rem;
    font-weight: 400;
    @media screen and (max-width: $break-medium) {
      font-size: 1.2rem;
    }
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
    width: 16rem;
    border-left: 4px solid $color-tertiary;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 4px 8px 0 rgba(138, 57, 3, 0.1),
        0 4px 8px 0 rgba(0, 0, 0, 0.1);
    }
    &.incompleted {
      border-left: 4px solid $color-secondary-light;
    }
    @media screen and (max-width: $break-large) {
      font-size: 13px;
      width: 14rem;
    }
    @media screen and (max-width: $break-small) {
      width: 100%;
    }
    .card-header {
      a {
        color: $color-black;
        text-decoration: underline;
      }
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
      padding: 0.5rem 1rem;
      @media screen and (max-width: $break-medium) {
        padding: 10px;
      }
      @media screen and (max-width: $break-small) {
        padding: px-to-vw(18, 450);
      }
      a {
        font-size: 12px;
        background-color: #e1e1e1;
        color: #555555;
        margin-right: 5px;
        position: relative;
        transition: all 0.5s;
        padding: 0.25rem 0.5rem;
        border-radius: 0.2rem;
        display: inline-block;
        text-decoration: none;
        border: 1px solid #e1e1e1;
        &.disabled {
          pointer-events: none;
          opacity: 0.5;
        }
        &.hint:before,
        &.hint:after {
          position: absolute;
          left: 0;
          background: 0 0;
          z-index: 1000001;
          pointer-events: none;
          transition: all 0.2s ease;
          opacity: 0;
        }
        &.hint:before {
          content: '';
          bottom: -30px;
          left: 10px;
          border: 6px solid transparent;
          border-bottom-color: #383838;
        }
        &.hint:after {
          content: attr(value);
          bottom: -55px;
          border: 4px solid transparent;
          background: #383838;
          color: $color-white;
          padding: 0 5px;
          box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
        }
        &:hover {
          border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
          border-style: solid;
          border-width: 1px;
          background-color: $color-white;
          &.hint:before {
            bottom: -10px;
            opacity: 1;
          }
          &.hint:after {
            bottom: -36px;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>