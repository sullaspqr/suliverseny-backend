<template>
  <div class="felhasznalok container-fluid">
    <!--HelloWorld msg="Versenyek adatai" /-->
    <VersenyHozzaAd msg="Versenyadatok karbantartása" />
    <div v-if="logged && lathato">
      <button
        v-if="betoltve"
        style="margin: 10px"
        type="button"
        class="btn btn-primary float-end"
        @click="nyit()"
      >
        Új verseny hozzáadása
      </button>
      <button v-else class="btn btn-primary float-end" type="button" disabled>
        <span
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        Adatok betöltése folyamatban...
      </button>
    </div>
    <div v-if="logged" class="">
      <div v-if="felhasznalokSzama == 0">
        <div class="accordion" id="accordionVersenyAdatok">
          <div
            class="accordion-item"
            v-for="versenyAdat in versenyAdatok"
            v-bind:key="versenyAdat.id"
          >
            <h2 class="accordion-header" :id="'heading' + versenyAdat.id">
              <button
                class="acc-btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + versenyAdat.id"
                aria-expanded="false"
                :aria-controls="'collapse' + versenyAdat.id"
              >
                <div>
                  <h5 style="color: blue; font-weight: bold">
                    <img
                      :src="
                        'data:image/jpeg;base64,' + versenyAdat.iskola.smallLogo
                      "
                      style="width: 40px; margin-top: -5px"
                    />
                    {{ versenyAdat.iskola.nev }},
                    {{ this.versenyek[versenyAdat.versenyId] }} -
                    {{ versenyAdat.szint.szintNev }} forduló, Helyszin:
                    {{ versenyAdat.helyszin }} Tantárgy:
                    {{ versenyAdat.tantargy }}
                  </h5>
                  <div class="d-flex justify-content-between w-100">
                    <div>
                      <h5>
                        Felkészítő oktató(k):
                        {{ this.felkeszitokNevei(versenyAdat.felkeszitoks) }}
                        Résztvevő diák(ok):
                        {{ this.diakokNevei(versenyAdat.versenyzoks) }}
                      </h5>
                    </div>
                    <div style="padding-right: 10px">
                      <button
                        type="button"
                        class="btn btn-primary btn-sm jobb"
                        title="Verseny törlése"
                        @click="versenyTorolClick(versenyAdat.id)"
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
                    </div>
                  </div>
                  <p style="font-style: italic; margin-top: -5px">
                    Egyéb információ: {{ versenyAdat.egyebInfo }}
                  </p>
                </div>
              </button>
            </h2>
            <div
              :id="'collapse' + versenyAdat.id"
              class="accordion-collapse collapse"
              :aria-labelledby="'heading' + versenyAdat.id"
              data-bs-parent="#accordionVersenyAdatok"
            >
              <div class="accordion-body">
                <div class="row">
                  <div
                    class="col-xxl-6 col-xl-6 col-lg-12 col-md-12 border border-primary rounded"
                  >
                    <h1>Verseny adatai</h1>
                    <form class="row g-3">
                      <div class="col-5">
                        <label
                          :for="'inputVersenyNeve' + versenyAdat.id"
                          class="form-label"
                          >Verseny neve</label
                        >
                        <select
                          :id="'inputVersenyNeve' + versenyAdat.id"
                          class="form-select"
                          @blur="torzsadatokTarolasa(versenyAdat)"
                          :value="this.versenyek[versenyAdat.versenyId]"
                        >
                          <option
                            v-for="verseny in versenyek"
                            v-bind:key="verseny.id"
                            :value="verseny"
                          >
                            {{ verseny }}
                          </option>
                        </select>
                      </div>
                      <div class="col-1">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm lent torles"
                          title="További verseny hozzáadása"
                          data-bs-toggle="modal"
                          data-bs-target="#versenyHozzaAdModal"
                          @focus="versenyClick()"
                        >
                          +
                        </button>
                      </div>
                      <div class="col-6">
                        <label
                          :for="'inputSzint' + versenyAdat.id"
                          class="form-label"
                          >Verseny forduló szint</label
                        >
                        <select
                          :id="'inputSzint' + versenyAdat.id"
                          class="form-select"
                          @blur="torzsadatokTarolasa(versenyAdat)"
                          :value="this.szintek[versenyAdat.szintId]"
                        >
                          <option
                            v-for="szint in szintek"
                            v-bind:key="szint.id"
                            :value="szint"
                          >
                            {{ szint }}
                          </option>
                        </select>
                      </div>
                      <div class="col-md-4">
                        <label
                          :for="'inputHelyszin' + versenyAdat.id"
                          class="form-label"
                          >Helyszín</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          :id="'inputHelyszin' + versenyAdat.id"
                          placeholder="Város, intézmény, stb..."
                          @blur="torzsadatokTarolasa(versenyAdat)"
                          :value="versenyAdat.helyszin"
                          required
                        />
                      </div>
                      <div class="col-md-4">
                        <label
                          :for="'inputIdopont' + versenyAdat.id"
                          class="form-label"
                          >Verseny időpontja</label
                        >
                        <input
                          type="date"
                          class="form-control"
                          :id="'inputIdopont' + versenyAdat.id"
                          @blur="torzsadatokTarolasa(versenyAdat)"
                          :value="versenyAdat.idopont.substring(0, 10)"
                        />
                      </div>
                      <div class="col-md-4">
                        <label
                          :for="'inputTantargy' + versenyAdat.id"
                          class="form-label"
                          >Tantárgy, kategória</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          :id="'inputTantargy' + versenyAdat.id"
                          placeholder="Tantárgy, kategória"
                          @blur="torzsadatokTarolasa(versenyAdat)"
                          :value="versenyAdat.tantargy"
                        />
                      </div>
                      <div class="col-md-12">
                        <label
                          :for="'inputEgyebInfo' + versenyAdat.id"
                          class="form-label"
                          >Egyéb információ(k)</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          :id="'inputEgyebInfo' + versenyAdat.id"
                          placeholder="Elmaradt, sikertelen részvétel, stb..."
                          @blur="torzsadatokTarolasa(versenyAdat)"
                          :value="versenyAdat.egyebInfo"
                        />
                      </div>
                      <div class="col-6">
                        <button
                          v-if="versenyAdat.id != 0"
                          type="button"
                          class="btn btn-primary lent"
                          @click="tarolClick(versenyAdat)"
                        >
                          Változások mentése
                        </button>
                        <button
                          v-else
                          type="button"
                          class="btn btn-primary lent"
                          @click="tarolClick(versenyAdat)"
                        >
                          Új verseny adatainak tárolása
                        </button>
                      </div>
                      <div class="col-6">
                        <button
                          v-if="
                            versenyAdat.id != 0 && !versenyAdat.tovabbjutott
                          "
                          type="button"
                          class="btn btn-primary lent"
                          @click="tovabbJutasClick(versenyAdat.id)"
                        >
                          Továbbjutás indítása
                        </button>
                        <button
                          v-else
                          type="button"
                          disabled
                          class="btn btn-primary lent"
                        >
                          Továbbjutottak a következő szintre
                        </button>
                      </div>
                      <small
                        v-if="versenyAdat.id == 0"
                        class="text-muted"
                        style="margin-top: -10px"
                        >A tárolás gomb lenyomása előtt megadhatja a további
                        felkészítő oktatók és induló diákok adatai is.</small
                      >
                      <small
                        v-else
                        class="text-muted"
                        style="margin-top: -10px"
                        >A Továbbjutás indítása gomb lenyomása után a verseny minden adata egy szinttel magasabban is megjelenik. A további eredményeket már azon a szinten kell rögzíteni.
                        </small
                      >
                    </form>
                  </div>
                  <div
                    class="border col-xxl-3 col-xl-3 col-lg-6 col-md-6 border-primary rounded"
                  >
                    <div class="row">
                      <div class="col-10">
                        <p class="h2" style="margin-top: 10px">
                          Felkészítő oktató(k)
                        </p>
                      </div>
                      <div class="col-2">
                        <button
                          type="button"
                          class="btn btn-primary float-end fent btn-sm"
                          title="További felkészítő oktató hozzáadása"
                          @click="felkeszitoHozzaAdClick(versenyAdat)"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <form class="row">
                      <div
                        v-for="felkeszitoOktato in felkeszitoOktatok"
                        v-bind:key="felkeszitoOktato.id"
                      >
                        <div
                          class="row"
                          v-if="
                            felkeszitoOktato.versenyadatokId == versenyAdat.id
                          "
                        >
                          <div class="col-10">
                            <label
                              :for="'inputOktatoNeve' + felkeszitoOktato.id"
                              class="form-label"
                              >Oktató neve</label
                            >
                            <select
                              v-if="
                                felkeszitoOktato.oktatoId ==
                                  versenyAdat.rogzitoOktatoId &&
                                this.$store.state.jogosultsag < 6
                              "
                              disabled
                              :id="'inputOktatoNeve' + felkeszitoOktato.id"
                              class="form-select"
                              :value="
                                this.felkeszitok[felkeszitoOktato.oktatoId]
                              "
                            >
                              <option
                                :value="
                                  this.felkeszitok[felkeszitoOktato.oktatoId]
                                "
                              >
                                {{
                                  this.felkeszitok[felkeszitoOktato.oktatoId]
                                }}
                              </option>
                            </select>
                            <select
                              v-else
                              :id="'inputOktatoNeve' + felkeszitoOktato.id"
                              class="form-select"
                              :value="
                                this.felkeszitok[felkeszitoOktato.oktatoId]
                              "
                              @blur="selectFelkeszitoOktatoClick(versenyAdat)"
                            >
                              <option
                                v-for="felkeszito in felkeszitok"
                                v-bind:key="felkeszito.id"
                                :value="felkeszito"
                              >
                                {{ felkeszito }}
                              </option>
                            </select>
                          </div>
                          <div class="col-2">
                            <button
                              v-if="
                                felkeszitoOktato.oktatoId !=
                                  versenyAdat.rogzitoOktatoId ||
                                this.$store.state.jogosultsag > 5
                              "
                              type="button"
                              class="btn btn-primary btn-sm lent torles"
                              title="Felkészítő oktató törlése"
                              @click="felkeszitoTorolClick(felkeszitoOktato)"
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
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div
                    class="border col-xxl-3 col-xl-3 col-lg-6 col-md-6 border-primary rounded"
                  >
                    <div class="row">
                      <div class="col-10">
                        <p class="h2" style="margin-top: 10px">
                          Induló diák(ok)
                        </p>
                      </div>
                      <div class="col-2">
                        <button
                          type="button"
                          class="btn btn-primary btn-sm float-end fent"
                          @click="diakHozzaAdClick(versenyAdat)"
                          title="További induló diák hozzáadása"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <form class="row">
                      <div
                        v-for="versenyzo in versenyzok"
                        v-bind:key="versenyzo.id"
                      >
                        <div
                          class="row"
                          v-if="versenyzo.versenyadatokId == versenyAdat.id"
                        >
                          <div class="col-6">
                            <label
                              :for="'inputDiakNeve' + versenyzo.id"
                              class="form-label"
                              >Diák neve</label
                            >
                            <select
                              :id="'inputDiakNeve' + versenyzo.id"
                              class="form-select"
                              :value="this.diakok[versenyzo.diakId]"
                              @blur="selectVersenyzoClick(versenyAdat)"
                            >
                              <option
                                v-for="diak in diakok"
                                v-bind:key="diak.id"
                                :value="diak"
                              >
                                {{ diak }}
                              </option>
                            </select>
                          </div>
                          <div class="col-2">
                            <label
                              :for="'inputHelyezes' + versenyzo.id"
                              class="form-label"
                              style="font-size: 12px"
                              >Helyezés</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              :id="'inputHelyezes' + versenyzo.id"
                              :value="versenyzo.helyezes"
                              @blur="helyezesBlur(versenyAdat, versenyzo)"
                            />
                          </div>
                          <div class="col-2">
                            <label
                              :for="'inputPontszam' + versenyzo.id"
                              class="form-label"
                              style="font-size: 12px"
                              >Pontszám</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              :id="'inputPontszam' + versenyzo.id"
                              :value="versenyzo.pontszam"
                              @blur="pontszamBlur(versenyAdat, versenyzo)"
                            />
                          </div>
                          <div class="col-2">
                            <button
                              type="button"
                              class="btn btn-primary btn-sm torles"
                              title="Induló diák törlése"
                              @click="diakTorolClick(versenyzo)"
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
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
import HelloWorld from "@/components/HelloWorld.vue";
import VersenyHozzaAd from "@/components/VersenyHozzaAd.vue";
import * as bootstrap from "bootstrap";
//window.bootstrap = bootstrap;

