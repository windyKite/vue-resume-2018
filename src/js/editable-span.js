Vue.component('editable-span',{
  props:['value','disabled'],
  template:`
  <span class="editableSpan">
    <span v-show="!editing">{{value}}</span>
    <input v-show="editing" type="text" v-on:input="triggerEdit" v-bind:value="value">
    <button v-on:click="editing = !editing" v-if="!disabled">edit</button>
  </span>
  `,
  data(){
    return {
      editing: false,
    }
  },
  methods:{
    triggerEdit(e){
      this.$emit('edit',e.currentTarget.value)
    }
  }
})