<script>
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QUploaderBase } from 'quasar'
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  name: 'FirebaseUploaderComponent',
  mixins: [QUploaderBase],
  props: {
    path: String
  },
  data () {
    return {
      uploading: false,
      uploadTasks: []
    }
  },
  computed: {
    isUploading () {
      return this.uploading
    },
    isBusy () {
      return this.uploading
    }
  },
  methods: {
    abort () {
      this.uploadTasks.forEach(uploadTask => {
        uploadTask.cancel()
      })
      this.uploading = false
    },
    upload () {
      if (this.canUpload === false) {
        return
      }

      this.uploading = true

      this.files.forEach(file => {
        const datetime = new Date().toISOString().split('.')[0]
        const newRef = String(this.path) + String(datetime) + '_' + String(file.name)
        const uploadTask = firebase.storage().ref(newRef).put(file)

        this.uploadTasks.push(uploadTask)

        uploadTask.on(
          'state_changed',
          snapshot => (this.uploadedSize += snapshot.bytesTransferred),
          error => {
            console.log('there is a error @ uploadTask')
            console.log(error)
          },
          () => {
            console.log('state changed @ uploadTask')
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
              this.$emit('upload', {
                url: downloadURL,
                name: file.name,
                uploadedDate: datetime
              })
            //   this.removeFile(file)
            })

            // this.uploadedSize - this.uploadSize === 0 &&
            //   (this.uploading = false)
            this.uploading = false
          }
        )
      })
    }
  }
}
</script>
