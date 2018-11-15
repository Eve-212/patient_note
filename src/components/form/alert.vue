<template id="alert-template">
<div>
	<div :class="alertClasses" v-show="show">
		
		<slot></slot>
		<span class="alert__close" @click="show = false">X</span
	</div>
</div>
</template>

<script>
export default {
    name: 'alert'
}
</script>

<style>

</style>

