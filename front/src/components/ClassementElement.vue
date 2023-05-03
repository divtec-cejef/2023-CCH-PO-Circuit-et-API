<template>
    <div class="classement-element">
        <div class="rank">1</div>
        <img src="../assets/img/avatar.png" alt="Avatar de l'élément">
        <div class="pseudo">Chlore</div>
        <div class="time">12:23:23</div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">

div.classement-element {
  font-size: 14px;
  margin: 10px 10px;
  display: flex;
  align-items: center;
  justify-content: start;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 9px;
  border-radius: 4px;

  div.rank {
    margin-left: 5px;
  }

  img {
    width: 30px;
    margin-left: 12px;
  }

  div.pseudo {
    flex: 10;
    margin-left: 15px;
  }

  div.time {
    justify-self: end;
  }
}
</style>