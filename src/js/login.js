Vue.component('login',{
  data(){
    return {
      login:{
        email:'',
        password:'',
      },
    }
  },
  template:`
  <div class="login" >
    <form class="form" @submit.prevent="onLogin">
      <h2>登录</h2>
      <button @click="$emit('close')" type="button">关闭</button>
      <div class="row">
        <label>邮箱</label>
        <input type="text" v-model="login.email">
      </div>
      <div class="row">
        <label>密码</label>
        <input type="password" v-model="login.password">
      </div>
      <div class="actions">
        <button type="submit">提交</button>
        <a href="#" @click="$emit('go-to-sign-up')">注册</a>
      </div>
    </form>
  </div> 
  `,
  methods:{
    onLogin(){
      AV.User.logIn(this.login.email, this.login.password).then((user)=> {
        user = user.toJSON()
        this.$emit('login',user)
      }, (error) =>{
          if(error.code === 210){
            alert('邮箱与密码不匹配.')
          }
      })
    },
  }
})