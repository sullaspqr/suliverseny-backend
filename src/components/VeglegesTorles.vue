<template>
  <div
    id="vegTorModal"
    class="modal fade modal-signin py-5 modal-lg"
    tabindex="-1"
    role="dialog"
    data-backdrop="static"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4">
        <div class="modal-header p-5 pb-4 border-bottom-0">
          <h1 class="fw-bold mb-0 fs-2">
            {{ msg }} (Felhasználó: {{ this.TeljesNev }})
          </h1>
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
            <button
              class="w-100 mb-2 btn btn-lg rounded-3 btn-danger"
              type="button"
              data-bs-dismiss="modal"
              @click="veglegesTorles()"
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
              Törlöm magam a rendszerből.
            </button>
            <small class="text-muted"
              >A törlés után nem tudja többé használmi a rendszert!</small
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "VeglegesTorlesView",
  props: {
    msg: String,
  },
  components: {},
  computed: mapMutations(["logout"]),
  data() {
    return {
      FelhasznaloNev: this.$store.state.felhasznaloNev,
      TeljesNev:this.$store.state.teljesNev,
    };
  },
  methods: {
    refreshData() {},
    veglegesTorles() {
      if (confirm("Biztosan törli az adatait?")) {
        let url =
          this.$store.state.API_URL +
          "Felhasznalok?uId=" +
          this.$store.state.Uid +
          "&userName=" +
          this.FelhasznaloNev;
        axios
          .delete(url)
          .then((response) => {
            if (response.status == 200) {
              alert(response.data);
              this.logout;
              this.logged = false;
              this.FelhasznaloNev = "";
              this.closeClick();
            } else {
              alert(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    closeClick() {
      const backdrop = document.getElementsByClassName("modal-backdrop");
      backdrop[0].remove();
      this.$router.push("/");
    },
  },
  mounted: function () {
    //this.refreshData();
  },
};
</script>

<style scoped>

</style>
