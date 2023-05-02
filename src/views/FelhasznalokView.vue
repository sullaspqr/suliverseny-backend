<template>
  <div class="felhasznalok">
    <!--HelloWorld msg="Felhasználók adatai" /-->
    <div v-if="logged">
      <div v-if="felhasznalokSzama == 0">
        <table class="table table-striped justify-content-center">
          <thead class="txhead-dark">
            <tr>
              <th>ID</th>
              <th>Felhasználónév</th>
              <th>Teljesnév</th>
              <th>Salt</th>
              <th>Hash</th>
              <th>E-mail</th>
              <th>Jog</th>
              <th>Aktív</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="felhasznalo in felhasznalok" v-bind:key="felhasznalo.id">
              <td>{{ felhasznalo.id }}</td>
              <td>{{ felhasznalo.felhasznaloNev }}</td>
              <td>{{ felhasznalo.teljesNev }}</td>
              <td>{{ felhasznalo.salt }}</td>
              <td>{{ felhasznalo.hash }}</td>
              <td>{{ felhasznalo.email }}</td>
              <td>{{ felhasznalo.jogosultsag }}</td>
              <td>{{ felhasznalo.aktiv }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <h2>Nincs jogosultsága az adatok listázásához.</h2>
      </div>
    </div>
    <div v-else>
      <h2>Az adatok listázásához kérem jelentkezzen be!</h2>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sha256 from "sha256";
import HelloWorld from "@/components/HelloWorld.vue";
export default {
  name: "FelhasznalokView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      logged: this.$store.state.logged,
      sikeresBejelentkezes: false,
      felhasznalok: [],
      felhasznalokSzama: 0,
    };
  },
  methods: {
    async felhasznalokListazasa() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL + "Felhasznalok/" + this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            this.felhasznalok = response.data;
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
  },
  mounted: function () {
    this.felhasznalokListazasa();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
th,
td {
  border: solid 2px black;
}
</style>
