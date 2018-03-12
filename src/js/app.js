let app = new Vue({
  el:'#app',
  data:{
    editingName:false,
    loginVisible:false,
    signUpVisible:false,
    shareVisible:false,
    previewUser:{
      objectId:undefined,
    },
    currentUser:{
      objectId: undefined,
      email: '',
    },
    previewResume:{
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
    shareLink:'',
    mode:'edit',  // preview
  },
  // watch:{
  //   'currentUser.objectId': function(newValue,oldValue){
  //     if(newValue){
  //       this.getResume(this.currentUser)
  //     }
  //   }
  // },
  computed:{
    displayResume(){
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
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
      let {objectId} = AV.User.current().toJSON()
      let user = AV.Object.createWithoutData('User', objectId)
      user.set('resume',this.resume)
      user.save()
      alert('保存成功')
    },
    getResume(user){
      let query = new AV.Query('User');
      return query.get(user.objectId).then((user)=>{
        let resume = user.toJSON().resume
        return resume
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
        app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
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


// 判断当前是否登录，若登录，则获取当前用户并设置分享链接
let currentUser = AV.User.current()
if(currentUser){
  app.currentUser = currentUser.toJSON()
  app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId 
  app.getResume(app.currentUser).then((resume)=>{
    app.resume = resume
  })
}

// 判断有没有预览id，获取预览用户的id
let search = location.search 
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if(matches){
  userId = matches[1]
  app.mode = 'preview'
  app.getResume({objectId:userId}).then((resume)=>{
    app.previewResume = resume
  })
}
