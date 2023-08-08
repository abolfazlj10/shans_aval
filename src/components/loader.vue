<template>
    <div class="boardLoader">
        <div class="containerLoader">
            <div class="loader"></div> 
        </div>
    </div>
</template>
<style scoped>
.boardLoader{
    @apply fixed h-screen w-screen z-50 backdrop-blur-sm flex justify-center items-end;
}
.containerLoader{
    @apply bg-[#1A1E39] px-5 py-3 rounded-t-md;
}
.loader {
    border-radius: 50%;
    border: 4px solid #525FE1;
    border-left-color: transparent;
    width: 36px;
    height: 36px;
    animation: spin89345 1s linear infinite;
}

@keyframes spin89345 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>