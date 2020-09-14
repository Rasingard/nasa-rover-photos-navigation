import {Vue, Component, Prop} from 'vue-property-decorator'
import Render from './App.html'

@Render
@Component({})

export default class App extends Vue {
  @Prop({type: Number, default: 0}) start: number | undefined

  number: number = 0

  mounted () {
    window.setInterval(() => {
      this.number += 1
    }, 1000)
  }
}

/*
@Render
@Component({})

export default class App extends Vue {
  @Prop({type: Number, default: 0}) start: number | undefined

  number: number = 0

  mounted () {
    window.setInterval(() => {
      this.number += 1
    }, 1000)
  }
}
*/