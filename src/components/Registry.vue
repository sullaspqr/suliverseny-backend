<template>
  <div
    id="regModal"
    class="modal fade modal-signin py-5 modal-md"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 class="fw-bold mb-0 fs-2">{{ msg }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-5 pt-0">
          <form v-on:submit="registrySubmit()" class="">
            <div>
              <div class="form-floating mb-3">
                <input
                  id="floatingFelhasznaloNevReg"
                  type="text"
                  class="form-control rounded-3"
                  placeholder="UserName"
                  @blur="felhasznaloNevEsEmailEllenorzes(1, FelhasznaloNevReg)"
                  required
                  v-model="FelhasznaloNevReg"
                />
                <label for="floatingFelhasznaloNevReg">Felhasználónév</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingEmail"
                  type="email"
                  class="form-control rounded-3"
                  placeholder="Email"
                  @blur="felhasznaloNevEsEmailEllenorzes(2, Email)"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                  required
                  v-model="Email"
                />
                <label for="floatingEmail">E-mail cím</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatinOktatasiAzonosito"
                  type="text"
                  class="form-control rounded-3"
                  placeholder="Oktatási azonosító"
                  maxlength="11"
                  size="11"
                  @blur="felhasznaloNevEsEmailEllenorzes(3, OktatasiAzonosito)"
                  required
                  v-model="OktatasiAzonosito"
                />
                <label for="floatingOktatasiAzonosito">Oktatási azonosító</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingTeljesNev"
                  type="text"
                  class="form-control rounded-3"
                  placeholder="FullName"
                  required
                  v-model="TeljesNev"
                />
                <label for="floatingTeljesNev">Teljes név</label>
              </div>
              <div class="form-floating mb-3">
                <select
                  id="inputIskolaNev"
                  class="form-select"
                  :value="this.kezdoIskolaId"
                  @blur="iskolaBeallit()"
                >
                  <option
                    v-for="iskola in iskolak"
                    v-bind:key="iskola.id"
                    :value="iskola.iskolaId"
                  >
                    {{ iskola.nev }}
                  </option>
                </select>
                <label for="floatingIskolaNev">Iskola neve</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingJelszoReg"
                  type="password"
                  class="form-control rounded-3"
                  placeholder="Password"
                  required
                  v-model="JelszoReg"
                />
                <label for="floatingJelszoUjra">Jelszó</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingJelszoUjra"
                  type="password"
                  class="form-control rounded-3"
                  placeholder="PasswordAgain"
                  required
                  v-model="JelszoUjra"
                />
                <label for="floatingJelszoUjra">Jelszó újra</label>
              </div>
            </div>
            <button
              class="w-100 mb-2 btn btn-lg rounded-3 btn-success"
              type="submit"
              @click="ellenorzes(JelszoReg, JelszoUjra)"
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
            <small class="text-muted"
              >A regisztrációval elfogadom az adatvédelmi szabályzatot.</small
            >
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
  name: "Registry",
  props: {
    msg: String,
  },
  components: {},
  computed: mapMutations(["generateSalt"]),
  data() {
    return {
      kezdoIskolaId: 15,
      iskolak: [],
      FelhasznaloNevReg: "",
      JelszoReg: "",
      JelszoUjra: "",
      TeljesNev: "",
      Email: "",
      OktatasiAzonosito: "",
      hossz: 64,
    };
  },
  methods: {
    refreshData() {},
    iskolaBeallit() {
      this.kezdoIskolaId=document.getElementById("inputIskolaNev").value;
    },
    iskolakBeolvasasa() {
      let url = this.$store.state.API_URL + "Iskolak";
      axios
        .get(url)
        .then((response) => {
          this.iskolak = response.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    felhasznaloNevEsEmailEllenorzes(kod, parameter) {
      let registry = {
        id: 0,
        oktatasiAzonosito: "",
        felhasznaloNev: "",
        teljesNev: "",
        salt: "",
        hash: "",
        email: "",
        key: "",
      };
      if (kod == 1) {
        registry.felhasznaloNev = parameter;
      } else if (kod==2) {
        registry.email = parameter;
      } else {
        registry.oktatasiAzonosito=parameter;
      }
      axios
        .post(this.$store.state.API_URL + "Registry", registry)
        .then((response) => {
          if (response.status == 210) {
            this.FelhasznaloNevReg = "";
            alert(response.data);
          }
          if (response.status == 211) {
            this.Email = "";
            alert(response.data);
          }
          if (response.status == 212) {
            this.OktatasiAzonosito = "";
            alert(response.data);
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
    registrySubmit() {
      this.generateSalt;
      axios
        .post(this.$store.state.API_URL + "Registry", {
          id: 0,
          iskolaId: document.getElementById("inputIskolaNev").value,
          oktatasiAzonosito: this.OktatasiAzonosito,
          felhasznaloNev: this.FelhasznaloNevReg,
          teljesNev: this.TeljesNev,
          salt: this.$store.state.userSalt,
          hash: sha256(
            sha256(this.JelszoReg + this.$store.state.userSalt).toString()
          ).toString(),
          email: this.Email,
          key: "",
        })
        .then((response) => {
          if (response.status == 200) {
            alert(response.data);
          }
        })
        .catch((error) => {
          alert(error);
        });
      alert(
        "Kérjük kattintson az E-mail címére küldött levélben lévő megerősítő linkre!"
      );
    },
    ellenorzes(Jelszo, JelszoUjra) {
      if (Jelszo != JelszoUjra) {
        this.JelszoUjra = "";
        alert("Hibás ismételt jelszómegadás!");
      } else {
      }
    },
    closeClick() {
      this.$router.push("/");
    },
  },
  mounted: function () {
    this.iskolakBeolvasasa();
    this.refreshData();
  },
};
</script>

<style scoped></style>
