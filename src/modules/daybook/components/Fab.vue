<template>
    <button 
    @click="$emit('on:click')"
    class="btn btn-primary">
        <i v-if="this.$route.params.id != undefined" class="fa fa-2x fa-save"></i>
         <i v-else class="fa fa-2x fa-plus"></i>
    </button>


</template>

<script>
export default {


}
</script>

<style lang="scss" scoped>
button{
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 80px;
    height: 80px;
    border-radius: 100%;
}
</style>