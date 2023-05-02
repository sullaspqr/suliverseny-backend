<template>
  <div>
    <div class="row">
      <h1></h1>
      <div class="col-1" style="text-align:right;margin-right:5px;margin-top:7px;color:#0D6EFD;">Tanév:</div>
      <div class="col-xl-1 col-lg-2 col-md-3 col-sm-3 col-4">
        <div class="">
          <select
            id="selectTanev"
            class="form-select" aria-label="Default select example"
            :value="this.kezdoTanev"
            @change="tanevBeallit()"
          >
            <option
              v-for="tanev in tanevek"
              v-bind:key="tanev.id"
              :value="tanev.tanev"
            >
              {{ tanev.tanev }}
            </option>
          </select>
          
        </div>
      </div>
      <div class="col-xl-10 col-lg-9 col-md-8 col-sm-8 col-7" style="margin-left:-5px">
      <router-link
        id="loginButton"
        class="btn btn-light btn-outline-primary float-end"
        to="/Login"
      >
        Login</router-link
      >
      </div>
    </div>
    <nav>
      <router-link to="/">Home</router-link> |
      <!--router-link to="/felhasznalok">Felhasználók</router-link> |<p></p-->
      <router-link to="/versenyadatok">Versenyek adatai</router-link>
      <router-link v-if="this.$store.state.jogosultsag>6" to="/listazas"> | Adatok listázása</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  props: {
    msg: String,
  },
  components: {},
  computed: {},
  data() {
    return {
      kezdoTanev: "",
      tanevek: [],
    };
  },
  methods: {
    refreshData() {},
    tanevBeallit() {
      this.kezdoTanev = document.getElementById("selectTanev").value;
      this.$store.state.tanev=this.kezdoTanev;
      this.closeClick();
    },
    tanevekBeolvasasa() {
      let url = this.$store.state.API_URL + "Tanevek";
      axios
        .get(url)
        .then((response) => {
          this.tanevek = response.data;
          for (let i=0;i<this.tanevek.length;i++)
          {
            if (this.tanevek[i].aktiv==1)
            {
              this.kezdoTanev=this.tanevek[i].tanev;
              this.$store.state.tanev=this.kezdoTanev;
            }
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    closeClick() {
      this.$router.push("/");
    },
  },
  mounted: function () {
    this.tanevekBeolvasasa();
    this.refreshData();
  },
};
</script>

<style>
#loginButton {
  margin-right: 100px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-top: 30px;
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
