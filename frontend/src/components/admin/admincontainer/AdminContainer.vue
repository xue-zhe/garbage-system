<template>
    <el-container>

        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 :collapse="isCollapse"
                 :router="true">
            <el-submenu index="1">
                <template  #title>
                    <i class="el-icon-user-solid"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/userinformation">用户信息</el-menu-item>
                    <el-menu-item index="/integralmanagement">奖罚信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu  index="2">
                <template #title>
                    <i class="el-icon-s-order"></i>
                    <span>公告管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/announcementmanagement">公告信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template #title>
                    <i class="el-icon-s-data"></i>
                    <span>垃圾管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/garbageinformation">垃圾投放情况</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template #title>
                    <i class="el-icon-picture"></i>
                    <span>轮播图管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="/bannermanagement">轮播图信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-container>
            <el-header class="top-nav">
                <el-switch v-model="isCollapse"></el-switch>
                <el-button class="loginout" @click="loginout">注销</el-button>
            </el-header>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    export default {
        name: "AdminContainer",
        data() {
            return {
                isCollapse:false
            };
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            loginout(){
                window.sessionStorage.clear()
                this.$router.push('login')
                this.$message({
                    message: '退出成功！',
                    type: 'success'
                });
            }
        }
    }
</script>

<style scoped>
    .garbage-system{
        padding: 25px;
    }
    .el-menu-vertical-demo {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .top-nav{
        padding-top: 20px;
    }
    .loginout{
       float: right;
    }
</style>