import { SetupContext, reactive, ref } from '@vue/composition-api'
import RefTeleworkModule from 'src/modules/database/RefTelework'
import { TeleworkDataInterface } from './models/teleworkdata'

export default ({ root }: SetupContext) => {
  const dialog = ref(false)
  const alert = reactive({
    message: 'Input thumbnail, title and detail.',
    isVisible: false
  })
  const getUniqueStr = (): string => {
    const strong = 1000
    return (
      new Date().getTime().toString(16) +
            Math.floor(strong * Math.random()).toString(16)
    )
  }
  const refTeleworkModule = RefTeleworkModule()
  const today = new Date()
  const teleworkData: TeleworkDataInterface = reactive({
    teleworkId: getUniqueStr(),
    userId: root.$userId,
    thumbnailUrl: '',
    title: '',
    detail: '',
    created: today.toString(),
    userName: root.$displayName
  })
  const createTeleworkData = (teleworkData: TeleworkDataInterface) => {
    if (teleworkData.thumbnailUrl === '' || teleworkData.title === '' || teleworkData.detail === '') {
      alert.message = 'Input thumbnail, title and detail.'
      alert.isVisible = true
    } else if (teleworkData.detail.length <= 20) {
      alert.message = 'Detail text is too short.'
      alert.isVisible = true
    } else {
      dialog.value = false
      alert.isVisible = false
      refTeleworkModule.createNewTelework(teleworkData.teleworkId, teleworkData)
    }
  }

  const uploaded = (uploadData: any) => {
    console.log('uploaded event was received.')
    console.log(uploadData.url)
    const url = uploadData.url as string
    teleworkData.thumbnailUrl = url
  }

  const teleworks: any[] = refTeleworkModule.teleworks
  return { dialog, alert, teleworkData, createTeleworkData, uploaded, teleworks }
}
