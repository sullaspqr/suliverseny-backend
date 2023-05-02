<template>
  <div class="home">
    <!--HelloWorld msg="Versenyek nyilvántartó rendszere - Listázás" /-->
    <button @click="generateLista1">Lista generálása</button>
    <button @click="jsonFile">JSON generálása</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import jspdf from "jspdf";
import axios from "axios";

export default {
  name: "ListazasView",
  components: {
    HelloWorld,
  },
  data() {
    return {
      adatok: [],
      diakok: {},
      felkeszitok: {},
    };
  },
  methods: {
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
            alert(error.data);
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
            alert(error.data);
          });
      }
    },
    async versenyadatokLekerese() {
      if (this.$store.state.logged) {
        let url =
          this.$store.state.API_URL +
          "VersenyAdatok/lista1/" +
          this.$store.state.Uid;
        await axios
          .get(url)
          .then((response) => {
            this.adatok = response.data;
          })
          .catch((error) => {
            alert(error.data);
          });
      }
    },
    jsonFile() {
      const data = JSON.stringify(this.adatok);
      const blob = new Blob([data], { type: "text/plain" });
      const e = document.createEvent("MouseEvents"),
        a = document.createElement("a");
      a.download = "test.json";
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
      e.initEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      a.dispatchEvent(e);
    },
    async generateLista1() {
      console.log(this.adatok);
      console.log(this.diakok);
      console.log(this.felkeszitok);
      const pdf = new jspdf({
        orientation: "l",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
      });

      pdf.setFontSize(8);
      pdf.text("", 10, 10);
      for (let i = 0; i < this.adatok.length; i++) {
        let oktatok = "";
        for (let j = 0; j < this.adatok[i].felkeszitoks.length; j++) {
          oktatok += this.felkeszitok[this.adatok[i].felkeszitoks[j].oktatoId];
          this.adatok[i].felkeszitoks[j].oktatoId =
            this.felkeszitok[this.adatok[i].felkeszitoks[j].oktatoId];
          console.log(this.adatok[i].felkeszitoks[j].oktatoId);
          if (j != this.adatok[i].felkeszitoks.length - 1) {
            oktatok += ",";
          }
        }
        oktatok = oktatok.replace("ő", "ö");
        let versenyzok = "";
        for (let j = 0; j < this.adatok[i].versenyzoks.length; j++) {
          versenyzok += this.diakok[this.adatok[i].versenyzoks[j].diakId];
          this.adatok[i].versenyzoks[j].diakId =
            this.diakok[this.adatok[i].versenyzoks[j].diakId];
          if (j != this.adatok[i].versenyzoks.length - 1) {
            versenyzok += ",";
          }
        }
        versenyzok = versenyzok.replace("ő", "ö");
        let tantargy = this.adatok[i].tantargy.replace("ő", "ö");
        console.log(versenyzok);
        pdf.text(
          this.adatok[i].verseny.nev +
            " " +
            tantargy +
            " " +
            this.adatok[i].verseny.szint +
            " verseny " +
            this.adatok[i].szint +
            " forduló " +
            this.adatok[i].versenyzoks[0].helyezes +
            ". helyezés ",
          10,
          i * 6 + 10
        );
        pdf.text(
          "Felkészítö oktató(k): " +
            oktatok +
            " Induló diák(ok): " +
            versenyzok,
          10,
          i * 6 + 13
        );
      }
      pdf.save("Lista1.pdf");
      console.log(this.adatok);
    },
  },
  mounted: function () {
    this.diakokLekerese();
    this.felkeszitokLekerese();
    this.versenyadatokLekerese();
  },
};
</script>
