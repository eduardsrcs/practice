new VueW3CValid({
  el: '.sample'
})

new Vue({
  el: '.sample',
  data: {
    hello: 'Hello',
    layers: [],
    layerTypes: {
      bisquit: {
        price1sm: 50,
        label: 'Бисквит'
      },
      beze: {
        price1sm: 100,
        label: 'Безе'
      },
      curd: {
        price1sm: 60,
        label: 'Творог'
      }
    },
    defaultLayerType: 'bisquit',
    defaultHeight: 4
  },
  computed: {
    price(){
      let sum = 0

      this.layers.forEach(layer => {
        sum += layer.height * this.layerTypes[layer.type].price1sm
      })

      return sum
    },
    hasLayers() {
      return this.layers.length > 0
    }
  },
  methods: {
    addLayer() {
      this.layers.push({
        type: this.defaultLayerType,
        height: this.defaultHeight
      })
    },
    changeHeight(i, dh){
      this.layers[i].height +=dh
    },
    deleteLayer(i) {
      this.layers.splice(i, 1)
    }
  }
})