<template>
    <div class="about">
    <input v-model="text" @keyup.enter="getInput">
    
    <h2 class="green">Todo</h2>
    <TaskListItem v-for="item in todoList" :key="item.id" :item="item" />

    <h2 class="green">Done</h2>
    <TaskListItem v-for="item in doneList" :key="item.id" :item="item" />
    </div>
</template>

<script setup>
  import { ref,computed } from 'vue'
  import { addTask, getTasks, toggleDone } from '@/firebase'
  import TaskListItem from '../components/TaskListItem.vue'

  const text = ref('')
  function getInput() {
    if (text.value == '') 
      return

    const task = {
      task: text.value,
      done: false,
      dateAdded: Date.now(),
      dateCompleted: null
    }
    text.value = ''
    addTask(task)
  }

  const taskList = getTasks()

  const doneList = computed(() =>{
    const dl = taskList.value.filter((item)=>{
      return item.done == true
    })

    dl.sort(sortDate)
    
    return dl
  })

  const todoList = computed(() =>{
    const tl = taskList.value.filter((item)=>{
      return item.done == false
    })

    tl.sort(sortDate)
    
    return tl.reverse()
  })

  function sortDate(b,a) {
    let da = new Date(a.dateAdded),
    db = new Date(b.dateAdded);
    return da - db;
  }

  

</script>

<style scoped>
</style>