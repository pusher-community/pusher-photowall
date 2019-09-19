const app = new Vue({
  el: '#app',
  data: {
    selectedFile: null,
    loading: false,
    images: []
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
  methods: {
    fileChangedHandler(event) {
      this.loading = true;
      this.selectedFile = event;
      const formData = new FormData();
      formData.append(
        'image',
        this.selectedFile,
        new Date()
      );
      axios.post('http://localhost:5000/upload', formData).then(() => {
        this.loading = false;
      });
    },
  },
})

let capture; 
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, (windowWidth/100)*70);
  capture = createCapture(VIDEO);
  capture.size(500, 500);
  capture.hide();
  canvas.parent('#cvs')
  background(255, 0, 200);
}

function draw() {
  background(0);
  image(capture, 0, 0, width, height);
}

async function keyPressed() {
  const c = document.querySelectorAll('canvas')[0]
  const d = c.toDataURL('image/png');
  const b = await fetch(d).then(r=>r.blob())
  app.fileChangedHandler(b);
  return false; 
}