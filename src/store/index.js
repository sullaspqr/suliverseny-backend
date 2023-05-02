import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    //API_URL: "https://suliverseny20230127141113.azurewebsites.net/",
    API_URL: "https://localhost:5001/",
    possible: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    userSalt: "",
    logged: false,
    Uid: "",
    teljesNev: "",
    jogosultsag: 0,
    iskolaId: 0,
    rogzitoOktatoId: 0,
    felhasznaloNev: "",
    tanev: "",
    figyeles: false,
    //felkeszitok: {},
    //versenyek:{},
  },
  getters: {},
  mutations: {
    logout(state) {
      let url = state.API_URL + "Logout/" + state.Uid;
      axios
        .post(url)
        .then((response) => {
          if (response.status == 200) {
            state.logged = false;
            state.Uid = "";
            state.teljesNev = "";
            state.jogosultsag = 0;
            alert(response.data);
            document.getElementById("loginButton").innerHTML = "Login";
          } else {
            alert(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    generateSalt(state, payload) {
      var text = "";
      for (var i = 0; i < payload.hossz; i++)
        text += state.possible.charAt(
          Math.floor(Math.random() * state.possible.length)
        );
      state.userSalt = text;
    },
  },
  actions: {},
  modules: {},
});
