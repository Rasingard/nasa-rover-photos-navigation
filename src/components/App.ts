import {Vue, Component, Watch, PropSync} from 'vue-property-decorator'
import { API, HTTP } from '../services/http';
import Render from './App.html'

@Render
@Component({})

export default class App extends Vue {
  images:any = [];
  manifest:any = {};

  @Watch('form.rover.selected')
  onRoverChanged(val: string, oldVal: string) {
    this.loadManifest();
  }

  @Watch('form.date.selected')
  onDateChanged(val: string, oldVal: string) {
    const source = this.manifest.photos.find((item:any) => item.earth_date === val);

    let firstAvailable:any = undefined;

    this.form.camera.options.forEach(camera => {
      if(source.cameras.find((val:any) => val.toLowerCase() === camera.value)) {
        camera.disabled = false;
        if(!firstAvailable) firstAvailable = camera.value;
      } else {
        camera.disabled = true;
      }
    });

    this.form.camera.selected = firstAvailable;

    if(firstAvailable === this.form.camera.selected) this.loadRoverPhotos();
  }

  @Watch('form.camera.selected')
  onCameraChanged(val: string, oldVal: string) {
    this.loadRoverPhotos();
  }

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
      options: [
        { value: 'fhaz', text: 'Front Hazard Avoidance Camera', disabled: false },
        { value: 'rhaz', text: 'Rear Hazard Avoidance Camera', disabled: false },
        { value: 'mast', text: 'Mast Camera', disabled: false },
        { value: 'chemcam', text: 'Chemistry and Camera Complex', disabled: false },
        { value: 'mahli', text: 'Mars Hand Lens Imager', disabled: false },
        { value: 'mardi', text: 'Mars Descent Imager', disabled: false },
        { value: 'navcam', text: 'Navigation Camera', disabled: false },
        { value: 'pancam', text: 'Panoramic Camera', disabled: false },
        { value: 'minites', text: 'Miniature Thermal Emission Spectrometer (Mini-TES)', disabled: false }
      ]
    },
    date: {
      selected: '',
      min: '',
      max: ''
    },
    sol: 1000,
    page: 1
  }

  loadRoverPhotos() {
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
        this.form.date.selected = this.form.date.max = data.photo_manifest.max_date;
      });
  }

  onSubmit(ev:Event) {
    ev.preventDefault();
    this.loadRoverPhotos();
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