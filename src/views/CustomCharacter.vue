Copy code
<template>
  <div>
    <div class="container">
      <p class="inputs">Custom your character</p>
      <div class="main-container">
        <div class="character">
          <div class="center-container" style="width: 20vw">
            <div class="hair-container">
              <button class="button_arrow" @click="changeHairLeft">&#9664;</button>
              <div class="hair">
                <component :is="currentHairComponent" :color="hairColor" />
              </div>
              <button class="button_arrow" @click="changeHairRight">&#9654;</button>
            </div>
            <div class="skin">

              <Body :colorBody="headColor" :colorHead="bodyColor" />
            </div>
            <v-btn class="button" @click="validate">CONFIRM</v-btn>
          </div>
        </div>
        <div class="colors" style="width: 20vw; margin: auto 0 auto 10%;">
          <div class="hair_color" style="margin-bottom: 15%">
            <label for="hairColor">Hair Color </label>
            <input id="hairColor" v-model="hairColor" type="color" />
          </div>
          <div class="head_color" style="margin-bottom: 15%">
            <label for="headColor">Head Color </label>
            <input id="headColor" v-model="headColor" type="color" />
          </div>
          <div class="body_color">
            <label for="bodyColor">Body Color </label>
            <input id="bodyColor" v-model="bodyColor" type="color" />
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "@/components/Navbar.vue";
import Body from "@/assets/custom/body/BodySVG.vue";
import HairMale1SVG from "@/assets/custom/hair/HairMale1SVG.vue";
import HairFemale1SVG from "@/assets/custom/hair/HairFemale1SVG.vue";
import HairMale2SVG from "@/assets/custom/hair/HairMale2SVG.vue";
import axios from "axios";

export default {
  components: { Body, HairMale1SVG, HairFemale1SVG, HairMale2SVG, Navbar },
  data() {
    return {
      hairColor: "#5286FF",
      bodyColor: "#F96C9D",
      headColor: "#D37878",
      availableHairComponents: [HairMale1SVG, HairFemale1SVG, HairMale2SVG],
      currentHairIndex: 0,
    };
  },
  computed: {
    currentHairComponent() {
      return this.availableHairComponents[this.currentHairIndex];
    },
  },
  beforeMount() {
    this.fetchCurrentSkin();
  },
  methods: {
    async fetchCurrentSkin() {
      await axios
        .get(`${process.env.VUE_APP_API_URI}/api/skin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.currentHairIndex = response.data.skin.hair_version;
            this.hairColor = response.data.skin.hair_color;
            this.headColor = response.data.skin.skin_color;
            this.bodyColor = response.data.skin.lower_body_color;
          } else {
            console.error(
              " Status :",
              response.status
            );
          }
        }).catch((error) => {
          console.error("Error on customization", error);
        });
    },
    changeHairLeft() {
      this.currentHairIndex =
        (this.currentHairIndex - 1 + this.availableHairComponents.length) %
        this.availableHairComponents.length;
    },
    changeHairRight() {
      this.currentHairIndex =
        (this.currentHairIndex + 1) % this.availableHairComponents.length;
    },
    validate() {
      const customData = {
          hair_version: this.currentHairIndex,
          hair_color: this.hairColor,
          upper_body_color: this.bodyColor,
          lower_body_color: this.bodyColor,
          skin_color: this.headColor,
      };

      console.log(customData);
      axios
        .put(`${process.env.VUE_APP_API_URI}/api/skin`, customData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        .then((response) => {
          if (response.status === 200) {
            alert("La customisation a bien été enregistrée");
          } else {
            console.error(
              " Status :",
              response.status
            );
          }
        })
        .catch((error) => {
          console.error("Error on customization", error);
        });
    },
  },
};
</script>

<style>
.main-container {
  display: flex;
  justify-content: space-between;
}

.character {
  display: flex;
  justify-content: center;
}

.center-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hair-container {
  display: flex;
  align-items: center;
}

.hair,
.skin {
  margin: 10px;
}

.button:hover {
  background-color: #0532b5;
}

.button_arrow {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #f4ae35;
  color: #fff;
  border: none;
  border-radius: 25px;
  transition: background-color 0.3s;
}

.button_arrow:hover {
  background-color: #ffc966;
}
</style>