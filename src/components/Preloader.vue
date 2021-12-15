<template>
  <div class="preloader">
    <div class="lds-dual-ring"></div>  </div>
</template>

<script>

export default {
  name: 'Preloader',

  data() {
    return {};
  },
  methods: {
  },
  watch: {
  },
};
</script>

<style scoped lang="scss">

.preloader {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 9999;
  width: 100%;
  height: 100%;

  overflow: hidden;

  //&:after {
  //  content: "";
  //  position: absolute;
  //  top: 0;
  //  left: 0;
  //  width: 100%;
  //  height: 100%;
  //  opacity: 0.5;
  //  background: url("../../public/spinner.gif") center no-repeat;
  //}

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000000;
    opacity: 0.1;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: $error-color transparent $title-color transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
