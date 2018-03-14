Vue.component('skin-picker',{
  template:`
  <div class="skinPicker">
    <button @click="setTheme('default')">默认</button>
    <button @click="setTheme('dark')">暗黑</button>
  </div>
  `,
  methods:{
    setTheme(themeName){
      console.log('改变一下className')
      // v-bing:class="主题class名"
    },
  }
})