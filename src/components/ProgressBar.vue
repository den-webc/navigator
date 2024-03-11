<template>
 	<div class="progress" :class="currentClassName">
 			<div class="progress__percentage">
	      {{ percent + '%' }}
	    </div>
	    <div class="progress__line">
		    <div class="progress__value" :style="{ width: percent + '%' }"></div>
	    </div>
  	</div>
</template>
<script>
  export default {
    name: 'ProgressBar',
    props: [ 'percent' ],
    data: () => ({}),
    mounted () {},
    computed: {
      currentClassName () {
      	if(this.percent <= 35) {
        	return 'progress--success';
      	}
      	if(this.percent > 35 && this.percent <= 70) {
        	return 'progress--warning';
      	}
      	if(this.percent > 70) {
        	return 'progress--danger';
      	}
        return 'progress--default';
      },
    },
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
	    height: 6px;
	    border-radius: 3px;
	    background-color: rgba(var(--cozh-black-code), .1);
	    position: relative;
	}
	.progress__value {
	  height: 6px;
    border-radius: 3px;
    position: absolute;
    top: 50%;
    left: 0px;
    transform: translateY(-50%);
    max-width: 100%;
	}
	.progress__percentage {
	    font-size: 12px;
	    line-height: 1;
	    font-weight: 600;
	    margin-right: 5px;
	    min-width: 35px;
	}
	.progress--success .progress__value {
	    background-color: rgba(126, 205, 119, 1);
	}
	.progress--success .progress__percentage {
	    color: rgba(126, 205, 119, 1);
	}
	.progress--warning .progress__value {
	    background-color: rgba(255, 145, 0, 1);
	}
	.progress--warning .progress__percentage {
	    color: rgba(255, 145, 0, 1);
	}
	.progress--danger .progress__value {
	    background-color: rgba(224, 55, 18, 1);
	}
	.progress--danger .progress__percentage {
	    color: rgba(224, 55, 18, 1);
	}
	.progress--default .progress__value {
	    background-color: var(--cozh-grey);
	}
	.progress--default .progress__percentage {
	    color: var(--cozh-grey);
	}
</style>