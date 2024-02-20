<template>
    <div class="input-container">
        <input v-model="text" type="text" :placeholder="placeholder" @keyup.enter="enterPressed">
    </div>
    <div class="spacer"></div>
</template>

<script setup>
import { ref } from "vue"

const emit = defineEmits(['userInput'])
const props = defineProps({
    done: Boolean,
    placeholder: { type: String, default: "Add a task"}
    })
const text = ref('')
function enterPressed() {
    emit('userInput', text.value, props.done)
    text.value = ''
}
</script>

<style scoped>
    input {
        padding: 5px;
        font-family: inherit;
        font-size: inherit;
        font-size: 105%;
        background-color: inherit;
        color: inherit;
        /* background-image:url('@/assets/plus.svg'); */
        /* background-position: 10px 10px;
        background-repeat: no-repeat; */
        /* padding-left: 40px; */
        /* background-size: 10%; */
        /* background-size: contain; */
        /* background-position: 0; */
        outline: none;
        border: 1px solid hsla(160, 100%, 37%, 0.3);
        /* border-top: 1px solid hsla(160, 100%, 37%, 0.1);
        border-left: 1px solid hsla(160, 100%, 37%, 0.1);
        border-right: 1px solid hsla(160, 100%, 37%, 0.5);
        border-bottom: 1px solid hsla(160, 100%, 37%, 0.5); */
    }
    input:focus {
        border: 1px solid hsla(160, 100%, 37%);
        outline: none;
        /* border: 1px solid red; */
    }
</style>