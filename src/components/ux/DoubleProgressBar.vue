<template>
 		<div class="progress">
 			<div class="progress__label" :style="{color: color_left}">
 				<div class="progress__num">
 						{{ count_left }}
 				</div>
 				<div class="progress__percent">
 						{{ percent + '%'}}
 				</div>
	    </div>
	    <div class="progress__line" :style="{backgroundColor: color_right}">
		    <div class="progress__value" :style="{ backgroundColor: color_left, width: Math.round(percent * 100) / 100 + '%' }"></div>
	    </div>
	    <div class="progress__label" :style="{color: color_right}">
 				<div class="progress__num">
 						{{ count_right }}
 				</div>
 				<div class="progress__percent">
 						{{ 100 - percent + '%'}}
 				</div>
	    </div>
  	</div>
</template>
<script>
  export default {
    name: 'ProgressBar',
    props: [ 'percent', 'count_left', 'count_right', 'color_left', 'color_right' ],
    data: () => ({}),
    mounted () {},
    computed: {},
  }
</script>
<style scoped>
	.progress {
	    width: 100%;
	    position: relative;
	    display: flex;
	    flex-direction: row;
	    align-items: center;
	    justify-content: flex-start;
	}
	.progress__line {
	    width: 100%;
	    height: 10px;
	    /*border-radius: 3px;*/
	    background-color: rgba(var(--cozh-black-code), .1);
	    position: relative;
	    margin: 0px 10px;
	}
	.progress__value {
	  height: 10px;
    /*border-radius: 3px;*/
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    max-width: 100%;
    transition: all 1s ease-in-out;
	}

	.progress__label {
		display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    color: var(--cozh-grey);
	}
	.progress__num {
		font-size: 12px;
    font-weight: 600;
    line-height: 1;
	}
	.progress__percent {
		font-size: 8px;
    font-weight: 700;
    line-height: 1;
    margin-left: 3px;
	}

</style>