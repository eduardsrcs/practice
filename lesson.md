# Vue.js - варианты применения на практике

[video lesson](https://www.youtube.com/watch?v=8SeI7Vyfvcc&t=31s)

## Resources

[Bootstrap vue docs](https://bootstrap-vue.org/docs) &mdash; Get started with BootstrapVue, based on the world's most popular framework - Bootstrap v4, for building responsive, mobile-first sites using Vue.js.

[Vue CLI](https://cli.vuejs.org) &mdash; Standard Tooling for Vue.js Development. Vue CLI is a full system for rapid Vue.js development.

## Insert vue and bootstrap into project

### create html

[time 12:00](https://www.youtube.com/watch?v=8SeI7Vyfvcc&t=720s)

Create `index.html` and `main.js` 

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project</title>
  <link rel="icon" href="data:,">
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <div class="container">
    <div class="sample">
      <h2>Cake builder</h2>
      {{hello}}
      <hr>
      <button class="btn btn-primary">Add layer</button>
      <hr>
      <div class="row">
        <div class="col col-sm-6">
          <div class="cake">
            <div class="layer"></div>
          </div>
        </div>
        <div class="col col-sm-6">
          <table class="table table-bordered">
            <tr>
              <th>Type</th>
              <th>Height</th>
              <th>Actions</th>
            </tr>
            <tr>

            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>

  <script src="js/vue.js"></script>
  <script src="js/main.js"></script>
</body>
</html>

```

`main.js`

```js
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

  },
  methods: {
    
  }
})
```

### add click event to button and method

```vue
<button class="btn btn-primary" @click="addLayer">Add layer</button>
```

```js
{
  methods: {
    addLayer() {
      this.layers.push({
        type: this.defaultLayerType,
        height: this.defaultHeight
      })
    }
  }
}
```

according to this:

```vue
<div
  class="layer"
  v-for="layer in layers">
    {{layer.type}}
</div>
...
<tr v-for="(layer, index) in layers">
  <td>{{index + 1}}</td>
  <td>{{layer.type}}</td>
  <td>{{layer.height}}</td>
</tr>
```

we see new lines on each button press

add class to div with class "layer":

```vue
:class="'layer-' + layer.type"
:style="{height: layer.height * 6 + 'px'}"
```

## Changing type and height of layers

```vue
<tr v-for="(layer, index) in layers">
  <td>
    <select class="form-control" v-model="layers[index].type">
      <option
        :value="key"
        v-for="(lt, key) in layerTypes"
        v-model="layers[index].type"
        >
        {{lt.label}}
      </option>
    </select>
  </td>
  <td>
    <input
      type="text"
      class="form-control"
      v-model.number="layer.height"
    >
  </td>
  <td>
    <button
      class="btn btn-danger"
      @click="deleteLayer(index)"
    >
      Delete Layer
    </button>
  </td>
</tr>
```



add method:

```js
changeHeight(i, dh){
  this.layers[i].height += dh
}
```

subscribe:

```vue
<div
  class="layer"
  :class="'layer-' + layer.type"
  :style="{height: layer.height * 6 + 'px'}"
  v-for="(layer, i) in layers"
  @click="changeHeight(i, 1)"
  @contextmenu.prevent="changeHeight(i, -1)"
  >
    
</div>
```

Add Delete layer button

```js
deleteLayer(i) {
  this.layers.splice(i, 1)
}
```

## Price counting

```vue
<div class="alert alert-success price w-25 text-center">
  <span class="price">
    {{price}}
  </span>
</div>
```

```js
computed: {
  price(){
    let sum = 0

    this.layers.forEach(layer => {
      sum += layer.height * this.layerTypes[layer.type].price1sm
    })

    return sum
  }
},
```

## Hide Price when no layers set

in *computed*:

```js
hasLayers() {
  return this.layerTypes.length > 0
}
```



## HTML Validation

Use either components or vue-valid-w3c library

### vue-w3c-valid library

from [this page](https://unpkg.com/browse/vue-w3c-valid@0.0.9/readme.md)

```html
<script src="https://unpkg.com/vue-w3c-valid/dist/simple.js"></script>
```

insert after **vue.js** script.

and then:

```js
new VueW3CValid({
  el: '.sample'
})

new Vue({
 el: '.sample' 
})
```

then replace in html:

@click to data-v_on_click
@contextmenu to data-v-on_contextmenu
:class to data-v-bind_class
:style to data-v-bind_style
v-for to data-v-for

### As component

[time 1:03:50](https://www.youtube.com/watch?v=8SeI7Vyfvcc&t=3830s)

This requires using components.

in `main.js` write

```js
Vue.component('app-cake', {
  // insert template here - div.sample move from index.html 
  // move all previous object
  // don't forget make data section as function
})
```

in index.html write:

```html
<div class="container">
  <div class="cake">
    <div is="app-cake"></div>
  </div>
</div>
```

## Use Vue-cli

```bash
npm i -g @vue/cli-init
vue init webpack-simple cli
```

To get started:

```bash
cd cli
npm install
npm run dev
```
remove `src/App.vue` :), src/assets

```bash
rm src/App.vue
rm -rf src/assets
touch src/App.vue
```

copy template from previous example.

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>cli</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div class="container">
      <div id="app"></div>
    </div>
    <script src="/dist/build.js"></script>
  </body>
</html>

```

`App.vue`

```vue
<template>
  <div class="sample">
      <h2>Cake builder</h2>
      {{hello}}
      <hr>
      <button class="btn btn-primary" @click="addLayer">Add layer</button>
      <hr>
      <div class="row">
        <div class="col col-sm-6">
          <div class="cake">
            <div
              class="layer"
              :key="i"
              :class="'layer-' + layer.type"
              :style="{height: layer.height * 6 + 'px'}"
              v-for="(layer, i) in layers"
              @click="changeHeight(i, 1)"
              @contextmenu.prevent="changeHeight(i, -1)"
              >

            </div>
          </div>
        </div>
        <div class="col col-sm-6">
          <table class="table table-bordered"  v-show="hasLayers">
            <tr>
              <th>Type</th>
              <th>Height</th>
              <th>Actions</th>
            </tr>
            <tr v-for="(layer, index) in layers" :key="index">
              <td>
                <select class="form-control" v-model="layers[index].type">
                  <option
                    :value="key"
                    v-for="(lt, key) in layerTypes"
                    v-model="layers[index].type"
                    :key="key"
                    >
                    {{lt.label}}
                  </option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  class="form-control"
                  v-model.number="layer.height"
                >
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  @click="deleteLayer(index)"
                >
                  Delete Layer
                </button>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="alert alert-success price w-50 text-center" v-show="hasLayers">
        <span class="price">
          {{price}} EUR
        </span>
        <button class="btn btn-warning">
          Order now!
        </button>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
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
    }
  } ,
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
}
</script>

```

voila!

## Inserting code into other project

just build previous example and use .js file in another project, create html element too!

## Including Bootstrap with npm

look at [vue-bootstrap page](https://bootstrap-vue.org/docs/#using-module-bundlers)

```bash
npm i bootstrap-vue
```

in `main.js`

```js
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
```

### Insert modal

[look at this page](https://bootstrap-vue.org/docs/components/modal)

insert in `main.js`

```js
import { BModal } from 'bootstrap-vue'
Vue.component('b-modal', BModal)
```

subscribe an event:

`App.vue`

```vue
<button
  class="btn btn-warning"
  @click="confirmForm = true"
>
  Order now!
</button>
<b-modal v-model="confirmForm">
  Really order?
</b-modal>
data() {
  return {
    confirmForm: false,
```

## Pre rendering (SEO optimization)

Useful when conent is not often updated.

## SSR

usually requires node.js based web server.

### Nuxt.js