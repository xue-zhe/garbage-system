<template>
    <div>
        <el-container class="container">
            <el-container>
                <el-header>
                    <Navtop></Navtop>
                </el-header>
                <router-view></router-view>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Navtop from "../navtop/Navtop";
    import Notice from "../main/Notice";
    import Banner from "../main/Banner";
    import Award from "../main/Award";
    import Main from "../main/Main";
    export default {
        name: 'Container',
        components: {Award, Banner, Notice, Navtop,Main},
    }
</script>
<style scoped>
    .el-menu{
        border-right: none;
    }
    .el-header {
        background-color: #373d41;
    }
    .el-main{
        background-color: #EAEDF1;
    }
</style>