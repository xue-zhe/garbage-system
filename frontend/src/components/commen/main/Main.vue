<template>
    <el-main>
        <Banner></Banner>
        <Notice></Notice>
    </el-main>
</template>

<script>
    import Banner from "./Banner";
    import Notice from "./Notice";
    export default {
        name: "Main",
        components: {Notice, Banner}
    }
</script>

<style scoped>

</style>