<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="6" :xs="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div class="text-center">
            <user-avatar :user="user"/>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import userAvatar from './userAvatar.vue'
import { getUserProfile } from '@/api/system/user'
export default {
  components: { userAvatar },
  name: 'Profile',
  data() {
    return {
      user: {},
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    getUser() {
      getUserProfile().then(response => {
        this.user = response.data
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>
