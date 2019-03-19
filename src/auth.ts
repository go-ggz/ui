import * as auth0 from 'auth0-js';
import _Vue from 'vue';

// exchange the object with your own from the setup step above.
const webAuth = new auth0.WebAuth({
  domain: 'your_auth0_domain',
  clientID: 'your_auth0_client',
  // make sure this line is contains the port: 8080
  redirectUri: 'http://localhost:8080/callback',
  // we will use the api/v2/ to access the user information as payload
  audience: 'https://' + 'your_auth0_domain' + '/api/v2/',
  responseType: 'token id_token',
  scope: 'openid profile' // define the scopes you want to use
})

let auth = new _Vue({
  computed: {
    token: {
      get: function() {
        return localStorage.getItem('id_token')
      },
      set: function(id_token: string) {
        localStorage.setItem('id_token', id_token)
      }
    },
    accessToken: {
      get: function() {
        return localStorage.getItem('access_token')
      },
      set: function(accessToken: string) {
        localStorage.setItem('access_token', accessToken)
      }
    },
    expiresAt: {
      get: function() {
        return localStorage.getItem('expires_at');
      },
      set: function(expiresIn: number) {
        const expiresAt = JSON.stringify(expiresIn * 1000 + new Date().getTime())
        localStorage.setItem('expires_at', expiresAt);
      }
    },
    user: {
      get: function() {
        return JSON.parse(localStorage.getItem('user') || "")
      },
      set: function(user: any) {
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  },
  methods: {
    login() {
      webAuth.authorize()
    },
    logout() {
      return new Promise((resolve, reject) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        localStorage.removeItem('user')
        webAuth.logout({
          returnTo: 'http://SOMEWHERE.ELSE.com', // Allowed logout URL listed in dashboard
          clientID: 'your_auth0_client_id', // Your client ID
        })
      })
    },
    isAuthenticated() {
      return new Date().getTime() < Number(this.expiresAt)
    },
    handleAuthentication() {
      return new Promise((resolve, reject) => {
        webAuth.parseHash((err, authResult) => {

          if (authResult && authResult.accessToken && authResult.idToken) {
            this.expiresAt = Number(authResult.expiresIn);
            this.accessToken = authResult.accessToken;
            this.token = authResult.idToken;
            this.user = authResult.idTokenPayload;
            resolve();

          } else if (err) {
            this.logout();
            reject(err);
          }

        })
      })
    }
  }
})

export default {
  install(Vue: typeof _Vue, options: any) {
    Vue.prototype.$auth = auth;
  },
  auth
};
