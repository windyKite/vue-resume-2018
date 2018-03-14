Vue.component('sign-up',{
  data(){
    return {
      signUp:{
        email:'',
        password:'',
      },
    }
  },
  template:`
  <div class="signUp">
    <form class="form"  @submit.prevent="onSignUp()">
        <h2>注册</h2>
        <button @click="$emit('close')" type="button">关闭</button>
        <div class="row">
          <label>邮箱</label>
          <input type="text" v-model="signUp.email">
        </div>
        <div class="row">
          <label>密码</label>
          <input type="password" v-model="signUp.password">
        </div>
        <div class="actions">
          <button type="submit">提交</button>
          <a href="#" @click="$emit('go-to-login')">登录</a>
        </div>
      </form>
  </div>
  `,
  methods:{
    onSignUp(e){
      let user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then((user) =>{
        alert('注册成功')
        user = user.toJSON()
        this.$emit('sign-up',user)
      }, (error)=>{
        if(error.code === 203 || error.code === 203 || error.code === 214){
          alert('邮箱已经存在。')
        }else if(error.code === 125){
          alert('邮箱无效，请重新输入')
        }
      })
    }
  }
})  