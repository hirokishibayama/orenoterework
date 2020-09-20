import { SetupContext, reactive } from '@vue/composition-api'
import RefUserModule from 'src/modules/database/RefUser'
import { UserDataInterface } from './models/userdata'

export default ({ root }: SetupContext) => {
  const refUserModule = RefUserModule()
  const userData: UserDataInterface = reactive({
    displayName: 'loading...',
    userId: 'loading...',
    thumbnailUrl: '',
    message: 'loading...',
    created: 'loading...'
  })
  refUserModule.getUserData(root.$userId).then((data: UserDataInterface) => {
    userData.displayName = data.displayName
    userData.userId = data.userId
    userData.thumbnailUrl = data.thumbnailUrl
    userData.message = data.message
    userData.created = data.created
    root.$displayName = data.displayName
    if (data.displayName === '') {
      root.$displayName = 'unknown'
    }
  }).catch((err) => {
    console.log(err)
  })
  const saveUserData = (userData: UserDataInterface) => {
    refUserModule.updateUserData(userData.userId, userData)
    root.$displayName = userData.displayName
  }

  const uploaded = (uploadData: any) => {
    console.log('uploaded event was received.')
    console.log(uploadData.url)
    const url = uploadData.url as string
    userData.thumbnailUrl = url
  }
  return { userData, saveUserData, uploaded }
}
