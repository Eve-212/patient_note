import debounce from 'lodash/debounce'
export default function($sc){
    Object.assign($sc, {
		cache: {},
		id_queue: [],
		event_queue: [],
		bulk_list() {
		  this.list({
			ids: this.id_queue
		  }).then(({
			data: $emps
		  }) => {
			for (let $emp of $emps) {
			  this.cache[$emp.id] = $emp;
			}
			for (let $evt of this.event_queue) {
			  $evt();
			}
			this.event_queue = [];
		  });
		  this.emp_queue = [];
		},
		local_get($id) {
		  return new Promise((res, rej) => {
			if ($id) {
			  //$icd = this.format_code($icd);
			  if (this.cache[$id]) {
				res(this.cache[$id]);
			  } else {
				this.id_queue.push($id);
				this.event_queue.push(() => {
				  if (this.cache[$id]) {
					res(this.cache[$id])
				  } else {
					res({
					  name: ""
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