const app = new Vue({
  el: "#app",
  data: {
    images: []
  },
  async created() {
    const pusher = new Pusher("a3e66f033b1c7a3c239d", {
      cluster: "eu",
      encrypted: true
    });
    const channel = pusher.subscribe("gallery");
    channel.bind("upload", data => {
      this.pushNewPhotoToWall(data.image.secure_url);
    });
  },
  methods: {
    pushNewPhotoToWall(url) {
      this.images = [url, ...this.images];
    }
  }
});
