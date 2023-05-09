import { formatTime } from '../models/race';
<template>
	<div class="classement-element">
		<div class="rank">{{ props.rank }}</div>
		<img :src="props.avatar" alt="Avatar de l'élément">
		<div class="pseudo">{{ props.pseudo }}</div>
		<div class="time">{{ formatTime(props.time) }}</div>
	</div>
</template>

<script setup lang="ts">
import { formatTime } from "@/models/race";
const props = defineProps<{
	rank: number;
	pseudo: string;
	time: Date;
	avatar: string;
}>();

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
		font-family: 'Digital-7 Mono', sans-serif;
		font-size: 20px;
	}
}
</style>
