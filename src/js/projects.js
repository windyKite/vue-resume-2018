Vue.component('projects',{
  props:['mode','displayResume'],  
  template:`
  <section class="projects">
    <h2>项目经历</h2>
    <ol>
      <li v-for="project,index in displayResume.projects">
        <header>
          <div class="start">
            <h3 class="name">
              <editable-span v-bind:disabled="mode === 'preview'" :value="project.name" @edit="onEdit('projects[' + index + '].name',$event)"></editable-span>
            </h3>
            <span class="link">
              <editable-span v-bind:disabled="mode === 'preview'" :value="project.link" @edit="onEdit('projects[' + index + '].link',$event)"></editable-span>
            </span>
          </div>
          <div class="end">
            <span class="keywords">
              <editable-span v-bind:disabled="mode === 'preview'" :value="project.keywords" @edit="onEdit('projects[' + index + '].keywords',$event)"></editable-span>
            </span>
          </div>
        </header>
        <p class="description">
          <editable-span v-bind:disabled="mode === 'preview'" :value="project.description" @edit="onEdit('projects[' + index + '].description',$event)"></editable-span>
        </p>
        <span @click="removeProject()" v-if="index >= 2 && mode === 'edit'">X</span>
      </li>
      <li @click="addProject()" v-if="mode === 'edit'">添加</li>                     
    </ol>
  </section>
  `,
  methods:{
    onEdit(key,value){
      let regex = /\[(\d+)\]/g
      key = key.replace(regex, (match, number )=>{
        return '.' + number
      })
      let keys = key.split('.')
      let result = this.displayResume
      for(let i = 0; i < keys.length; i++){
        if(i === keys.length - 1){
          result[keys[i]] = value
        }else{
          result = result[keys[i]]
        }
      }
    },
    addProject(){
      this.displayResume.projects.push({name:'请输入项目名字',link:'https:xxx/xxx',keywords:'关键词',description:'清详细描述'})
    },
    removeProject(index){
      this.displayResume.projects.splice(index,1)
    },
  }
})