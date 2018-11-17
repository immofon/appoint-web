<template>
    <div id="error">
        "好像有什么出错了，刷新试一试"
        <el-button @click="goto">返回登陆</el-button>
    </div>
</template>
<script>
export default {
  methods: {
    goto() {
      this.$router.push("/login");
    }
  }
};
</script>


