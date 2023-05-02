<template>
  <!--div class="home">
    <HelloWorld msg="Versenyek nyilvántartó rendszere" />
  </div-->
  <div class="home container">
    <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#myCarousel"
          class="active"
          data-bs-slide-to="0"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#myCarousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/logo1.jpg" class="w-100 d-block" />
          <div class="carousel-caption d-none d-md-block">
            <h1>Versenyek nyilvántartó rendszere</h1>
            <p>-Miskolci SZC Kandó Kálmán Informatikai Technikum-</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/logo2.jpg" class="w-100 d-block" />
          <div class="carousel-caption d-none d-md-block">
            <h1>Versenyek nyilvántartó rendszere</h1>
            <p>-Miskolci SZC Kandó Kálmán Informatikai Technikum-</p>
          </div>
        </div>
        <div class="carousel-item">
          <img src="../assets/logo3.jpg" class="w-100 d-block" />
          <div class="carousel-caption d-none d-md-block">
            <h1>Versenyek nyilvántartó rendszere</h1>
            <p>-Miskolci SZC Kandó Kálmán Informatikai Technikum-</p>
          </div>
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
