<template>
    <div id="teacher">
        <el-table
      :data="time_ranges_table"
      style="width: 100%">
      <el-table-column
        prop="from"
        label="开始时间"
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="during"
        label="持续时间">
      </el-table-column>
      <el-table-column
        prop="status_name"
        label="状态"
        :filters="trs_filters"
        :filter-method="trs_filter">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button v-if="canEnable(scope.row)" @click="open_tr(scope.row.id)" type="primary">
          开放
        </el-button>
        <el-button v-if="canDisable(scope.row)" @click="close_tr(scope.row.id)" type="warning">
          关闭
        </el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>
<script>
import utils from "../api/utils.js";
import rpc from "../api/rpc.js";
const status2name = s => {
  switch (s) {
    case "disable":
      return "待开放";
    case "enable":
      return "可关闭";
  }
};
export default {
  name: "Teacher",
  data() {
    return {
      trs_filters: [
        {
          text: "待开放时段",
          value: "wait_for_open"
        },
        {
          text: "可关闭时段",
          value: "can_be_closed"
        }
      ],
      time_ranges: [
        //{ from: 12, to: 23, teacher: "2", status: "disable" }
      ]
    };
  },
  computed: {
    time_ranges_table() {
      return this.time_ranges.map(tr => {
        return {
          id: `${tr.from}_${tr.to}`,
          from: utils.unix2time(tr.from),
          during: `${Math.ceil((tr.to - tr.from) / 60)}分钟`,
          status: tr.status,
          status_name: status2name(tr.status)
        };
      });
    }
  },
  mounted() {
    (async () => {
      try {
        const ret = await rpc.call("appointment.teacher.trs@canOperate");
        let trs = Object.values(ret.details).map(raw => {
          const [from, to, status] = raw.split(":");
          return {
            from,
            to,
            status
          };
        });
        console.log(trs);
        this.time_ranges = trs;
      } catch (e) {
        if (e.status == "unauthorized") {
          this.$router.push("/login");
        }
        console.log(e);
      }
    })();
  },
  methods: {
    open_tr(tr_id) {
      (async () => {
        try {
          await rpc.call("appointment.teacher.tr.open", { tr_id });
          const [from, to] = tr_id.split("_");
          this.time_ranges = this.time_ranges.map(tr => {
            if (tr.from == from && tr.to == to) {
              tr.status = "enable";
            }
            return tr;
          });
        } catch (e) {
          console.log(e);
          if (e.status == "unauthorized") {
            this.$router.push("/login");
          }
          this.$message.error("操作失败");
        }
      })();
    },
    close_tr(tr_id) {
      (async () => {
        try {
          await rpc.call("appointment.teacher.tr.close", { tr_id });
          const [from, to] = tr_id.split("_");
          this.time_ranges = this.time_ranges.map(tr => {
            if (tr.from == from && tr.to == to) {
              tr.status = "disable";
            }
            return tr;
          });
        } catch (e) {
          console.log(e);
          if (e.status == "unauthorized") {
            this.$router.push("/login");
          }
          this.$message.error("操作失败");
        }
      })();
    },
    canDisable(row) {
      return row.status == "enable";
    },
    canEnable(row) {
      return row.status == "disable";
    },
    trs_filter: function(value, row) {
      switch (value) {
        case "wait_for_open":
          return row.status == "disable";
        case "can_be_closed":
          return row.status == "enable";
        default:
          return false;
      }
    }
  }
};
</script>
