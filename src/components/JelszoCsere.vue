<template>
  <div
    id="jelCserModal"
    class="modal fade modal-signin py-5 modal-md"
    tabindex="-1"
    role="dialog"
    data-bs-backdrop="static"
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
          <!--form @submit="registrySubmit()" class=""-->
          <form class="">
            <div>
              <div class="form-floating mb-3">
                <input
                  id="floatingRegiJelszo"
                  type="password"
                  class="form-control rounded-3"
                  placeholder="OldPassword"
                  required
                  v-model="RegiJelszo"
                />
                <label for="floatingJelszoUjra">Régi jelszó</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingUjJelszo"
                  type="password"
                  class="form-control rounded-3"
                  placeholder="NewPassword"
                  required
                  v-model="UjJelszo"
                />
                <label for="floatingUjJelszo">Új jelszó</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  id="floatingJelszoIsmet"
                  type="password"
                  class="form-control rounded-3"
                  placeholder="NewPasswordAgain"
                  required
                  v-model="UjJelszoIsmet"
                />
                <label for="floatingJelszoIsmet">Új jelszó ismét</label>
              </div>
            </div>
            <button
              class="w-100 mb-2 btn btn-lg rounded-3 btn-success"
              type="button"
              data-bs-dismiss="modal"
              @click="jelszoCsere(RegiJelszo, UjJelszo, UjJelszoIsmet)"
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
            <small class="text-muted">Jelszó módosítása.</small>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sha256 from "sha256";

export default {
  name: "ElfelejtettJelszo",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      someModal: "",
      RegiJelszo: "",
      UjJelszo: "",
      UjJelszoIsmet: "",
      myModal: null,
    };
  },
  methods: {
    refreshData() {

    },
    jelszoCsere(RegiJelszo, UjJelszo, UjJelszoIsmet) {
      if (UjJelszo != UjJelszoIsmet) {
        this.UjJelszoIsmet = "";
        alert("Hibás ismételt jelszómegadás!");
      } else {
        axios
          .post(
            this.$store.state.API_URL +
              "Login/SaltRequest/" +
              this.$store.state.felhasznaloNev
          )
          .then((response) => {
            let lekertSalt = response.data;
            let oldHash = sha256(
              sha256(RegiJelszo + lekertSalt).toString()
            ).toString();
            let newHash = sha256(
              sha256(UjJelszo + lekertSalt).toString()
            ).toString();
            let url =
              this.$store.state.API_URL +
              "Jelszo/" +
              this.$store.state.felhasznaloNev +
              "," +
              oldHash +
              "," +
              newHash;
            axios
              .post(url)
              .then((response) => {
                alert(response.data);
                if (response.status==200)
                {
                  this.RegiJelszo="";
                  this.UjJelszo="";
                  this.UjJelszoIsmet="";
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
      }
    },
    closeClick() {
      this.$router.push("/");
    },
  },
  mounted: function () {
    this.refreshData();
  },
};
</script>

<style scoped>
.modal-backdrop {
  display: none;
  z-index: 1040 !important;
}
</style>
