<template>
    <div id="login">
        <el-input v-model="account" type="text" placeholder="学号"></el-input>
        <el-input v-model="password" type="password" placeholder="密码"></el-input>
        <el-button @click="login">登陆</el-button>
    </div>
</template>

<script>
import kv from "../api/kv.js";
import rpc from "../api/rpc.js";
export default {
  name: "Login",
  data() {
    return {
      account: kv.get("user.account", ""),
      password: kv.get("user.password", "")
    };
  },
  methods: {
    login() {
      (async () => {
        try {
          const r = await rpc.call("login", {
            account: this.account,
            password: this.password
          });
          kv.set("user.account", this.account);
          kv.set("user.password", this.password);

          //console.log(r);

          if (r.details.role == "student") {
            // if unappointed
            (async () => {
              try {
                const ret = await rpc.call("appointment.student.status");
                const status = ret.details.status;
                switch (status) {
                  case "done":
                    this.$router.push("/student/done");
                    break;
                  case "appointed":
                    this.$router.push("/student/appointed");
                    break;
                  case "unappointed":
                    this.$router.push("/student/trs");
                    break;
                  default:
                    console.log("unexpect status:", status);
                    this.$router.push("/error");
                }
              } catch (e) {
                console.log(e);
                this.$router.push("/error");
              }
            })();
          } else if (r.details.role == "teacher") {
            this.$router.push("/teacher");
          } else if (r.details.role == "admin") {
            //TODO
            this.$message("TODO");
            this.$router.push("/error");
          } else {
            this.$router.push("/error");
          }
        } catch (e) {
          if (e.status == "unauthorized") {
            this.$message.error("学号或密码错误");
          } else {
            //TODO
            this.$message.error("登陆失败");
          }
        }
      })();
    }
  }
};
</script>

<style scoped>
#login {
  margin: 30rem, 1rem;
  max-width: 30rem;
}
#login > * {
  width: 100%;
  margin-top: 1rem;
}
</style>

