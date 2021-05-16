<template>
    <div>
        <el-menu
                :default-active=" activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                background-color="#373d41"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="handleSelect"
                :router="true">
            <el-menu-item index="/home" >首页</el-menu-item>
            <el-menu-item index="/throw">垃圾投放</el-menu-item>
            <el-menu-item index="/knowledge">垃圾分类知识</el-menu-item>
            <el-menu-item index="/person" class="person">个人中心</el-menu-item>
        </el-menu>
    </div>


</template>

<script>
    export default {
        name: "Navtop",
        data() {
            return {
                activeIndex2:'/'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
            }

        }
    }
</script>

<style scoped>
    .person{
        position: absolute;
        right: 50px;
    }
</style>