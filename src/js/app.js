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
      skills:[
        {name:'请输入技能名字',description:'请输入详细描述'},
        {name:'请输入技能名字',description:'请输入详细描述'},
        {name:'请输入技能名字',description:'请输入详细描述'},
        {name:'请输入技能名字',description:'请输入详细描述'},
      ],
      projects:[
        {name:'请输入项目名字',link:'https:xxx/xxx',keywords:'关键词',description:'清详细描述'},
        {name:'请输入项目名字',link:'https:xxx/xxx',keywords:'关键词',description:'清详细描述'},
      ],
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
      let regex = /\[(\d+)\]/g
      key = key.replace(regex, (match, number )=>{
        return '.' + number
      })
      let keys = key.split('.')
      let result = this.resume
      for(let i = 0; i < keys.length; i++){
        if(i === keys.length - 1){
          result[keys[i]] = value
        }else{
          result = result[keys[i]]
        }
      }
    },
    addSkill(){
      this.resume.skills.push({name:'请输入技能名字',description:'请输入详细描述'})
    },
    removeSkill(index){
      this.resume.skills.splice(index,1)
    },
    addProject(){
      this.resume.projects.push({name:'请输入项目名字',link:'https:xxx/xxx',keywords:'关键词',description:'清详细描述'})
    },
    removeProject(index){
      this.resume.projects.splice(index,1)
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
        Object.assign(this.resume, user.resume)
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