import APIClient from 'moleculer-openapi-client'
import lscache from 'lscache'
//import  from 'lscache'
import debounce from 'lodash/debounce'
let Plugins = {
  icd($sc) {
	//$sc.db_list=debounce($sc.list,100);
	
	Object.assign($sc,{
		cache:{},
		format_code($raw_code){
			//remove .
			return $raw_code.replace(".","");
		},
		icd_queue:[],
		event_queue:[],
		bulk_list(){
			this.list({codes:this.icd_queue}).then(({data:$icds})=>{
				for (let $icd of $icds){
					this.cache[$icd.code]=$icd;
				}
				for (let $evt of this.event_queue){
					$evt();
				}
				this.event_queue=[];
			});
			this.icd_queue=[];
		},
		local_get($icd){
			return new Promise((res,rej)=>{
				$icd=this.format_code($icd);
				if (this.cache[$icd]){
					res(this.cache[$icd]);
				}else{
					this.icd_queue.push($icd);
					this.event_queue.push(()=>{
						if (this.cache[$icd]){
							res(this.cache[$icd])
						}else{
							res({label:""})
						}
						
					})
					this.db_bulk_list();
					//return this.list({codes:[$icd]}).then($icds=>{});
				}
			

			});
		}

	});
	$sc.db_bulk_list=debounce($sc.bulk_list,100);
  }
}

const OneAPI = function ($cfg) {

  let api=new APIClient($cfg);
  //assing plugins
  api.loader.then(() => {
    for (let service in Plugins) {
      if (api[service]) {
        Plugins[service](api[service]);
      }
    }
  })
  return api;




}
export default OneAPI
