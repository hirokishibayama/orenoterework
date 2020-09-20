/* eslint-disable @typescript-eslint/no-unsafe-call */
import firebase from 'firebase/app'
import 'firebase/firestore'
import { TeleworkDataInterface } from '../models/teleworkdata'
import { reactive } from '@vue/composition-api'

export default () => {
  const createNewTelework = (teleworkId: string, teleworkData: TeleworkDataInterface) => {
    const db = firebase.firestore()
    db.collection('teleworks').doc(teleworkId).set(teleworkData).then(() => {
      console.log('successfully created a new telework.')
    }).catch((err) => {
      console.log('failed to create a new telework.')
      console.log(err)
    })
  }
  const teleworks: any[] = reactive([])
  const db = firebase.firestore()
  db.collection('teleworks')
    .onSnapshot((querySnapshot: any) => {
      teleworks.length = 0
      querySnapshot.forEach((doc: any) => {
        teleworks.push(doc.data())
      })
      console.log('teleworks')
      console.log(teleworks)
    })
  return { createNewTelework, teleworks }
}