export default {
  name: "VersenyAdatokView",
  components: {
    HelloWorld,
    VersenyHozzaAd,
  },
  data() {
    return {
      betoltve: false,
      tarol: true,
      fo_id: 10000,
      d_id: 10000,
      emptyDatasFelkeszitoOktatok: [],
      emptyDatasVersenyzok: [],
      lathato: true,
      logged: this.$store.state.logged,
      sikeresBejelentkezes: false,
      versenyAdatok: [],
      felkeszitoOktatok: [],
      versenyzok: [],
      versenyek: {},
      szintek: {},
      diakok: {},
      felkeszitok: {},
      felhasznalokSzama: 0,
      uresFelkeszito: {
        id: 0,
        versenyadatokId: 0,
        oktatoId: 0,
      },
      uresVersenyAdat: {
        id: 0,
        tanev: this.$store.state.tanev,
        iskolaId: this.$store.state.iskolaId,
        versenyId: 0,
        szintId: 0,
        szint: {
          id: 0,
          szintId: 0,
          szintNev: "",
        },
        idopont: "",
        helyszin: "",
        tantargy: "",
        egyebInfo: "",
        rogzitoOktatoId: this.$store.state.rogzitoOktatoId,
        tovabbjutott: false,
        iskola: {
          id: 0,
          iskolaId: 0,
          nev: "",
          smallLogo: "",
          iskolalogok: {
            id: 1,
            iskolaId: 0,
            logo: "",
          },
          diakoks: [],
          felhasznaloks: [],
        },
        rogzitoOktato: null,
        verseny: {
          id: 0,
          nev: "",
          szint: "",
          rendezoSzervezet: "",
        },
        felkeszitoks: [],
        versenyzoks: [],
      },
    };
  },
  methods: {
    versenyTorolClick(adat) {
      this.betoltve = false;
      if (adat == 0) {
        this.versenyAdatok.splice(0, 1);
        this.felkeszitoOktatok.splice(this.felkeszitoOktatok.length - 1, 1);
        this.lathato = true;
        this.betoltve = true;
      } else {
        if (confirm("Biztosan törli a versenyt?")) {
          this.betoltve = false;
          let url =
            this.$store.state.API_URL +
            "VersenyAdatok/" +
            this.$store.state.Uid +
            "?id=" +
            adat;
          axios
            .delete(url)
            .then((response) => {
              this.refreshData(true, true, true, 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    },
    torzsadatokTarolasa(adat) {
      let versenyKey = Object.keys(this.versenyek).find(
        (key) =>
          this.versenyek[key] ===
          document.getElementById("inputVersenyNeve" + adat.id).value
      );
      adat.versenyId = versenyKey;
      let szintKey = Object.keys(this.szintek).find(
        (key) =>
          this.szintek[key] ===
          document.getElementById("inputSzint" + adat.id).value
      );
      adat.szintId = szintKey;
      //adat.szint = document.getElementById("inputSzint" + adat.id).value;
      adat.helyszin = document.getElementById("inputHelyszin" + adat.id).value;
      adat.idopont = document.getElementById("inputIdopont" + adat.id).value;
      adat.tantargy = document.getElementById("inputTantargy" + adat.id).value;
      adat.egyebInfo = document.getElementById(
        "inputEgyebInfo" + adat.id
      ).value;
    },
    helyezesBlur(adat, diak) {
      let helyezes = "";
      let j = 0;
      let index = j;
      let vege = this.versenyzok.length;
      while (j < vege) {
        if (
          this.versenyzok[j].versenyadatokId == adat.id &&
          this.versenyzok[j].diakId == diak.diakId
        ) {
          helyezes = document.getElementById(
            "inputHelyezes" + this.versenyzok[j].id
          ).value;
          index = j;
          j = vege;
        }
        j++;
      }
      if (adat.id == 0) {
        this.versenyzok[index].helyezes = helyezes;
      } else {
        diak.helyezes = helyezes;
        this.versenyzokModositasa(diak);
      }
    },
    pontszamBlur(adat, diak) {
      let pontszam = "";
      let j = 0;
      let index = j;
      let vege = this.versenyzok.length;
      while (j < vege) {
        if (
          this.versenyzok[j].versenyadatokId == adat.id &&
          this.versenyzok[j].diakId == diak.diakId
        ) {
          pontszam = document.getElementById(
            "inputPontszam" + this.versenyzok[j].id
          ).value;
          index = j;
          j = vege;
        }
        j++;
      }
      if (adat.id == 0) {
        this.versenyzok[index].pontszam = pontszam;
      } else {
        diak.pontszam = pontszam;
        this.versenyzokModositasa(diak);
      }
    },
    selectFelkeszitoOktatoClick(adat) {
      for (let i = 0; i < this.felkeszitoOktatok.length; i++) {
        if (this.felkeszitoOktatok[i].versenyadatokId == adat.id) {
          let oktatoKey = this.oktatoIdLeker(this.felkeszitoOktatok[i].id);
          if (this.felkeszitoOktatok[i].oktatoId != oktatoKey) {
            this.felkeszitoOktatok[i].oktatoId = oktatoKey;
            if (this.felkeszitoOktatok[i].versenyadatokId != 0) {
              if (this.felkeszitoOktatok[i].id > 10000) {
                let oldId = this.felkeszitoOktatok[i].id;
                this.felkeszitoOktatok[i].id = 0;
                axios
                  .post(
                    this.$store.state.API_URL +
                      "Felkeszitok/" +
                      this.$store.state.Uid,
                    this.felkeszitoOktatok[i]
                  )
                  .then((response) => {
                    //alert(response.data);
                  })
                  .catch((error) => {
                    alert(
                      "Az oktató már korábban hozzárendelésre került ehhez a versenyhez!"
                    );
                    if (oldId < 10000) {
                      this.felkeszitoOktatok[i].id = oldId;
                      this.felkeszitoOktatok[i].oktatoId = 0;
                    }
                  });
              } else {
                axios
                  .put(
                    this.$store.state.API_URL +
                      "Felkeszitok/" +
                      this.$store.state.Uid,
                    this.felkeszitoOktatok[i]
                  )
                  .then((response) => {
                    //alert(response.data);
                  })
                  .catch((error) => {
                    alert(
                      "Az oktató már korábban hozzárendelésre került ehhez a versenyhez!"
                    );
                  });
              }
              this.emptyBackupFelkeszitoOktatok();
              this.refreshData(true, false, false, 1000);
            } else {
              let j = 0;
              let vege = this.felkeszitoOktatok.length;
              while (j < vege) {
                if (
                  this.felkeszitoOktatok[j].versenyadatokId == 0 &&
                  this.felkeszitoOktatok[j].id !=
                    this.felkeszitoOktatok[i].id &&
                  this.felkeszitoOktatok[j].oktatoId == oktatoKey
                ) {
                  alert(
                    "A kiválasztott oktató már hozzá van rendelve ehhez a versenyhez!"
                  );
                  this.felkeszitoOktatok[i].oktatoId = 0;
                  j = vege;
                }
                j++;
              }
            }
          }
        }
      }
    },
    selectVersenyzoClick(adat) {
      for (let i = 0; i < this.versenyzok.length; i++) {
        if (this.versenyzok[i].versenyadatokId == adat.id) {
          let diakKey = this.diakIdLeker(this.versenyzok[i].id);
          if (this.versenyzok[i].diakId != diakKey) {
            this.versenyzok[i].diakId = diakKey;
            if (this.versenyzok[i].versenyadatokId != 0) {
              if (this.versenyzok[i].id > 10000) {
                let oldId = this.versenyzok[i].id;
                this.versenyzok[i].id = 0;
                axios
                  .post(
                    this.$store.state.API_URL +
                      "Versenyzok/" +
                      this.$store.state.Uid,
                    this.versenyzok[i]
                  )
                  .then((response) => {
                    //alert(response.data);
                  })
                  .catch((error) => {
                    alert(
                      "Az induló diák már korábban hozzárendelésre került ehhez a versenyhez!"
                    );
                    if (oldId < 10000) {
                      this.versenyzok[i].id = oldId;
                      this.versenyzok[i].diakId = 0;
                    }
                  });
              } else {
                this.versenyzokModositasa(this.versenyzok[i]);
              }
              this.emptyBackupVersenyzok();
              this.refreshData(false, true, false, 1000);
            } else {
              let j = 0;
              let vege = this.versenyzok.length;
              while (j < vege) {
                if (
                  this.versenyzok[j].versenyadatokId == 0 &&
                  this.versenyzok[j].id != this.versenyzok[i].id &&
                  this.versenyzok[j].diakId == diakKey
                ) {
                  alert(
                    "A kiválasztott diák már hozzárendelve van ehhez a versenyhez!"
                  );
                  this.versenyzok[i].diakId = 0;
                  j = vege;
                }
                j++;
              }
            }
          }
        }
      }
    },
    versenyzokModositasa(adat) {
      axios
        .put(
          this.$store.state.API_URL + "Versenyzok/" + this.$store.state.Uid,
          adat
        )
        .then((response) => {
          //alert(response.data);
        })
        .catch((error) => {
          alert(
            "A diák már korábban hozzárendelésre került ehhez a versenyhez!"
          );
        });
    },
    emptyBackupFelkeszitoOktatok() {
      this.emptyDatasFelkeszitoOktatok = [];
      for (let i = 0; i < this.felkeszitoOktatok.length; i++) {
        if (this.felkeszitoOktatok[i].versenyadatokId == 0) {
          this.emptyDatasFelkeszitoOktatok.push(this.felkeszitoOktatok[i]);
        }
      }
    },
    async emptyRestoreFelkeszitoOktatok() {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 100);
      });

      let result = await promise;
      for (let i = 0; i < this.emptyDatasFelkeszitoOktatok.length; i++) {
        this.felkeszitoOktatok.push(this.emptyDatasFelkeszitoOktatok[i]);
      }
    },
    emptyBackupVersenyzok() {
      this.emptyDatasVersenyzok = [];
      for (let i = 0; i < this.versenyzok.length; i++) {
        if (this.versenyzok[i].versenyadatokId == 0) {
          this.emptyDatasVersenyzok.push(this.versenyzok[i]);
        }
      }
    },
    async emptyRestoreVersenyzok() {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 100);
      });

      let result = await promise;
      for (let i = 0; i < this.emptyDatasVersenyzok.length; i++) {
        this.versenyzok.push(this.emptyDatasVersenyzok[i]);
      }
    },
    async refreshData(fol, vl, val, time) {
      this.betoltve = false;
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), time);
      });

      let result = await promise;
      if (fol) {
        this.felkeszitoOktatokLekerese(true);
      }
      if (vl) {
        this.versenyzokLekerese(true);
      }
      if (val) {
        this.versenyadatokLekerese();
      }
      this.tarol = true;
    },
    async nyit() {
      this.uresVersenyAdat.versenyId = 0;
      this.uresVersenyAdat.szintId = 0;
      //this.uresVersenyAdat.szint = "";
      this.uresVersenyAdat.idopont = "";
      this.uresVersenyAdat.helyszin = "";
      this.uresVersenyAdat.tantargy = "";
      this.uresVersenyAdat.egyebInfo = "";
      this.versenyAdatok.splice(0, 0, this.uresVersenyAdat);
      let felkeszito = this.uresFelkeszito;
      felkeszito.versenyadatokId = 0;
      felkeszito.oktatoId = this.$store.state.rogzitoOktatoId;
      this.felkeszitoOktatok.push(felkeszito);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 100);
      });

      let result = await promise;
      var myCollapse = document.getElementsByClassName("collapse");
      var bsCollapse = new bootstrap.Collapse(myCollapse.item(0), {
        toggle: true,
      });
      this.lathato = false;
    },
    oktatoIdLeker(id) {
      let oktatoId = Object.keys(this.felkeszitok).find(
        (key) =>
          this.felkeszitok[key] ===
          document.getElementById("inputOktatoNeve" + id).value
      );
      return oktatoId;
    },
    diakIdLeker(id) {
      let diakId = Object.keys(this.diakok).find(
        (key) =>
          this.diakok[key] ===
          document.getElementById("inputDiakNeve" + id).value
      );
      return diakId;
    },
    versenyClick() {
      this.versenyekLekerese();
    },
    async felkeszitoHozzaAdClick(adat) {
      if (
        this.felkeszitoOktatok[this.felkeszitoOktatok.length - 1].oktatoId == 0
      ) {
        this.felkeszitoOktatok.splice(this.felkeszitoOktatok.length - 1, 1);
      }
      this.fo_id += 1;
      let felkeszito = {
        id: 0,
        versenyadatokId: 0,
        oktatoId: 0,
      };
      felkeszito.id = this.fo_id;
      felkeszito.versenyadatokId = adat.id;
      felkeszito.oktatoId = 0;
      this.felkeszitoOktatok.push(felkeszito);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000);
      });
    },
    felkeszitoTorolClick(adat) {
      if (adat.id <= 10000) {
        if (confirm("Biztosan törli a felkészítő oktatót?")) {
          this.emptyBackupFelkeszitoOktatok();
          let url =
            this.$store.state.API_URL +
            "Felkeszitok/" +
            this.$store.state.Uid +
            "?id=" +
            adat.id;
          axios
            .delete(url)
            .then((response) => {
              //alert(response.data);
              this.refreshData(true, false, false, 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        let talalt = false;
        let i = 0;
        while (!talalt && i < this.felkeszitoOktatok.length) {
          if (this.felkeszitoOktatok[i].id == adat.id) {
            talalt = true;
            this.felkeszitoOktatok.splice(i, 1);
          }
          i++;
        }
      }
    },
    async diakHozzaAdClick(adat) {
      if (this.versenyzok[this.versenyzok.length - 1].diakId == 0) {
        this.versenyzok.splice(this.versenyzok.length - 1, 1);
      }
      this.d_id += 1;
      let versenyzo = {
        id: 0,
        versenyadatokId: 0,
        diakId: 0,
        pontszam: "",
        helyezes: "",
      };
      versenyzo.id = this.d_id;
      versenyzo.versenyadatokId = adat.id;
      versenyzo.diakId = 0;
      versenyzo.pontszam = "";
      versenyzo.helyezes = "";
      this.versenyzok.push(versenyzo);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000);
      });
    },
    diakTorolClick(adat) {
      if (adat.id <= 10000) {
        if (confirm("Biztosan törli az induló diákot?")) {
          this.emptyBackupVersenyzok();
          let url =
            this.$store.state.API_URL +
            "Versenyzok/" +
            this.$store.state.Uid +
            "?id=" +
            adat.id;
          axios
            .delete(url)
            .then((response) => {
              //alert(response.data);
              this.refreshData(false, true, false, 1000);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        let talalt = false;
        let i = 0;
        while (!talalt && i < this.versenyzok.length) {
          if (this.versenyzok[i].id == adat.id) {
            talalt = true;
            this.versenyzok.splice(i, 1);
          }
          i++;
        }
      }
    },
    versenyAdatFeltolt(id) {
      let db = this.versenyAdatok.length;
      let i = 0;
      let index = i;
      while (i < db) {
        if (this.versenyAdatok[i].id == id) {
          index = i;
          i = db;
        }
        i++;
      }
      let versenyAdat = {
        id: this.versenyAdatok[index].id,
        tanev: this.versenyAdatok[index].tanev,
        iskolaId: this.versenyAdatok[index].iskolaId,
        versenyId: this.versenyAdatok[index].versenyId,
        szintId: this.versenyAdatok[index].szintId,
        idopont: this.versenyAdatok[index].idopont,
        helyszin: this.versenyAdatok[index].helyszin,
        tantargy: this.versenyAdatok[index].tantargy,
        egyebInfo: this.versenyAdatok[index].egyebInfo,
        rogzitoOktatoId: this.versenyAdatok[index].rogzitoOktatoId,
        tovabbjutott: false,
      };
      return versenyAdat;
    },
    tovabbJutasClick(Id) {
      if (confirm("Biztosan elindítja a továbbjutás műveletet?")) {
      let versenyAdat = this.versenyAdatFeltolt(Id);
      versenyAdat.tovabbjutott = true;
      axios
        .put(
          this.$store.state.API_URL + "VersenyAdatok/" + this.$store.state.Uid,
          versenyAdat
        )
        .then((response) => {
          alert(response.data);
        })
        .catch((error) => {
          alert(error);
        });
      versenyAdat.szintId=versenyAdat.szintId-1;
      versenyAdat.tovabbjutott = false;
      versenyAdat.id = 0;
      axios
        .post(
          this.$store.state.API_URL + "VersenyAdatok/" + this.$store.state.Uid,
          versenyAdat
        )
        .then((response) => {
          let versenyAdatId = response.data;
          for (let i = 0; i < this.felkeszitoOktatok.length; i++) {
            if (this.felkeszitoOktatok[i].versenyadatokId == Id) {
              let felkeszitoOktatoAdat = {
                id: 0,
                versenyadatokId: versenyAdatId,
                oktatoId: this.felkeszitoOktatok[i].oktatoId,
              };
              axios
                .post(
                  this.$store.state.API_URL +
                    "Felkeszitok/" +
                    this.$store.state.Uid,
                  felkeszitoOktatoAdat
                )
                .then((response) => {
                })
                .catch((error) => {
                  alert(error);
                });
            }
          }
          for (let i = 0; i < this.versenyzok.length; i++) {
            if (this.versenyzok[i].versenyadatokId == Id) {
              let versenyzoAdat = {
                id: 0,
                versenyadatokId: versenyAdatId,
                diakId: this.versenyzok[i].diakId,
                helyezes: this.versenyzok[i].helyezes,
                pontszam: this.versenyzok[i].pontszam,
              };
              axios
                .post(
                  this.$store.state.API_URL +
                    "Versenyzok/" +
                    this.$store.state.Uid,
                  versenyzoAdat
                )
                .then((response) => {
                })
                .catch((error) => {
                  alert(error);
                });
            }
          }
          this.refreshData(true, true, true, 2000);
        })
        .catch((error) => {
          alert(error.data);
        });
      }
    },
    tarolClick(adat) {
      if (this.tarol) {
        this.tarol = false;
        if (adat.id == 0) {
          /*let versenyAdat = {
            id: 0,
            tanev: this.versenyAdatok[0].tanev,
            iskolaId: this.versenyAdatok[0].iskolaId,
            versenyId: this.versenyAdatok[0].versenyId,
            szintId: this.versenyAdatok[0].szintId,
            //szint: this.versenyAdatok[0].szint,
            idopont: this.versenyAdatok[0].idopont,
            helyszin: this.versenyAdatok[0].helyszin,
            tantargy: this.versenyAdatok[0].tantargy,
            egyebInfo: this.versenyAdatok[0].egyebInfo,
            rogzitoOktatoId: this.versenyAdatok[0].rogzitoOktatoId,
            tovabbjutott: false,
          };*/
          let versenyAdat = this.versenyAdatFeltolt(0);
          //console.log(versenyAdat);
          axios
            .post(
              this.$store.state.API_URL +
                "VersenyAdatok/" +
                this.$store.state.Uid,
              versenyAdat
            )
            .then((response) => {
              let versenyAdatId = response.data;
              for (let i = 0; i < this.felkeszitoOktatok.length; i++) {
                if (this.felkeszitoOktatok[i].versenyadatokId == adat.id) {
                  if (typeof this.felkeszitoOktatok[i].oktatoId == "string") {
                    let felkeszitoOktatoAdat = {
                      id: 0,
                      versenyadatokId: versenyAdatId,
                      oktatoId: this.felkeszitoOktatok[i].oktatoId,
                    };
                    axios
                      .post(
                        this.$store.state.API_URL +
                          "Felkeszitok/" +
                          this.$store.state.Uid,
                        felkeszitoOktatoAdat
                      )
                      .then((response) => {
                        //alert(response.data);
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  }
                }
              }
              for (let i = 0; i < this.versenyzok.length; i++) {
                if (this.versenyzok[i].versenyadatokId == adat.id) {
                  if (typeof this.versenyzok[i].diakId == "string") {
                    let versenyzoAdat = {
                      id: 0,
                      versenyadatokId: versenyAdatId,
                      diakId: this.versenyzok[i].diakId,
                      helyezes: this.versenyzok[i].helyezes,
                      pontszam: this.versenyzok[i].pontszam,
                    };
                    axios
                      .post(
                        this.$store.state.API_URL +
                          "Versenyzok/" +
                          this.$store.state.Uid,
                        versenyzoAdat
                      )
                      .then((response) => {
                        //alert(response.data);
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  }
                }
              }
              this.refreshData(true, true, true, 2000);
              this.lathato = true;
            })
            .catch((error) => {
              alert(
                "A verseny kódja, szintje és a verseny időpontja kötelező!"
              );
              this.tarol = true;
            });
        } else {
          /*let db = this.versenyAdatok.length;
          let i = 0;
          let index = i;
          while (i < db) {
            if (this.versenyAdatok[i].id == adat.id) {
              index = i;
              i = db;
            }
            i++;
          }
          let versenyAdat = {
            id: this.versenyAdatok[index].id,
            tanev: this.versenyAdatok[index].tanev,
            iskolaId: this.versenyAdatok[index].iskolaId,
            versenyId: this.versenyAdatok[index].versenyId,
            szintId: this.versenyAdatok[index].szintId,
            //szint: this.versenyAdatok[index].szint,
            idopont: this.versenyAdatok[index].idopont,
            helyszin: this.versenyAdatok[index].helyszin,
            tantargy: this.versenyAdatok[index].tantargy,
            egyebInfo: this.versenyAdatok[index].egyebInfo,
            rogzitoOktatoId: this.versenyAdatok[index].rogzitoOktatoId,
            tovabbjutott: false,
          };*/
          let versenyAdat = this.versenyAdatFeltolt(adat.id);
          console.log(versenyAdat);
          axios
            .put(
              this.$store.state.API_URL +
                "VersenyAdatok/" +
                this.$store.state.Uid,
              versenyAdat
            )
            .then((response) => {
              alert(response.data);
            })
            .catch((error) => {
              alert(error);
            });
          this.tarol = true;
        }
      }
    },
    async versenyadatokLekerese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL +
          "VersenyAdatok/" +
          this.$store.state.Uid +
          "?tanev=" +
          this.$store.state.tanev +
          "&iskolaId=" +
          this.$store.state.iskolaId +
          "&rogzitoOktatoId=" +
          this.$store.state.rogzitoOktatoId;
        await axios
          .get(url)
          .then((response) => {
            this.versenyAdatok = response.data;
            this.betoltve = true;
            this.lathato = true;
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    async versenyekLekerese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL + "Versenyek/" + this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            this.versenyek = {};
            for (let i = 0; i < response.data.length; i++) {
              this.versenyek[response.data[i].id] = response.data[i].nev;
            }
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
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
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    async diakokLekerese() {
      if (this.$store.state.logged) {
        let url = this.$store.state.API_URL + "Diakok/" + this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.diakok[response.data[i].id] =
                response.data[i].nev + " (" + response.data[i].osztaly + ")";
            }
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    async felkeszitokLekerese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL +
          "Felhasznalok?uId=" +
          this.$store.state.Uid +
          "&iskolaId=" +
          this.$store.state.iskolaId;
        await axios
          .get(url)
          .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
              this.felkeszitok[response.data[i].id] =
                response.data[i].teljesNev;
            }
            this.$store.state.felkeszitok = this.felkeszitok;
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    async felkeszitoOktatokLekerese(ertek) {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL + "Felkeszitok/" + this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            this.felkeszitoOktatok = response.data;
            this.emptyRestoreFelkeszitoOktatok();
            if (ertek) {
              this.betoltve = true;
            }
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    async versenyzokLekerese(ertek) {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL + "Versenyzok/" + this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            this.versenyzok = response.data;
            this.emptyRestoreVersenyzok();
            if (ertek) {
              this.betoltve = true;
            }
          })
          .catch((error) => {
            this.felhasznalokSzama = -1;
          });
      }
    },
    async iskolaLekerese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL +
          "Iskolak/" +
          this.$store.state.Uid +
          "," +
          this.$store.state.iskolaId;
        await axios
          .get(url)
          .then((response) => {
            this.uresVersenyAdat.iskola.iskolaId = response.data.iskolaId;
            this.uresVersenyAdat.iskola.nev = response.data.nev;
            //this.uresVersenyAdat.iskola.iskolalogok.logo = response.data.iskolalogok.logo;
            this.uresVersenyAdat.iskola.smallLogo = response.data.smallLogo;
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    felkeszitokNevei(adatok) {
      if (this.felhasznalokSzama >= 0) {
        let nevek = "";
        for (let i = 0; i < adatok.length; i++) {
          nevek += this.felkeszitok[adatok[i].oktatoId];
          if (i < adatok.length - 1) {
            nevek += ", ";
          }
        }
        return nevek;
      }
    },
    diakokNevei(adatok) {
      if (this.felhasznalokSzama >= 0) {
        let nevek = "";
        for (let i = 0; i < adatok.length; i++) {
          nevek += this.diakok[adatok[i].diakId];
          if (i < adatok.length - 1) {
            nevek += ", ";
          }
        }
        return nevek;
      }
    },
  },
  mounted: function () {
    this.diakokLekerese();
    this.felkeszitokLekerese();
    this.versenyekLekerese();
    this.szintekLekerese();
    this.iskolaLekerese();
    this.versenyadatokLekerese();
    this.felkeszitoOktatokLekerese(false);
    this.versenyzokLekerese(false);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.fent {
  margin-top: 12px;
}
.lent {
  margin-bottom: 10px;
}

.torles {
  margin-top: 33px;
  margin-left: -15px;
}

th,
td {
  border: solid 2px black;
}

button.acc-btn {
  display: grid;
  grid-template-columns: 1fr max-content max-content;
  align-items: center;
  grid-gap: 10px;
}
</style>
