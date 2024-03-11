<template>
	<div class="gallery">
		<div 
			class="gallery__item" 
			v-for="(image, index) in images" 
			:style="{ backgroundImage: 'url(' + image + ')' }"
			:key="index"
			:data-src="image"
      data-fancybox
		>
    <!-- :data-fancybox="'gallery' + uniq"  -->
		</div>
	</div>
</template>
<script>
  export default {
    name: 'GalleryPhoto',
    props: ['images'],
    data: () => ({
        uniq: null,
    }),
    created () {
        this.uniq = "id" + Math.random().toString(16).slice(2);
    },
  }
</script>
<style scoped>
	.gallery {
		margin: -5px;
    display: flex;
    flex-wrap: wrap;
	}
	.gallery__item {
	  aspect-ratio: 9/6;
	  background-position: center;
	  background-size: cover;
	  background-origin: border-box;
	  background-repeat: no-repeat;
	  border-radius: 8px;
	  position: relative;
	  overflow: hidden;
	  cursor: pointer;

	  margin: 5px;
	  /* 5 + 5 = 10 */
	  width: calc(25% - 10px); 
  	box-sizing: border-box;

	}
	.gallery__item::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: all .2s ease-out;
  }
  .gallery__item::before {
    background: rgba(var(--cozh-black-code),.1);
  }
  .gallery__item::after {
    content: url('@/assets/img/scale.svg');
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: all .2s ease-out;
  }
  .gallery__item:hover {
    border-color: rgba(var(--cozh-blue-code), .75);
  }
  .gallery__item:hover::before {
    background-color: rgba(var(--cozh-blue-code), .75);
  }
  .gallery__item:hover::after {
    opacity: 1;
    visibility: visible;
  }
</style>