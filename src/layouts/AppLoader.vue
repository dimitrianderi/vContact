<template>
  <div class="overlay">
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loaderStyles: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #8B4513, #FFD700)',
        animation: 'spin 2s linear infinite',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--text-color);
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .loader-container {
    position: relative;
    width: 80px;
    height: 80px;

    .loader {
      position: absolute;
      width: 100%;
      height: 100%;
      border: 4px solid transparent;
      border-top-color: var(--main-color);
      border-radius: 50%;
      animation: spin 1s linear infinite, shadow-pulse 1s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes shadow-pulse {
  0%,
  100% {
    box-shadow: 0 0 20px var(--loader-color);
  }
  50% {
    box-shadow: 0 0 40px var(--loader-color);
  }
}
</style>
