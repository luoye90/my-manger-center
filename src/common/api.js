import axios from 'axios'

// const baseURL = "http://120.79.153.232";
axios.defaults.timeout = 1000*10;
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default{
  /**
   * 获取数据公用方法
   */
  _getData:function(options){
    let params = {
      method:options.method,
      // url:baseURL+options.url,
      url:options.url,
    }
    options.method === "GET" ? params.params = options.data : params.data = options.data;
    return axios(params)
  },
  /**
   * 获取收入数据
   */
  getIncomeData:function(){
    let options = {
      method:'GET',
      url:`mockData/inCome.json?date=${new Date().getTime()}`,
    };
    return this._getData(options);
  },
  /**
   * 获取负债数据
   */
  getDebtsData:function(){
    let options = {
      method:'GET',
      url:`mockData/debts.json?date=${new Date().getTime()}`,
    };
    return this._getData(options);
  }
}