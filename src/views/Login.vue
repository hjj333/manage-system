<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">后台管理系统</span>
        <el-form :model="user" :rules="rules" label-width="60px" class="login_form" ref="ruleForm">
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="user.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
          <div class="tiparea">
            <p>
              好没有帐号？现在
              <router-link to="/register">注册</router-link>
            </p>
          </div>
        </el-form>
      </div>
    </section>
  </div>
</template>
<script>
import * as api from "../api/api";
import * as cf from "../api/commonfunction";
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "blur"
          },
          {
            min: 3,
            max: 10,
            message: "长度为3到10个字符",
            triggle: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          (async () => {
            let resultemail = await cf.isexistsemail(this.user.email);
            if (resultemail.isexists) {
              let result = await cf.login(this.user.email, this.user.password);
              if (result.isok) {
                let _data = result.data[0];
                const { id, identity, email, name, avatar } = _data;
                // const token = _data.email;
                const token = {
                  id,
                  identity,
                  email,
                  name,
                  avatar
                };
                localStorage.setItem("eleToken", JSON.stringify(token));
                let decode = token
                // 存储数据vuex
                this.$store.dispatch("setAuthentiated", !this.isEmpty(decode));
                this.$store.dispatch("setUser", decode);
                // 页面跳转
                this.$router.push("/index");
              } else {
                this.$message.error("密码错误");
                return;
              }
            } else {
              this.$message.error("email错误");
              return;
            }
          })();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>
<style>
.login {
  position: relative;
  width: 100%;
  height: 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 20%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.title {
  font-family: "Microsoft Yahei";
  font-weight: bold;
  font-size: 26px;
  color: red;
}
.login_form {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}
.submit_btn {
  width: 100%;
}
.tiparea {
  text-align: right;
  font-size: 12px;
  color: #333;
}
.tiparea p a {
  color: #409eff;
}
</style>
