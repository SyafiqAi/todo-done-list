<script setup>
  import { ref,computed } from 'vue'
  // import { addTask, ftoggleDone } from '@/firebase'

  const text = ref('')
  const taskList = ref([])
  function getInput() {
    if (text.value == '') 
      return

    const task = {
      task: text.value,
      done: false,
      dateAdded: new Date().toLocaleString(),
      dateCompleted: null
    }
    taskList.value.push(task)
    text.value = ''
    console.log(taskList.value)
    // addTask(task)
  }

  const doneList = computed(() =>{
    return taskList.value.filter((item)=>{
      return item.done == true
    })
  })

  const todoList = computed(() =>{
    return taskList.value.filter((item)=>{
      return item.done == false
    })
  })

  function toggleDone(item) {
    item.done = !item.done

    item.dateCompleted = item.done ? new Date().toLocaleString() : null

  }


</script>
<template>
  <div class="about">
    <input v-model="text" @keyup.enter="getInput">
    <h2>Todo</h2>
    <ul>
      <li v-for="item in todoList" :key="item" @click='toggleDone(item)'> {{ item.task }} {{ item.dateAdded }} </li>
    </ul>

    <h2>Done</h2>
    <ul>
      <li v-for="item in doneList" :key="item" @click='toggleDone(item)'> {{ item.task }} Added:{{ item.dateAdded}} Completed:{{ item.dateCompleted }} </li>
    </ul>
  </div>
</template>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
