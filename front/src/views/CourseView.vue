<template>

    <h1>Course</h1>
    <p>Sur cette page, tu pourras voir tes temps réalisés ainsi que ceux des autres.
        N'oublie pas non plus de revoir la vidéo de ta course...</p>

    <div class="best-race">
        <div>
            <div class="rang">
                <span>#</span>
                <span>4</span>
            </div>
            <div class="best-time">
                <div>Temps de manche :</div>
                <div class="race-time">12:00:00</div>
            </div>
        </div>

        <div class="temps-inter">Temps intermédiaires :</div>
        <ul>
            <li>
                <NumberTime number="1" color="var(--dark-green)"/>
                <p>03:23:08</p>
            </li>
            <li>
                <NumberTime number="2" color="var(--blue)"/>
                <p>03:23:08</p>
            </li>
        </ul>

    </div>

</template>

<script setup lang="ts">
import NumberTime from "@/components/NumberTime.vue";
</script>

<style scoped lang="scss">

div.rang {
  flex: 2;
  box-shadow: rgba(50, 50, 93, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
  border-radius: 100px;
  padding: 14px;

  span:nth-child(1) {
    font-size: 28px;
  }

  span:nth-child(2) {
    font-size: 56px;
  }
}

div.best-race {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: end;
  width: fit-content;
  margin: 20px auto 0 auto;

  div.temps-inter {
    width: fit-content;
    align-self: end;
  }

  div:nth-child(1) {
    display: flex;
    align-items: center;
  }

  ul {
    margin: 0;
    padding: 0;
    width: fit-content;
    align-self: end;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      font-family: 'Digital-7 Mono', sans-serif;
      width: fit-content;
      font-size: 26px;
      margin-top: 10px;
    }
  }
}

div.best-time {
  display: flex;
  flex-direction: column;
  margin-left: 45px;
  flex: 6;

  div.race-time {
    font-family: 'Digital-7 Mono', sans-serif;
    font-size: 40px;
    text-align: end;
    margin-right: 5px;
  }

  img {
    width: 35px;
  }
}

</style>