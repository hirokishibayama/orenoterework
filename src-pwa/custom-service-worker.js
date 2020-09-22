/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { precacheAndRoute } from 'workbox-precaching'
// precacheAndRoute(self.__WB_MANIFEST)

// self.addEventListener('push', function (event) {
//   // メッセージを表示する
//   console.log('received a message.')
//   console.log(event)
//   var data = {}
//   if (event.data) {
//     data = event.data.json()
//   }
//   var title = data.notification.title || '無題'
//   var message = data.notification.body || 'メッセージが届いています。'
//   event.waitUntil(
//     self.registration.showNotification(title, {
//       body: message
//     })
//   )
// })
