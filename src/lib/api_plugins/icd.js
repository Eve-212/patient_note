import debounce from 'lodash/debounce'
export default function($sc) {
    //$sc.db_list=debounce($sc.list,100);
    Object.assign($sc, {
      cache: {},
      format_code($raw_code) {
        //remove .
        return $raw_code.replace(".", "");
      },
      icd_queue: [],
      event_queue: [],
      bulk_list() {
        this.list({
          codes: this.icd_queue
        }).then(({
          data: $icds
        }) => {
          for (let $icd of $icds) {
            this.cache[$icd.code] = $icd;
          }
          for (let $evt of this.event_queue) {
            $evt();
          }
          this.event_queue = [];
        });
        this.icd_queue = [];
      },
      local_get($icd) {
        return new Promise((res, rej) => {
          if ($icd) {
            $icd = this.format_code($icd);
            if (this.cache[$icd]) {
              res(this.cache[$icd]);
            } else {
              this.icd_queue.push($icd);
              this.event_queue.push(() => {
                if (this.cache[$icd]) {
                  res(this.cache[$icd])
                } else {
                  res({
                    label: ""
                  })
                }

              })
              this.db_bulk_list();
              //return this.list({codes:[$icd]}).then($icds=>{});
            }
          } else {
            //return nothing
            res({});
          }
        });
      }

    });
    $sc.db_bulk_list = debounce($sc.bulk_list, 100);
  }