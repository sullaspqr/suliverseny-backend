<template>
  <div
    id="versenyHozzaAdModal"
    class="modal fade modal-signin py-5 modal-xl"
    tabindex="-1"
    role="dialog"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content rounded-4">
        <div class="modal-header p-5 pb-4 border-bottom-0 bg-info">
          <h1 class="fw-bold mb-0 fs-2">
            {{ msg }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body p-5 pt-0">
          <form class="">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th class="bal">
                    <div class="d-flex d-row">
                      <input
                        class="form-control m-2"
                        v-model="versenyAdatNevFilter"
                        v-on:keyup="FilterFn()"
                        placeholder="Versenynév részlet"
                      />
                      <button
                        type="button"
                        class="btn btn-light keret"
                        @click="sortResultName('nev', true)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-sort-numeric-down"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M12.438 1.668V7H11.39V2.684h-.051l-1.211.859v-.969l1.262-.906h1.046z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M11.36 14.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.835 1.973-1.835 1.09 0 2.063.636 2.063 2.687 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
                          />
                          <path
                            d="M4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        class="btn btn-light keret"
                        @click="sortResultName('nev', false)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-sort-numeric-up-alt"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M11.36 7.098c-1.137 0-1.708-.657-1.762-1.278h1.004c.058.223.343.45.773.45.824 0 1.164-.829 1.133-1.856h-.059c-.148.39-.57.742-1.261.742-.91 0-1.72-.613-1.72-1.758 0-1.148.848-1.836 1.973-1.836 1.09 0 2.063.637 2.063 2.688 0 1.867-.723 2.848-2.145 2.848zm.062-2.735c.504 0 .933-.336.933-.972 0-.633-.398-1.008-.94-1.008-.52 0-.927.375-.927 1 0 .64.418.98.934.98z"
                          />
                          <path
                            d="M12.438 8.668V14H11.39V9.684h-.051l-1.211.859v-.969l1.262-.906h1.046zM4.5 13.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z"
                          />
                        </svg>
                      </button>
                    </div>
                    Verseny neve
                  </th>
                  <th>Szint</th>
                  <th>Rendező szervezet</th>
                  <th>
                    <div class="d-row">
                      <button
                        title="Új verseny hozzáadása"
                        type="button"
                        class="btn btn-primary m-2 float-end"
                        @click="newClick()"
                      >
                        +
                      </button>
                    </div>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Műveletek&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="versenyAdat in this.versenyekAdatai"
                  v-bind:key="versenyAdat.id"
                >
                  <td v-if="this.modositId != versenyAdat.id" class="bal">
                    {{ versenyAdat.nev }}
                  </td>
                  <td v-else>
                    <div class="form-floating mb-3">
                      <input
                        id="versenyNev"
                        type="text"
                        class="form-control rounded-3"
                        v-model="VersenyNev"
                        placeholder="Verseny neve"
                      />
                      <label for="versenyNev">Verseny neve</label>
                    </div>
                  </td>
                  <td v-if="this.modositId != versenyAdat.id">
                    {{ this.szintek[versenyAdat.szintId] }}
                  </td>
                  <td v-else>
                    <div class="form-floating mb-3">
                      <!--input
                        id="versenySzint"
                        type="text"
                        class="form-control rounded-3"
                        v-model="VersenySzint"
                        placeholder="Verseny szintje (megyei, országos, stb.:"
                      />
                      <label for="versenySzint">Szint</label-->
                      <!--label
                          for="versenySzintId"
                          >Szint</label
                        >
                        <select
                          id="versenySzintId"
                          class="form-control rounded-3"
                          :value="this.szintek[versenyAdat.szintId]"
                        >
                          <option
                            v-for="szint in szintek"
                            v-bind:key="szint.id"
                            :value="szint"
                          >
                            {{ szint }}
                          </option>
                        </select-->
                      <select
                        id="versenySzintId"
                        class="form-select"
                        :value="this.szintek[versenyAdat.szintId]"
                        @blur="szintBeallit()"
                      >
                        <option
                          v-for="szint in szintek"
                          v-bind:key="szint.id"
                          :value="szint"
                        >
                          {{ szint }}
                        </option>
                      </select>
                      <label for="versenySzintId">Szint</label>
                    </div>
                  </td>
                  <td v-if="this.modositId != versenyAdat.id">
                    {{ versenyAdat.rendezoSzervezet }}
                  </td>
                  <td v-else>
                    <div class="form-floating mb-3">
                      <input
                        id="VersenyRendezoSzervezet"
                        type="text"
                        class="form-control rounded-3"
                        v-model="VersenyRendezoSzervezet"
                        placeholder="Rendező szervezet megnevezése"
                      />
                      <label for="VersenyRendezoSzervezet"
                        >Rendező szervezet</label
                      >
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      title="Módosítás"
                      class="btn btn-light mr-1 keret"
                      @click="editClick(versenyAdat)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-pencil"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      title="Törlés"
                      class="btn btn-light mr-1 keret"
                      @click="deleteClick(versenyAdat.id)"
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
                    </button>
                    <button
                      v-if="this.modositId != versenyAdat.id"
                      disabled
                      type="button"
                      title="Tárolás"
                      class="btn btn-light mr-1 keret"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-save2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
                        />
                      </svg>
                    </button>
                    <button
                      v-else
                      type="button"
                      title="Tárolás"
                      class="btn btn-light mr-1 keret"
                      @click="tarolClick(versenyAdat.id)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-save2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v4.5h2a.5.5 0 0 1 .354.854l-2.5 2.5a.5.5 0 0 1-.708 0l-2.5-2.5A.5.5 0 0 1 5.5 6.5h2V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
//import * as bootstrap from "bootstrap";
//window.bootstrap = bootstrap;

export default {
  name: "FelkeszitoHozzaAdView",
  props: {
    msg: String,
  },
  components: {},
  computed: {},
  data() {
    return {
      uj: false,
      VersenyId: 0,
      VersenyNev: "",
      //VersenySzint: "",
      VersenySzintId: 0,
      VersenyRendezoSzervezet: "",
      versenyekAdatai: [],
      versenyekAdataiSzuroNelkul: [],
      versenyAdatIdFilter: "",
      versenyAdatNevFilter: "",
      modositId: 0,
      uresVerseny: {
        id: 0,
        nev: "",
        szintId: 0,
        rendezoSzervezet: "",
        rogzitoOktatoId: this.$store.state.rogzitoOktatoId,
      },
      szintek: {},
    };
  },
  methods: {
    refreshData() {
      this.versenyekLekerdezese();
      this.mezoUrit();
    },
    szintBeallit() {
      this.uresVerseny.szintId = Object.keys(this.szintek).find(
        (key) =>
          this.szintek[key] === document.getElementById("versenySzintId").value
      );
    },
    newClick() {
      if (!this.uj) {
        this.uresVerseny.id = 0;
        this.uresVerseny.nev = "";
        (this.VersenyNev = ""),
          (this.VersenyRendezoSzervezet = ""),
          (this.uresVerseny.szintId = 0);
        this.uresVerseny.rendezoSzervezet = "";
        this.rogzitoOktatoId = this.$store.state.rogzitoOktatoId;
        this.versenyekAdatai.splice(0, 0, this.uresVerseny);
        this.uj = true;
      }
    },
    mezoUrit() {
      this.VersenyId = 0;
      this.VersenyNev = "";
      this.VersenySzintId = 0;
      this.VersenyRendezoSzervezet = "";
      this.rogzitoOktatoId = this.$store.state.rogzitoOktatoId;
      this.modositId = 0;
      this.uj = false;
    },
    editClick(versenyAdat) {
      if (this.modositId == versenyAdat.id) {
        this.modositId = 0;
      } else {
        this.VersenyId = versenyAdat.id;
        this.VersenyNev = versenyAdat.nev;
        this.VersenySzintId = versenyAdat.szintId;
        this.VersenyRendezoSzervezet = versenyAdat.rendezoSzervezet;
        this.modositId = versenyAdat.id;
      }
    },
    deleteClick(adat) {
      if (this.uj) {
        this.torles();
      } else {
        if (confirm("Biztosan törli a verseny adatait?")) {
          let url =
            this.$store.state.API_URL +
            "Versenyek/" +
            this.$store.state.Uid +
            "?id=" +
            adat;
          console.log(url);
          axios
            .delete(url)
            .then((response) => {
              alert(response.data);
              this.refreshData();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    torles() {
      this.versenyekAdatai.splice(0, 1);
      this.uj = false;
    },
    tarolClick(adat) {
      if (this.VersenyNev != "") {
        let versenyaAdat = {
          id: adat,
          nev: this.VersenyNev,
          szintId: this.uresVerseny.szintId,
          rendezoSzervezet: this.VersenyRendezoSzervezet,
          rogzitoOktatoId: this.$store.state.rogzitoOktatoId,
        };
        //console.log(versenyaAdat);
        if (adat == 0) {
          axios
            .post(
              this.$store.state.API_URL + "Versenyek/" + this.$store.state.Uid,
              versenyaAdat
            )
            .then((response) => {
              alert(response.data);
              this.refreshData();
            })
            .catch((error) => {
              alert("Már van ilyen nevű verseny!");
              //alert(error);
            });
        } else {
          axios
            .put(
              this.$store.state.API_URL + "Versenyek/" + this.$store.state.Uid,
              versenyaAdat
            )
            .then((response) => {
              alert(response.data);
              this.refreshData();
            })
            .catch((error) => {
              //alert(error);
              alert("Már van ilyen nevű verseny!");
            });
        }
      } else {
        alert("A verseny nevét kötelező megadni!");
      }
    },
    versenyekLekerdezese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL +
          "Versenyek/" +
          this.$store.state.Uid +
          "," +
          this.$store.state.rogzitoOktatoId;
        axios
          .get(url)
          .then((response) => {
            this.versenyekAdatai = response.data;
            this.versenyekAdataiSzuroNelkul = response.data;
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    async szintekLekerese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL + "Szintek/" + this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            this.szintek = {};
            //console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
              this.szintek[response.data[i].szintId] =
                response.data[i].szintNev;
            }
            this.$store.state.szintek = this.szintek;
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    closeClick() {
      const backdrop = document.getElementsByClassName("modal-backdrop");
      backdrop[0].remove();
      this.$router.push("/");
    },
    FilterFn() {
      if (this.uj) {
        this.torles();
      }
      let versenyAdatIdFilter = this.versenyAdatIdFilter;
      let versenyAdatNevFilter = this.versenyAdatNevFilter;
      this.versenyekAdatai = this.versenyekAdataiSzuroNelkul.filter(function (
        el
      ) {
        return (
          el.id
            .toString()
            .toLowerCase()
            .includes(versenyAdatIdFilter.toString().trim().toLowerCase()) &&
          el.nev
            .toString()
            .toLowerCase()
            .includes(versenyAdatNevFilter.toString().trim().toLowerCase())
        );
      });
    },
    sortResultId(prop, asc) {
      if (this.uj) {
        this.torles();
      }
      this.versenyekAdatai = this.versenyekAdataiSzuroNelkul.sort(function (
        a,
        b
      ) {
        if (asc) {
          return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        } else {
          return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0;
        }
      });
    },
    sortResultName(prop, asc) {
      if (this.uj) {
        this.torles();
      }
      this.versenyekAdatai = this.versenyekAdataiSzuroNelkul.sort(function (
        a,
        b
      ) {
        if (asc) {
          return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        } else {
          return a[prop] < b[prop] ? 1 : a[prop] > b[prop] ? -1 : 0;
        }
      });
    },
  },
  mounted: function () {
    this.szintekLekerese();
    this.refreshData();
  },
};
</script>

<style scoped>
.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.jobb {
  text-align: right;
}

.bal {
  text-align: left;
}

.kozep {
  text-align: center;
}

.kozep:hover {
  transform: scale(0);
}
</style>
