<template>
  <router-view />
</template>

<style>
.cursor-pointer{
  cursor: pointer;
}

.cursor-default{
  cursor: default;
}

#background{
  background-image: url('./assets/background.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  
  opacity: 0.60;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.shadow-custom{
  box-shadow: 0 0 8px rgb(0, 0, 0, 0.3);
}
@media screen and (max-width: 900px) {
  #background{
  background-position: top center;
  background-size: 150%;
  }
}
@media screen and (max-width: 550px) {
  #background{
  background-position: top center;
  background-size: 180%;
  }
}
@import'~bootstrap/dist/css/bootstrap.css';
</style>
