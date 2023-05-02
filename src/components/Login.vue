<template>
  <div
    id="modalSignin"
    class="modal modal-signin position-static d-block bg-secondary py-5"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4 shadow">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 v-if="!logged" class="fw-bold mb-0 fs-2">{{ msg }}</h1>
          <h1 v-else class="fw-bold mb-0 fs-2">Kijelentkezés</h1>
          <button
            type="submit"
            class="btn-close"
            @click="closeClick(true)"
          ></button>
        </div>
        <div class="modal-body p-5 pt-0">
          <form class="">
            <div v-if="!logged">
              <div class="form-floating mb-3">
                <input
                  id="floatingFelhasznaloNev"
                  type="text"
                  class="form-control rounded-3"
                  placeholder="UserName"
                  required
                  v-model="FelhasznaloNev"
                />
                <label for="floatingFelhasznaloNev">Felhasználónév</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingJelszo"
                  type="password"
                  class="form-control rounded-3"
                  placeholder="Password"
                  v-model="Jelszo"
                />
                <label for="floatingJelszo">Jelszó</label>
              </div>
            </div>
            <button
              v-if="!logged"
              class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="button"
              @click="loginClick(FelhasznaloNev, Jelszo)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-in-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              Bejelentkezés
            </button>
            <button
              v-else
              class="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
              type="button"
              @click="logoutClick()"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
              Kijelentkezés
            </button>
            <small v-if="!logged" class="text-muted"
              >Bejelentkezés az adatkarbantartási felületekre.</small
            >
            <small v-else class="text-muted"
              >Kijelentkezés az adatkarbantartási felületekről.</small
            >
            <hr class="my-4" />
            <h2 class="fs-5 fw-bold mb-3">További lehetőségek</h2>
            <div v-if="!logged">
              <button
                class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#regModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-add"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
                  />
                  <path
                    d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z"
                  />
                </svg>
                Regisztráció
              </button>
              <button
                class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#elfJelModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-unlock"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"
                  />
                </svg>
                Elfelejtett jelszó
              </button>
            </div>
            <div v-else>
              <button
                class="w-100 py-2 mb-2 btn btn-outline-primary rounded-3"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#jelCserModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-recycle"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M9.302 1.256a1.5 1.5 0 0 0-2.604 0l-1.704 2.98a.5.5 0 0 0 .869.497l1.703-2.981a.5.5 0 0 1 .868 0l2.54 4.444-1.256-.337a.5.5 0 1 0-.26.966l2.415.647a.5.5 0 0 0 .613-.353l.647-2.415a.5.5 0 1 0-.966-.259l-.333 1.242-2.532-4.431zM2.973 7.773l-1.255.337a.5.5 0 1 1-.26-.966l2.416-.647a.5.5 0 0 1 .612.353l.647 2.415a.5.5 0 0 1-.966.259l-.333-1.242-2.545 4.454a.5.5 0 0 0 .434.748H5a.5.5 0 0 1 0 1H1.723A1.5 1.5 0 0 1 .421 12.24l2.552-4.467zm10.89 1.463a.5.5 0 1 0-.868.496l1.716 3.004a.5.5 0 0 1-.434.748h-5.57l.647-.646a.5.5 0 1 0-.708-.707l-1.5 1.5a.498.498 0 0 0 0 .707l1.5 1.5a.5.5 0 1 0 .708-.707l-.647-.647h5.57a1.5 1.5 0 0 0 1.302-2.244l-1.716-3.004z"
                  />
                </svg>
                Jelszócsere
              </button>
              <button
                class="w-100 py-2 mb-2 btn btn-outline-secondary rounded-3"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#vegTorModal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                  />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
                Végleges törlés
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sha256 from "sha256";
import { mapMutations } from "vuex";

export default {
  name: "LoginView",
  props: {
    msg: String,
  },
  components: {},
  computed: mapMutations(["logout"]),
  data() {
    return {
      FelhasznaloNev: "",
      Jelszo: "",
      logged: this.$store.state.logged,
      szotar: {},
    };
  },
  methods: {
    refreshData() {},
    jelszoEnterFigyeles() {
      if (!this.$store.state.figyeles) {
        this.$store.state.figyeles=true;
        const node = document.getElementById("floatingJelszo");
        node.addEventListener("keyup", ({ key }) => {
          if (key === "Enter") {
            this.loginClick(this.FelhasznaloNev, this.Jelszo);
          }
        });
      }
    },
    closeClick(ertek) {
      if (ertek) {
        this.$router.push("/");
      } else {
        this.$router.push("/versenyadatok");
      }
    },
    logoutClick() {
      this.logout;
      this.logged = false;
      this.felhasznaloNev = "";
      this.$store.state.figyeles=false;
      this.closeClick(true);
    },
    loginClick(FelhasznaloNev, Jelszo) {
      axios
        .post(this.$store.state.API_URL + "Login/SaltRequest/" + FelhasznaloNev)
        .then((response) => {
          let lekertSalt = response.data;
          let tmpHash = sha256(Jelszo + lekertSalt).toString();
          let url =
            this.$store.state.API_URL +
            "Login?nev=" +
            FelhasznaloNev +
            "&tmpHash=" +
            tmpHash;
          axios
            .post(url)
            .then((response) => {
              if (response.status == 200) {
                let tomb = response.data;
                if (tomb[2] != -1) {
                  this.logged = true;
                  this.$store.state.logged = true;
                  this.$store.state.Uid = tomb[0];
                  this.$store.state.teljesNev = tomb[1];
                  this.$store.state.jogosultsag = tomb[2];
                  this.$store.state.iskolaId = tomb[3];
                  this.$store.state.rogzitoOktatoId = tomb[4];
                  this.$store.state.felhasznaloNev = FelhasznaloNev;
                  //console.log(this.$store.state.Uid);
                  alert(
                    "Sikeres bejelentkezés: " + this.$store.state.teljesNev
                  );
                  this.refreshData();
                  document.getElementById("loginButton").innerHTML = "Logout";
                  this.closeClick(false);
                } else {
                  alert(tomb[0]);
                }
              }
            })
            .catch((error) => {
              alert(error);
            });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 400) {
            alert(error.response.data);
          } else {
            alert("Üres a felhasználónév!");
          }
        });
    },
  },
  mounted: function () {
    this.jelszoEnterFigyeles();
    this.refreshData();
  },
};
</script>

<style scoped></style>
