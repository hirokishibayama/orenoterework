import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp(functions.config().firebase)

exports.sendNotifications = functions.firestore
  .document('/teleworks/{teleworkId}')
  .onCreate((event, snapshot) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const teleworkId = snapshot.params.teleworkId
    const payload = {
      notification: {
        title: 'New Telework(' + String(teleworkId) + ')',
        body: 'Let\'s check a new telework.'
      }
    }

    const options = {
      priority: 'high'
    }

    const topic = 'teleworks'
    return admin
      .messaging()
      .sendToTopic(topic, payload, options)
      .then(function (response) {
        return console.log('Successfully sent message:', response)
      })
      .catch(function (error) {
        return console.log('Error sending message:', error)
      })
  })
