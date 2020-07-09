<template>
<main>
  <div class="container-fluid c-section">
    <div class="row">
      <div class="col-sm-3"></div>
      <div class="col-sm-6">
        <div class="a-spacing-top-medium">
          <h2>Profile page</h2>
          <a href="#" @click="onLogout">Logout</a>
          <form>
            <!--- Name ---->
            <div class="a-spacing-top-medium">
              <label>Name</label>
              <input class="a-input-text" style="width: 100%;" v-model="name" :placeholder="$auth.$state.user.name">
            </div>
            <!--- Email ---->
            <div class="a-spacing-top-medium">
              <label>Email</label>
              <input class="a-input-text" style="width: 100%;" v-model="email"
              :placeholder="$auth.$state.user.email">
            </div>
            <!--- Password ---->
            <div class="a-spacing-top-medium">
              <label>Password</label>
              <input class="a-input-text"  style="width: 100%;" v-model="password"
              >
            </div>
            <!---button-->
            <hr/>
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button-text" @click="onUpdateProfile">Update Your Profile</span>
              </span>
            </div>
          </form>
          <br>
        </div>
      </div>
      <div class="col-sm-3"></div>
    </div>
  </div>
  </main>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    async onUpdateProfile() {
      try {
        let data = {
          name: this.name,
          email: this.email,
          password: this.password
        }
        const response = await this.$axios.$put('/api/auth/user', data)

        if (response.success) {
          this.name = ''
          this.email= ''
          this.password = ''

          await this.$auth.fetchUser()
        }

      }catch (err) {
        console.log(err)
      }
    },
    
    async onLogout() {
      await this.$auth.logout()
      
    }
  }
  
}
</script>

<style>

</style>