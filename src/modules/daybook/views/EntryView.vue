<template>
  <div v-if="entry" class="entry-title d-flex justify-content-between p-2">
    <div>
      <span class="text-success fs-3 fw-bold">{{ day }}</span>
      <span class="mx-1 fs-3">{{ Month }}</span>
      <span class="text-success fs-3 fw-bold">{{ YearDay }}</span>
    </div>

    <div>
      <button
        class="btn btn-danger mx-2"
        v-if="entry.id"
        @click="onDeleteEntry(id)"
      >
        Borrar
        <i class="fa fa-trash-alt"></i>
      </button>

      <input v-show="false" type="file" @change="addImg" ref="imageSelector" accept="image/png, image/jpeg, image/jpg" />

      <button 
        @click="onSelectImage"
      class="btn btn-primary">
        Subir Foto
        <i class="fa fa-upload"></i>
      </button>
    </div>
  </div>
  <hr />
  <div v-if="entry" class="d-flex flex-column px-3 h-75">
    <textarea v-model="entry.text" placeholder="Que paso hoy"> </textarea>
  </div>
  <Fab @on:click="saveEntry" />

  <img v-if="localImage" :src="localImage" class="img-thumbnail" />
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import getDayMonthYear from "@/modules/daybook/helpers/getDayMonthYear";
import Swal from "sweetalert2";

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  components: {
    Fab: defineAsyncComponent(() =>
      import("@/modules/daybook/components/Fab.vue")
    ),
  },
  computed: {
    ...mapGetters("journal", ["getEntryById"]),
    day() {
      const { day } = getDayMonthYear(this.entry.date);
      return day;
    },
    Month() {
      const { month } = getDayMonthYear(this.entry.date);
      return month;
    },
    YearDay() {
      const { yearDay } = getDayMonthYear(this.entry.date);
      return yearDay;
    },
  },
  data() {
    return {
      entry: null,
      localImage: null,
      file: null,
    };
  },
  methods: {
    loadEntry() {
      let entry;
      if (this.id === "new") {
        entry = {
          text: "",
          date: new Date().getTime(),
        };
      } else {
        entry = this.getEntryById(this.id);
        if (!entry) return this.$router.push({ name: "no-entry" });
      }
      this.entry = entry;
    },

    async saveEntry() {
      new Swal({
        title: "Espere por favor",
        allowOutsideClick: false,
      });
      Swal.showLoading();

      if (this.entry.id) {
        await this.updateEntry(this.entry);
      } else {
        //crear una nueva entrada
        const id = await this.createEntry(this.entry);
        this.$router.push({ name: "entry", params: { id } });
      }

      Swal.fire("Guardado", "Entrada registrada con exito", "success");
    },
    async onDeleteEntry(id) {
      const { isConfirmed } = await Swal.fire({
        title: "¿Estas seguro?",
        text: "Una vez eliminado, no se podra recuperar",
        showDenyButton: true,
        confirmButtonText: "Si, estoy seguro",
      });

      if (isConfirmed == true) {
        new Swal({
          title: "Espere por favor",
          allowOutsideClick: false,
        });
        this.deleteEntry(id), this.$router.push({ name: "no-entry" });

        Swal.fire("Eliminado", "", "success");
      }
    },
    addImg(event) {
      const file = event.target.files[0];
      if (!file) {
        this.localImage = null;
        this.file = null;
        return;
      } else {
        this.file = file;
        const fr = new FileReader();
        fr.onload = () => (this.localImage = fr.result);
        fr.readAsDataURL(file);
      }
    },
    onSelectImage(){
        this.$refs.imageSelector.click()
    },
    ...mapActions("journal", ["updateEntry", "createEntry", "deleteEntry"]),
  },
  created() {
    this.loadEntry();
  },
  watch: {
    id() {
      this.loadEntry();
    },
  },
};
</script>

<style lang="scss" scoped>
textarea {
  font-size: 20px;
  border: none;
  height: 100%;

  &:focus {
    outline: none;
  }
}
img {
  width: 200px;
  position: fixed;
  bottom: 150px;
  right: 20px;
  box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.5);
}
</style>
