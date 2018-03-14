Vue.component('share',{
  props:['shareLink'],
  template:`
  <div class="share" >
    <h2>请将下面链接分享给面试官</h2>
    <div>
      <textarea readonly>{{shareLink}}</textarea>
      <span @click="$emit('close')">X</span>        
    </div>
  </div>
  `,
})