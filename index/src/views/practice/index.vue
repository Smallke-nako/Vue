<template>
<div id="app">
  <p id="box">
    {{msg}}
  </p>
  <button @click="change" style="width: 100px;height: 100px"></button>
</div>
</template>

<script>
export default {
  data (){
    return{
      msg: 'hello Vue!'
    }
  },
  methods: {
    change() {
      this.msg = "Hello Vue world!"
    }
  },
  beforeCreate () {
    console.log('---------------->beforeCreate')
    console.log(this.msg, document.getElementById('box'))
  },
  created () {
    console.log('---------------->created')
    console.log(this.msg, document.getElementById('box'))
  },
  beforeMount () {
    console.log('---------------->beforeMount')
    console.log(this.msg, document.getElementById('box'))
  },
  mounted () {
    console.log('---------------->mounted')
    console.log(this.msg, document.getElementById('box'))
  },
  beforeUpdate () {
    console.log('---------------->beforeUpdate')
    console.log(this.$el.innerHTML)
    console.log(this.msg, document.getElementById('box'))
  },
  updated () {
    console.log('---------------->updated')
    console.log(this.$el.innerHTML)
    console.log(this.msg, document.getElementById('box'))
  }
}
</script>
<style scoped>

</style>
