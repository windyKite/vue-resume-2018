Vue.component('app-aside',{
  props:['currentUser'],
  template:`
  <aside>
    <div class="upper">
      <ul class="actions">
        <li>
          <button class="button" @click="onClickSave()">保存</button>
        </li>
        <li>
          <button class="button" @click="onShare">分享</button>
        </li>
        <li>
          <button class="button" @click="print()">打印</button>
        </li>
        <li>
          <button class="button" @click="skinPicker()">换肤</button>
        </li>
      </ul>
    </div>
    <div class="down" v-cloak>
      <button class="button" @click="onLogout" v-show="hasLogin()" >登出</button>
    </div>
  </aside>
  `,
  methods:{
    onClickSave(){
      let currentUser = AV.User.current()
      if (!currentUser) {
        this.$emit('go-to-login')
      }else {
        this.$emit('save-resume')
      }
    },
    onShare(){
      if(!this.currentUser.objectId){
        alert('请先登录，再进行分享操作。')
      }else{
        shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
        this.$emit('share',shareLink)
      }
    },
    hasLogin(){
      return !!this.currentUser.objectId
    },
    onLogout(user){
      AV.User.logOut()
      alert('注销成功')
      window.location.reload()
    },
    print(){
      window.print()
    },
    skinPicker(){
      this.$emit('skin-picker')
    }
  },
})