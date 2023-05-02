<template>
  <div
    id="elfJelModal"
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
          <form @submit="registrySubmit()" class="">
            <div>
              <div class="form-floating mb-3">
                <input
                  id="floatingEmailCim"
                  type="email"
                  class="form-control rounded-3"
                  placeholder="Email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$"
                  required
                  v-model="EmailCim"
                />
                <label for="floatingEmailCim">E-mail cím</label>
              </div>
            </div>
            <button
              class="w-100 mb-2 btn btn-lg rounded-3 btn-success"
              type="button"
              data-bs-dismiss="modal"
              @click="eMailKuldes(EmailCim)"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-envelope-paper"
                viewBox="0 0 16 16"
              >
                <path
                  d="M4 0a2 2 0 0 0-2 2v1.133l-.941.502A2 2 0 0 0 0 5.4V14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V5.4a2 2 0 0 0-1.059-1.765L14 3.133V2a2 2 0 0 0-2-2H4Zm10 4.267.47.25A1 1 0 0 1 15 5.4v.817l-1 .6v-2.55Zm-1 3.15-3.75 2.25L8 8.917l-1.25.75L3 7.417V2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v5.417Zm-11-.6-1-.6V5.4a1 1 0 0 1 .53-.882L2 4.267v2.55Zm13 .566v5.734l-4.778-2.867L15 7.383Zm-.035 6.88A1 1 0 0 1 14 15H2a1 1 0 0 1-.965-.738L8 10.083l6.965 4.18ZM1 13.116V7.383l4.778 2.867L1 13.117Z"
                />
              </svg>
              E-mail küldése
            </button>
            <small class="text-muted"
              >Új jelszó küldése a megadott E-mail címre.</small
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ElfelejtettJelszo",
  props: {
    msg: String,
  },
  components: {},
  data() {
    return {
      EmailCim: "",
    };
  },
  methods: {
    refreshData() {},
    eMailKuldes(EmailCim) {
      axios
        .post(this.$store.state.API_URL + "Jelszo/" + EmailCim)
        .then((response) => {
          let uzi = response.data;
          alert(uzi);
        })
        .catch((error) => {
          alert(error);
        });
        this.EmailCim="";
    },

    closeClick() {
      this.EmailCim = "";
      this.$router.push("/");
    },
  },
  mounted: function () {
    this.refreshData();
  },
};
</script>

<style scoped></style>
