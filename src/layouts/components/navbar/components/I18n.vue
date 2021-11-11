<template>
  <vs-dropdown vs-custom-content vs-trigger-click class="cursor-pointer">
    <span class="cursor-pointer flex items-center i18n-locale">
      <span class="hidden sm:block ml-2">{{ getCurrentLocaleData.lang }}</span>
    </span>
    <vs-dropdown-menu class="w-48 i18n-dropdown vx-navbar-dropdown">
      <vs-dropdown-item
        v-for="(language, index) in languages"
        @click="updateLocale(language.flag)"
        :key="index"
      >
        {{language.lang}}
      </vs-dropdown-item>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import _ from 'lodash';

  export default {
    data() {
      return {
        languages: [
          { lang: "English", flag: "en" },
          { lang: "Français", flag: "fr" },
          { lang: "Español", flag: "es" },
          { lang: "Português", flag: "pt" },
          { lang: "中文", flag: "zh_CN" },
          { lang: "हिंदी", flag: "hi" },
          { lang: "ქართული", flag: "ka" },
          { lang: "ພາສາລາວ", flag: "lo" },
          { lang: "tiếng Việt", flag: "vi" },
          { lang: "မြန်မာ", flag: "my_MM" },
          { lang: "ဇော်ဂျီ", flag: "my" }
        ]
      }
    },
    computed: {
      i18n_locale_img() {
        return require(`@/assets/images/flags/${this.$i18n.locale}.png`)
      },
      getCurrentLocaleData() {
        const lang = _.find(this.languages, { flag: this.$i18n.locale })
        return lang;
    },
  },
  methods: {
    updateLocale(locale) {
      this.$i18n.locale = locale;
    },
  }
}
</script>
