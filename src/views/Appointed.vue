<template>
    <div id="appointed">
        <el-alert
            type="success"
            show-icon>
            预约成功
        </el-alert>
        <el-alert >地点: 数学楼 419</el-alert>
        <el-alert v-if="from > 0">时间: {{ time }} </el-alert>
    </div>
</template>
<script>
import utils from "@/api/utils.js";
import rpc from "@/api/rpc.js";
export default {
  name: "Appointed",
  data() {
    return {
      from: 0,
      to: 0
    };
  },
  mounted() {
    (async () => {
      try {
        const ret = await rpc.call("appointment.student.appointed_tr");
        this.from = ret.details.from;
        this.to = ret.details.to;
      } catch (e) {
        this.$router.replace("/login");
      }
    })();
  },
  computed: {
    time() {
      return utils.unix2time(this.from);
    }
  }
};
</script>
