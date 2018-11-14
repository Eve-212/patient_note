<template>
<div :class="getBsColSize">
	<div id="labwrap">
    <div class="scroller">
      <table class="table table-bordered" style="position: relative">
        <thead>
          <tr>
            <th class="sticky-col"></th>
            <th class="px-2 py-2" v-for ="(v, k, index) in lab.blood">{{ v.id }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(v, k, index) in lists">
            <th class="px-2 py-2 sticky-col">{{ k }}</th>
            <td
              v-for="(v1, k1, index1) in v"
              class="text-center px-2 py-2"
              :class="{low : v1.mark == 'L', high: v1.mark == 'H'}" 
              >{{ v1.value }}</td>
          </tr>
        </tbody>
      </table>
    </div>
	</div>
</div>
</template>

<script>
import Proto from '@/components/mixins/Proto.js'
export default {
  name: 'bsLabTable',
  mixins: [Proto],
  data() {
    return {
      lists: {},
      lab: {
        blood: [
          {
            id: 'CREB',
            item: 'CREA',
            date: '2018-10-12',
            value: '0.83',
            mark: ''
          },
          {
            id: 'EGFR',
            item: 'eGFR',
            date: '2018-10-12',
            value: '124',
            mark: ''
          },
          { id: 'NA', item: 'Na', date: '2018-10-12', value: '133', mark: 'L' },
          { id: 'K', item: 'K', date: '2018-10-12', value: '3.7', mark: '' },
          {
            id: 'ALT',
            item: 'GPT(ALT)',
            date: '2018-10-12',
            value: '10',
            mark: ''
          },
          {
            id: 'HCT',
            item: 'HCT',
            date: '2018-10-12',
            value: '45.6',
            mark: ''
          },
          {
            id: 'HGB',
            item: 'HGB',
            date: '2018-10-12',
            value: '15.4',
            mark: ''
          },
          {
            id: 'MCH',
            item: 'MCH',
            date: '2018-10-12',
            value: '30.3',
            mark: ''
          },
          {
            id: 'MCHC',
            item: 'MCHC',
            date: '2018-10-12',
            value: '33.8',
            mark: ''
          },
          {
            id: 'MCV',
            item: 'MCV',
            date: '2018-10-12',
            value: '89.8',
            mark: ''
          },
          {
            id: 'PDW',
            item: 'PDW',
            date: '2018-10-12',
            value: '16.68',
            mark: ''
          },
          {
            id: 'PLT',
            item: 'Platelet',
            date: '2018-10-12',
            value: '197',
            mark: ''
          },
          {
            id: 'R-CV',
            item: 'RDW-CV',
            date: '2018-10-12',
            value: '13.0',
            mark: ''
          },
          {
            id: 'RBC',
            item: 'RBC',
            date: '2018-10-12',
            value: '5.08',
            mark: ''
          },
          {
            id: 'WBC',
            item: 'WBC',
            date: '2018-10-12',
            value: '14.56',
            mark: 'H'
          },
          {
            id: 'BASO',
            item: 'Basophil',
            date: '2018-10-12',
            value: '0.20',
            mark: ''
          },
          {
            id: 'EOS',
            item: 'Eosinophil',
            date: '2018-10-12',
            value: '0.10',
            mark: ''
          },
          {
            id: 'LYMP',
            item: 'Lymphocyte',
            date: '2018-10-12',
            value: '9.50',
            mark: 'L'
          },
          {
            id: 'MONO',
            item: 'Monocyte',
            date: '2018-10-12',
            value: '4.80',
            mark: ''
          },
          {
            id: 'NEUT',
            item: 'Neutrophil(seg)',
            date: '2018-10-12',
            value: '85.40',
            mark: 'H'
          },
          {
            id: 'NRBC',
            item: 'NRBC/100WBC',
            date: '2018-10-12',
            value: '0.00',
            mark: ''
          },
          {
            id: 'INR',
            item: 'INR',
            date: '2018-10-12',
            value: '1.080',
            mark: ''
          },
          { id: 'PT', item: 'PT', date: '2018-10-12', value: '13.6', mark: '' },
          {
            id: 'PT-C',
            item: 'Mean Normal Prothrombin Time',
            date: '2018-10-12',
            value: '12.8',
            mark: ''
          },
          {
            id: 'APTT',
            item: 'aPTT',
            date: '2018-10-12',
            value: '33.5',
            mark: ''
          },
          {
            id: 'PTT-C',
            item: 'Mean Normal aPTT',
            date: '2018-10-12',
            value: '38.5',
            mark: ''
          },
          {
            id: 'GLUR',
            item: 'Glu(random)',
            date: '2018-10-12',
            value: '99',
            mark: ''
          }
        ]
      }
    }
  },
  created: function() {
    let sortedData = {}
    this.lab.blood.forEach(function(v, k) {
      sortedData[v.date] == undefined && (sortedData[v.date] = [])
      sortedData[v.date].push(v)
    })
    this.lists = sortedData
  }
}
</script>

<style lang="scss">
@import '../../assets/sass/main.scss';

#labwrap {
  overflow: auto;
  border-left: 1px solid #dee2e6;
  border-right: 1px solid #dee2e6;
  table {
    margin-bottom: 0;
    padding-bottom: 10px;
    thead,
    tbody {
      th {
        font-size: 12px;
        white-space: nowrap;
        background: $color-white;
      }
    }
    td {
      background: $color-white;
      font-size: 12px;
      &.low {
        color: $color-white;
        background: $color-secondary-light;
      }
      &.high {
        color: $color-white;
        background: $color-primary;
      }
    }
  }
  .sticky-col {
    left: 0;
    position: sticky;
    top: auto;
    z-index: 1;
    border: 1px solid $color-grey-light;
  }
}
</style>