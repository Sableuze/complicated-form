<template>
  <p class="label mb-1">Фотография</p>
  <div class="picture-cnt flex q-gutter-sm">
    <div class="flex column">
      <q-file
        v-show="!picture"
        ref="imageLoad"
        borderless
        no-error-icon
        class="loadPicture flex"
        :model-value="picture"
        @update:model-value="onFileSelect($event)"
        accept=".jpg, image/*"
        :rules="[(val) => validateFile(val)]"
      >
        <template v-slot:file></template>
      </q-file>
      <div class="previewPicture" v-if="picture">
        <img :src="picture" id="previewImage" alt="chosen picture" />
        <q-btn icon="close" round size="sm" class="removeFile" @click="removeFile"></q-btn>
      </div>
      <p class="hint" :class="{ error: hasErrors }">
        {{ hasErrors ? errorTypes.noPicture : hintMsg }}
      </p>
    </div>
  </div>
</template>

<script>
import { errorTypesFiles } from '@/helpers/errorTypes';

const reader = new FileReader();

export default {
  name: 'FileUploader',
  props: {
    picture: {
      type: String,
    },
    hintMsg: {
      type: String,
      default: 'Главная фотография (обложка мероприятия)',
    },
  },

  emits: ['update:picture'],

  mounted() {
    this.errorTypes = errorTypesFiles;
    // @TODO WFT IS IT

    reader.addEventListener('load', this.loadImageEventHandler);
  },

  data() {
    return {
      errorTypes: '',
      hasErrors: false,
    };
  },

  methods: {
    // eslint-disable-next-line no-unused-vars
    async onFileSelect(file) {
      if (!file) return false;
      // this.previewPicture = URL.createObjectURL(file);
      reader.readAsDataURL(file);
    },
    removeFile() {
      this.emitUpdate('picture', undefined);
    },
    validateFile(val) {
      if (val) {
        this.hasErrors = false;
        return true;
      }
      this.hasErrors = true;
      return false;
    },

    loadImageEventHandler() {
      this.emitUpdate('picture', reader.result);
    },

    emitUpdate(target, newVal) {
      debugger;
      this.$emit(`update:${target}`, newVal);
    },
  },

  beforeUnmount() {
    reader.removeEventListener('load', this.loadImageEventHandler);
  },
};
</script>

<style scoped lang="scss">
.loadPicture {
  cursor: pointer;
  width: 126px;
  height: 126px;
  position: relative;
  background: url('../../assets/upload_icon.svg') center no-repeat;
  border: 4px solid $border-color;
}

.picture-cnt {
  > div {
    width: 126px;
  }

  .hint {
    margin-top: 8px;
    font-size: 10px;
    color: $hint-color;
  }

  .error {
    color: $error-color;
  }
}

.previewPicture {
  position: relative;
  height: 126px;

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .removeFile {
    position: absolute;
    top: -10%;
    right: -10%;
    background: $close-bg;
    color: $close-color;
  }
}
</style>
