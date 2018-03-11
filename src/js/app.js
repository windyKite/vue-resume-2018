let app = new Vue({
  el:'#app',
  data:{
    editingName:false,
    loginVisible:false,
    signUpVisible:false,
    resume:{
      name:'姓名',
      gender:'女',
      birthday:'1995年11月',
      jobTitle:'前端工程师',
      phone:'18826132439',
      email:'example@example.com',
    },
    signUp:{
      email:'',
      password:'',
    },
    login:{
      email:'',
      password:'',
    },
  },
  methods:{
    onEdit(key,value){
      this.resume[key] = value
    },
    onClickSave(){
      let currentUser = AV.User.current()
      if (currentUser) {
        // 跳转到首页
      }
      else {
        //currentUser 为空时，可打开用户注册界面…
        this.signUpVisible = true
      }
    },
    onSignUp(e){
      var user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(function (loginedUser) {
        console.log(loginedUser)
      }, function (error) {
        console.log(error)
      })
    },
    onLogout(){
      AV.User.logOut()
      alert('注销成功')
      window.location.reload
    },
    onLogin(){
      AV.User.logIn(this.login.email, this.login.password).then(function (loginedUser) {
        console.log(loginedUser);
      }, function (error) {
        console.log(error)
      });
    }
  }
})
