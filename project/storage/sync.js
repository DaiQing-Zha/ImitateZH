import {getLastedNews} from '../main/webApi';

storage.sync = {

  async home(params){
    let {id,syncParams,resolve,reject}=params;
    let res;
    try{
      switch (id) {
        case "lasted":
          res = await getLastedNews();
          break;
        default:
        break;
      }
      storage.save({
        key:'home',
        id,
        data:res,
      });
      resolve && resolve(res);
    }catch(err){
      reject && reject(err);
    }
  },
}
