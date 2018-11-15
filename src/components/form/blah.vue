<template id="alert-template">
	<div :class="alertClasses" v-show="show">
		
		<slot></slot>
		<span class="alert__close" @click="show = false">X</span
	<div>
</template>

script  