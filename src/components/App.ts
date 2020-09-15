import {Vue, Component, Watch} from 'vue-property-decorator'
import { API, HTTP } from '../services/http';
import Render from './App.html'

@Render
@Component({})

export default class App extends Vue {

  @Watch('form.rover.selected')
  onRoverChanged(val: string, oldVal: string) {
    this.form.camera.selected = 'all';
    this.form.date.selected = '';
    this.loadManifest();
  }

  @Watch('form.date.selected')
  ondaterChanged(val: string, oldVal: string) {
    console.log(val);
    this.form.camera.available = this.manifest.photos.find(sol => sol.earth_date = val).cameras;
    this.form.camera.selected = 'all';
  }

  images:any = [];
  manifest:any = {};

  form = {
    rover: {
      selected: 'curiosity',
      options: [
        { value: 'curiosity', text: 'Curiosity' },
        { value: 'opportunity', text: 'Opportunity' },
        { value: 'spirit', text: 'Spirit' }
      ]
    },
    camera: {
      selected: 'all',
      available: []
    },
    date: {
      selected: '',
      min: '',
      max: ''
    },
    sol: 1000,
    page: 1,
  }

  loadData() {
    API.getRoverPhotos(this.form.rover.selected, {
      camera: this.form.camera.selected,
      earth_date: this.form.date.selected
    }).then(data => {
      if(data?.photos.length > 0) {
        this.images = data.photos;
      }
    });
  }

  loadManifest() {
    API.getManifest(this.form.rover.selected)
      .then(data => {
        this.manifest = data.photo_manifest;
        this.form.date.min = data.photo_manifest.landing_date;
        this.form.date.max = data.photo_manifest.max_date;
        this.form.date.selected = data.photo_manifest.landing_date;
      });
  }

  validCamera(cameraId:String): boolean {
    return !!this.form.camera.available.find(id => id === cameraId);
  }

  onSubmit(ev:Event) {
    ev.preventDefault();
    this.loadData();
    console.log(`onSubmit`);
  }

  onReset(ev:Event) {
    ev.preventDefault();
    console.log(`onReset`);
  }

  mounted() {
    this.loadManifest();
  }
}