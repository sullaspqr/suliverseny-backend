<template>
  <div class="hatter">
    <Login msg="Bejelentkezés" />
    <Registry msg="Regisztráció" />
    <ElfelejtettJelszo msg="Elfelejtett jelszó" />
    <JelszoCsere msg="Jelszócsere" />
    <VeglegesTorles msg="Végleges törlés" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import Login from "@/components/Login.vue";
import Registry from "@/components/Registry.vue";
import ElfelejtettJelszo from "@/components/ElfelejtettJelszo.vue";
import JelszoCsere from "@/components/JelszoCsere.vue";
import VeglegesTorles from "@/components/VeglegesTorles.vue";
export default {
  name: "LoginView",
  components: {
    HelloWorld,
    Login,
    Registry,
    ElfelejtettJelszo,
    JelszoCsere,
    VeglegesTorles,
  },
  data() {
    return {};
  },
  methods: {
    refreshData() {},
  },
  mounted: function () {
    this.refreshData();
  },
};
</script>

<style scoped></style>
