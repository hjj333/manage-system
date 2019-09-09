<template>
  <div class="user">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="8">
        <div class="avatar">
          <img :src="user.avatar" alt />
        </div>
      </el-col>
      <el-col :span="16">
        <div class="user_info">
          <div class="user_item">
            <i class="fa fa-user"></i>
            <span>{{user.name}}</span>
          </div>
          <div class="user_item">
            <i class="fa fa-cog"></i>
            <span>{{user.identity === "manager" ? "管理员": "员工"}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
    computed: {
        user () {
            return this.$store.getters.user
        }
    }
};
</script>
<style>
.user {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.row-bg {
  width: 100%;
  height: 100%;
}
.avatar {
  text-align: center;
  position: relative;
  top: 30%;
}
.avatar img {
  width: 150px;
  border-radius: 50%;
}
.user span {
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
}
.user_info {
  height: 100%;
  background-color: #eee;
}
.user_item {
  position: relative;
  top: 30%;
  padding: 26px;
  font-size: 28px;
  color: #333;
}
</style>