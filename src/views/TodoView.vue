<template>
    <div class="about">
      <!-- <input v-model="text" @keyup.enter="getInput"> -->
      
      <h2 class="green">Todo:</h2>
      <TaskInput @userInput="getInput" :done="false" placeholder="Take a shower!"/>
      <TaskListItem v-for="item in todoList" :key="item.id" :item="item" />

      <h2 class="green">Done:</h2>
      <TaskInput @userInput="getInput" :done="true" placeholder="Drink some water!"/>
      <TaskListItem v-for="item in doneList" :key="item.id" :item="item" />
    </div>
</template>

<script setup>
  import { ref,computed } from 'vue'
  import { addTask, getTasks, toggleDone } from '@/firebase'
  import TaskListItem from '../components/TaskListItem.vue'
  import TaskInput from '../components/TaskInput.vue'
  import { showConfetti } from '../main'
  
  // const text = ref('')
  function getInput(text, done) {
    if (text == '') 
      return

    const task = {
      task: text,
      done: done,
      dateAdded: Date.now(),
      dateCompleted: done ? Date.now() : null
    }

    addTask(task).then(() => {
      if(done) {showConfetti()}
    })
  }

  const taskList = getTasks()

  const doneList = computed(() =>{
    const dl = taskList.value.filter((item)=>{
      return item.done == true
    })

    dl.sort(sortDate)
    
    return dl

    function sortDate(b,a) {
      let da = new Date(a.dateCompleted),
      db = new Date(b.dateCompleted);
      return da - db;
    }
  })

  const todoList = computed(() =>{
    const tl = taskList.value.filter((item)=>{
      return item.done == false
    })

    tl.sort(sortDate)
    
    return tl.reverse()
    
    function sortDate(b,a) {
      let da = new Date(a.dateAdded),
      db = new Date(b.dateAdded);
      return da - db;
    }
  })




</script>

<style scoped>
</style>