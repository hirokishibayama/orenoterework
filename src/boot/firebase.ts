/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { boot } from 'quasar/wrappers'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// import 'firebase/analytics'
import RefUserModule from 'src/modules/database/RefUser'

const firebaseConfig = {
  apiKey: 'AIzaSyBdtVCwwXAMES29aDwI3t6Tyek5bRn9zV8',
  authDomain: 'orenotelework.firebaseapp.com',
  databaseURL: 'https://orenotelework.firebaseio.com',
  projectId: 'orenotelework',
  storageBucket: 'orenotelework.appspot.com',
  messagingSenderId: '586889053371',
  appId: '1:586889053371:web:f3115ebf90c02bbd24959e',
  measurementId: 'G-CPWPRTZEJ8'
}

declare module 'vue/types/vue' {
  interface Vue {
    $auth: firebase.auth.Auth;
    $displayName: string;
    $userId: string;
  }
}

export default boot(({ router, Vue }) => {
  const fireApp = firebase.initializeApp(firebaseConfig)
  //   firebase.analytics()
  firebase
    .firestore()
    .enablePersistence({ synchronizeTabs: true })
    .catch(function (err) {
      if (err.code === 'failed-precondition') {
        console.log(
          'Multiple tabs open, persistence can only be enabled in one tab at a a time.'
        )
      } else if (err.code === 'unimplemented') {
        console.log(
          'The current browser does not support all of the features required to enable persistence'
        )
      }
    })

  Vue.prototype.$auth = fireApp.auth()

  const refUserModule = RefUserModule()
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth) {
      console.log('auth is required to view this page.')
      Vue.prototype.$auth.onAuthStateChanged(function (user: any) {
        console.log(user)
        if (!user) {
          next({
            path: '/auth',
            query: { redirect: to.fullPath }
          })
        } else {
          console.log(`userid: ${user.uid}`)
          if (user.displayName && user.displayName !== '') {
            Vue.prototype.$displayName = user.displayName
          }
          if (user.uid) {
            refUserModule.checkAndCreateNewUser(user.uid)
            Vue.prototype.$userId = user.uid
          }
          next()
        }
      })
    } else if (to.path === '/auth') {
      Vue.prototype.$auth.onAuthStateChanged(function (user: any) {
        if (user) {
          if (user.displayName && user.displayName !== '') {
            Vue.prototype.$displayName = user.displayName
          }
          if (user.uid) {
            refUserModule.checkAndCreateNewUser(user.uid)
            Vue.prototype.$userId = user.uid
          }
          next('/')
        } else {
          next()
        }
      })
    } else {
      next()
    }
  })
})
