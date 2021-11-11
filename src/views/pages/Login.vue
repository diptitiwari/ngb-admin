<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@/assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-8 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-8">Login</h4>
                </div>

                <div>
                  <vs-input
                      name="email"
                      icon-no-border
                      icon="icon icon-user"
                      icon-pack="feather"
                      label-placeholder="Email"
                      v-model="email"
                      class="w-full "/>

                  <vs-input
                      type="password"
                      name="password"
                      icon-no-border
                      icon="icon icon-lock"
                      icon-pack="feather"
                      label-placeholder="Password"
                      v-model="password"
                      class="w-full mt-6" />

                  <div class="flex flex-wrap justify-between my-5">
                      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
                      <router-link to="">Forgot Password?</router-link>
                  </div>
                  <vs-button type="border">Register</vs-button>
                  <vs-button
                    class="float-right"
                    @click="login"
                  >
                    {{$t("label.button.login")}}
                  </vs-button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import { signin, getUserDetails} from '../../http/auth';
import { setAuthorizationHeader } from '../../http/index';

export default{
  data() {
    return {
      email: "",
      password: "",
      checkbox_remember_me: false,
      message: ""
    }
  },
  methods: {
    async login() {
      try {
        const user = await signin(this.email, this.password);
        this.$store.dispatch("auth/setUser", user.data);
        setAuthorizationHeader(user.data.base64EncodedAuthenticationKey);
        this.getUserDetail(user.data.userId);
        this.$router.push('/');
      } catch (error) {
        if (error.httpStatusCode === 401) {
          this.message = "Invalid Username and Password!";
        }
        console.log('something went to wrong :', error);
      }
    },
    async getUserDetail (userId) {
      try {
        const response = await getUserDetails(userId);
        this.$store.dispatch("auth/setUserDetail", response.data);
      } catch (error) {
        console.log('something went to wrong while getting user detail :', error);
      }
    },
  }
}
</script>

<style lang="scss">
#page-login {
  .social-login-buttons {
    .bg-facebook { background-color: #1551b1 }
    .bg-twitter { background-color: #00aaff }
    .bg-google { background-color: #4285F4 }
    .bg-github { background-color: #333 }
  }
}
</style>
