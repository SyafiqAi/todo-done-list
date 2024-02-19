<template>
    <div class="tli" @mouseover="hover = true" @mouseleave="hover=false">
        <slot></slot>
    </div>

</template>

<script setup>
import { ref } from "vue";

    const hover = ref(false)
</script>
<style>
    .tli:hover {
        /* transition: 0.4s; */
        background-color: hsla(160, 100%, 37%, 0.2);
        cursor: pointer;
    }
    .tli {
        /* color: hsla(160, 100%, 37%, 1); */
        font-size: 105%;
        display: flex;
        padding: 5px;
        width: fit-content;
        border-right: 1px solid hsla(160, 100%, 37%, 0.5);
        border-bottom: 1px solid hsla(160, 100%, 37%, 0.5);
    }

</style>