let app = new Vue({
  el:'#app',
  data:{
    editingName:false,
    loginVisible:false,
    signUpVisible:false,
    currentUser:{
      objectId: undefined,
      email: '',
    },
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
      if (!currentUser) {
        this.signUpVisible = true
      }else {
        this.saveResume()
      }
    },
    saveResume(){
      alert(1)
      let {objectId} = AV.User.current().toJSON()
      let user = AV.Object.createWithoutData('User', objectId)
      user.set('resume',this.resume)
      user.save()
    },
    getResume(){
      let query = new AV.Query('User');
      query.get(this.currentUser.objectId).then((user)=>{
        let resume = user.toJSON().resume
        Object.assign(this.resume, resume)
        console.log(user.toJSON())
      }, (error)=>{
        console.log(error)
      })
    },
    onSignUp(e){
      let user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then((user) =>{
        alert('注册成功')
        user = user.toJSON()
        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
        this.signUpVisible = false
      }, (error)=>{
        if(error.code === 203 || error.code === 203 || error.code === 214){
          alert('邮箱已经存在。')
        }else if(error.code === 125){
          alert('邮箱无效，请重新输入')
        }
      })
    },
    onLogout(){
      AV.User.logOut()
      alert('注销成功')
      window.location.reload()
    },
    onLogin(){
      AV.User.logIn(this.login.email, this.login.password).then((user)=> {
        user = user.toJSON()
        this.currentUser.objectId = user.objectId
        this.currentUser.email = user.email
        this.loginVisible = false
      }, (error) =>{
          if(error.code === 210){
            alert('邮箱与密码不匹配.')
          }
      })
    },
    hasLogin(){
      return !!this.currentUser.objectId
    },
    
  }
})

let currentUser = AV.User.current()
if(currentUser){
  app.currentUser = currentUser.toJSON()
  app.getResume()
}