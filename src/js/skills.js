Vue.component('skills',{
  props:['mode','displayResume'],  
  template:`
  <section class="skills">
    <h1>技能</h1>
    <ul>
      <li v-for="skill,index in displayResume.skills">
        <span class="name">
          <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="skill.name" @edit="onEdit('skills[' + index + '].name',$event)"></editable-span>
        </span>
        <div class="description">
          <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="skill.description" @edit="onEdit('skills['+ index +'].description',$event)"></editable-span>
        </div>
        <span class="removeSkill" v-if="index >= 4" @click="removeSkill(index)">X</span>
      </li>
      <li v-on:click="addSkill()" v-if="mode === 'edit'">添加</li>
    </ul>
  </section>
  `,
  methods:{
    onEdit(key,value){
      console.log(key)
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
    addSkill(){
      this.displayResume.skills.push({name:'请输入技能名字',description:'请输入详细描述'})
    },
    removeSkill(index){
      this.displayResume.skills.splice(index,1)
    },
  }
})