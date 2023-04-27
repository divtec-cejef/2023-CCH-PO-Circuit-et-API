import {ref} from "vue";
import type {Ref} from "vue";

export default class Car {
    idCar: Ref<number> = ref(0);
    pseudo: Ref<string> = ref('');
    idQuery: Ref<number> | Ref<string> = ref('');
    avatar: Ref<string> = ref('');
}


