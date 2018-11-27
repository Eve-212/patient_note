import APIClient from 'moleculer-openapi-client'
import lscache from 'lscache'
//import  from 'lscache'
import debounce from 'lodash/debounce'
import note from './api_plugins/note'
import emp from './api_plugins/emp'
import icd from './api_plugins/icd'
let Plugins = {
  note,
  emp,
  icd
}

const OneAPI = function ($cfg) {

  let api = new APIClient($cfg);
  //assing plugins
  
  api.api_loader = api.loader.then(() => {

    for (let service in Plugins) {
      if (api[service]) {
        Plugins[service](api[service]);
      }
    }
    api._loaded = true;
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
