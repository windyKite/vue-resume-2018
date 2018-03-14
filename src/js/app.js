let app = new Vue({
  el:'#app',
  data:{
    editingName:false,
    loginVisible:false,
    signUpVisible:false,
    shareVisible:false,
    skinPickerVisible:false,
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
    shareLink:'',
    mode:'edit',  // preview
  },
  watch:{
    'currentUser.objectId': function(newValue,oldValue){
      if(newValue){
        this.getResume(this.currentUser).then((resume)=>{
          if(resume){
            this.resume = resume
          }
        })
      }
    }
  },
  computed:{
    displayResume(){
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
  methods:{
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
    onSignUp(user){
      this.currentUser.objectId = user.objectId
      this.currentUser.email = user.email
      this.signUpVisible = false

    },
    goToSignUp(){
      this.loginVisible = false
      this.signUpVisible = true
    },
    goToLogin(){
      this.loginVisible = true
      this.signUpVisible = false
    },
    onLogin(user){
      this.currentUser.objectId = user.objectId
      this.currentUser.email = user.email
      this.loginVisible = false
    },
    share(shareLink){
      this.shareLink = shareLink
      this.shareVisible = !this.shareVisible
    }
  }
})


// 判断当前是否登录，若登录，则获取当前用户并设置分享链接
let currentUser = AV.User.current()
if(currentUser){
  app.currentUser = currentUser.toJSON()
  app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId 
  app.getResume(app.currentUser).then((resume)=>{
    if(resume){
      app.resume = resume
    }
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
