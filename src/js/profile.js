Vue.component('profile',{
  props:['mode','displayResume'],
  template:`
  <section class="profile">
    <h1>
      <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="displayResume.name" v-on:edit="onEdit('name',$event)"></editable-span>
    </h1>
    <p>应聘职位：<editable-span v-bind:disabled="mode === 'preview'" v-bind:value="displayResume.jobTitle" v-on:edit="onEdit('jobTitle',$event)"></editable-span></p>
    <p class="profile">
        <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="displayResume.birthday" v-on:edit="onEdit('birthday',$event)"></editable-span>
        | 
        <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="displayResume.gender" v-on:edit="onEdit('gender',$event)"></editable-span>
        | 
        <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="displayResume.email" v-on:edit="onEdit('email',$event)"></editable-span>
        | 
        <editable-span v-bind:disabled="mode === 'preview'" v-bind:value="displayResume.phone" v-on:edit="onEdit('phone',$event)"></editable-span>
    </p>
    </section>
  `,
  methods:{
    onEdit(key,value){
      this.displayResume[key] = value    
    }
  }
})