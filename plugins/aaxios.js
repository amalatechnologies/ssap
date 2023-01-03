export default function ({ $axios,  store,redirect }) {
    $axios.onRequest(config => {
      const token = localStorage.getItem('accessToken')
      $axios.setHeader('Content-Type', 'application/json; charset=utf8')
      $axios.setHeader('crossorigin','true')
      $axios.setHeader("Access-Control-Allow-Origin", "*");
      $axios.setHeader("Access-Control-Allow-Credentials", "true")
       $axios.setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With");
     
      $axios.setHeader('Cache-Control: no-cache, no-store, must-revalidate');
      $axios.setHeader('Pragma: no-cache');
      $axios.setHeader('Expires: 0');

      var _tenant = localStorage.getItem('tenant');
      var tenant = _tenant == null ? "demo" : _tenant;
      console.log(tenant)
  
      api.setHeader("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
      api.setHeader("Fineract-Platform-TenantId", tenant.trim())
      api.setHeader("Access-Control-Allow-Origin", "*");
      if (config.url != "authentication" && token != null) {
        api.setHeader("Authorization", "Basic " + token);
      }
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        redirect('/400')
      }
      if (code === 401) {
        store.dispatch('_logoutsession')
      }
    })
    $axios.onResponseError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 404) {
        const message = error.response.data.defaultUserMessage
        Vue.toasted.error(`${message}`, {
          icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'error',
          theme: 'bubble', duration: 5000
        });
      }
      if (code === 401) {
        const message = error.response.data.defaultUserMessage;
        Vue.toasted.error(`${message}`, {
          icon: 'close-circle', position: 'top-center', keepOnHover: true, type: 'info',
          theme: 'outline', duration: 5000
        });
      }
    });
  }