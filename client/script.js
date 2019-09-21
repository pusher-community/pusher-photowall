const app = new Vue({
  el: '#app',
  data: {
    images: []
  },
  async created() {
    const pusher = new Pusher('e94e4b161653eb3cdc73', {
      cluster: 'eu',
      encrypted: true,
    });
    const channel = pusher.subscribe('gallery');
    channel.bind('upload', data => {
      this.pushNewPhotoToWall(data.image.secure_url)
    });
  },
  methods: {
    pushNewPhotoToWall(url) {
      this.images = [url, ...this.images]
    }
  },
})