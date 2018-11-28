import APIClient from './moleculer-api-client'

import lscache from 'lscache'
//import  from 'lscache'
import debounce from 'lodash/debounce'
import note from './api_plugins/note'
import emp from './api_plugins/emp'
import icd from './api_plugins/icd'
import jwt_decode from 'jwt-decode'
let Plugins = {
  note,
  emp,
  icd
}

const OneAPI = function ($cfg={}) {
  $cfg.spec_url=$cfg.server_url+'/~node/actions'
  let api = new APIClient($cfg);
  //assing plugins
  //api.jwt=jwt;
  api.api_loader = api.loader.then(() => {

    for (let service in Plugins) {
      if (api[service]) {
        Plugins[service](api[service]);
      }
    }
    api._loaded = true;
    api.set_jwt_token=function(token){
      if (token){
        this.jwt_token=token;
        this.auth.data=jwt_decode(token);
        lscache.set('jwt_token',token);
      }
      
    };
    
    api.set_jwt_token(lscache.get('jwt_token'));
    
    api.axios.interceptors.response.use(function(res){
      //console.log(res);
      if (res.headers['set-x-wfauth']){
        api.set_jwt_token(res.headers['set-x-wfauth']);
      }
      return res;
    });
    api.axios.interceptors.request.use(function(req){
      //console.log(req);
      if (api.jwt_token){
        req.headers['X-WfAuth']=api.jwt_token;

      }
      return req;
    });
    return api;
  })
  api.ready = function () {
    if (this._loaded) {
      return Promise.resolve(this);
    } else {
      return api.api_loader;
    }

  }

  return api;
}
export default OneAPI
