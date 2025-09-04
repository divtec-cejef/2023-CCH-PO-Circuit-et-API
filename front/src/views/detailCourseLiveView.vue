<template>
  <v-card v-if="lastRace">
    <v-card-title>Dernière course : {{ lastRace.car.pseudo }}</v-card-title>
    <v-card-subtitle>
      Temps total : {{ lastRace.total_time }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  data() {
    return { lastRace: null };
  },
  mounted() {
    this.fetchLastRace();
    setInterval(this.fetchLastRace, 5000); // mise à jour toutes les 5 secondes
  },
  methods: {
    async fetchLastRace() {
      try {
        const res = await fetch('/race/getLast');
        if (!res.ok) throw new Error('Erreur fetch');
        this.lastRace = await res.json();
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
