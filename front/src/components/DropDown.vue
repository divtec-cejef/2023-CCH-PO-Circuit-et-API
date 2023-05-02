<template>

    <div class="button-checked">
        <label>
            <span>Voir les autres courses</span>
            <input type="checkbox" v-model.bool="isClicked">
        </label>
    </div>

    <div class="drop-down-content" v-if="isClicked">
        <table>
            <tr>
                <th>N°</th>
                <th>Rang</th>
                <th>Heure</th>
                <th>Vitesse</th>
                <th colspan="2">Temps</th>
            </tr>
            <tr>
                <td>1</td>
                <td>34</td>
                <td>12:23:23</td>
                <td>33</td>
                <td></td>
                <td>123</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><NumberTime number="1" color="var(--red)" /></td>
                <td>123</td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><NumberTime number="2" color="var(--blue)" /></td>
                <td>123</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import NumberTime from "@/components/NumberTime.vue";

let isClicked = ref(true);

</script>

<style scoped lang="scss">

div.button-checked {
    input {
        display: none;
    }
}

div.drop-down-content {
    table {
        text-align: center;
    }
}

</style>