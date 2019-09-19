const app = new Vue({
  el: '#app',
  data: {
    images: [],
  },
  async created() {
    axios.get('http://localhost:5000').then(({data}) => {
      this.images = [...data, ...this.images];
    });
    const pusher = new Pusher('e94e4b161653eb3cdc73', {
      cluster: 'eu',
      encrypted: true,
    });
    const channel = pusher.subscribe('gallery');
    channel.bind('upload', data => {
      console.log('Upload event');
      this.images = [data.image, ...this.images]
    });
  },
})