import axios from 'axios';
const APIClient = class{
	constructor($cfg){
		Object.assign(this,$cfg);
		
		this.loader=axios.get(this.spec_url).then($res=>{
            if (this.api_mode==='openapi'){
                this._build_openapi($res.data);
            }else{
                this._build($res.data);
            }
		});
		
		
		
    }
    _build($spec){
		this._spec=$spec;
        this._services=[];
        for (let $ao of $spec){
            let [$service,$action] = $ao.name.split(".");
            if (!this[$service]){
                this[$service]={};
                this._services.push($service);
            }
            let self=this;
            this[$service][$action]=function($params){
                let $opt={
                    method:'post',
                    url:self.server_url+'/'+ $ao.name
                };
                if($params){
                    $opt.data=$params;
                }
                return axios($opt);
            }
        }
    }
	_build_openapi($spec){
		this._spec=$spec;
        this._services=[];
        
		for (let $path_name in $spec.paths){
			let $res=$spec.paths[$path_name];
			for (let $method in $res){
				if ($res[$method].operationId){
					let [$service,$action] = $res[$method].operationId.split(".");
					if (!this[$service]){
						this[$service]={};
						this._services.push($service);
					}
					let self=this;
					this[$service][$action]=function($params){
						let $opt={
							method:$method,
							url:self.server_url+'/'+$res[$method].operationId
						};
						if($params){
							if (['get','delete'].includes($method)){
								$opt.params=$params;
							}else{
								$opt.data=$params;
							}
							
						}
						return axios($opt);
					}
				}
				
			}
		}
	}
};

export default APIClient;