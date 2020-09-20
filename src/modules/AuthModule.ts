import { SetupContext } from '@vue/composition-api'
import firebase from 'firebase/app'
import 'firebase/auth'
import * as firebaseui from 'firebaseui'

export default ({ root }: SetupContext) => {
  const startUi = () => {
    const uiConfig = {
      signInSuccessUrl: '/',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ]
    }
    const ui =
            firebaseui.auth.AuthUI.getInstance() ||
            new firebaseui.auth.AuthUI(root.$auth)
    ui.start('#firebaseui-auth-container', uiConfig)
  }
  const signout = () => {
    // eslint-disable-next-line no-void
    void root.$auth.signOut()
  }
  return { startUi, signout }
}
