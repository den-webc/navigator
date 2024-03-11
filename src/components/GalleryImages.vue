<template>
	<div class="gallery" :class="{'gellery--delete': isDelete}">
    <div class="gallery__item" v-for="(img) in images" :key="img.id">
      <a 
        class="gallery__image" 
        :style="{backgroundImage:'url('+getUrl(img.path)+')'}"
        data-fancybox="gallery"
        :data-src="getUrl(img.path)">
      </a>
      <a class="gallery__delete" @click="$emit('delete', img.id)" v-if="isDelete">
        <span> Удалить </span>
      </a>
    </div>
	</div>
</template>

<script>
  export default {
    name: 'GalleryImages',
    props: [ 'images', 'isDelete' ],
    data: () => ({}),
    mounted () {},
    computed: {
    },
    methods: {
      getUrl (path) {
        return this.$store.state.api_endpoint + '/' + path;
      },
    }
  }
</script>

<style scoped>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    margin: -5px;
  }
  .gallery__item {
    margin: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 97px;
    width: 130px;
    position: relative;
  }
  .gallery__image {
    height: 100%;
    width: 100%;
    background-origin: border-box;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    border: 1px solid var(--cozh-light-grey);
    position: relative;
    overflow: hidden;
    display: flex;
    box-sizing: border-box;
  }
  .gallery__image::before {
    content: '';
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: all .2s ease-out;
  }
  .gellery--delete .gallery__image::before {
    background: linear-gradient(180deg,rgba(11,40,54,0),rgba(11,40,54,.3));
  }
  .gallery__image::after {
    content: url('../assets/img/scale.svg');
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    visibility: hidden;
    transition: all .2s ease-out;
  }
  .gallery__image:hover {
    border-color: rgba(var(--cozh-blue-code), .75);
  }
  .gallery__image:hover::before {
    background-color: rgba(var(--cozh-blue-code), .75);
  }
  .gallery__image:hover::after {
    opacity: 1;
    visibility: visible;
  }



  .gallery__delete {
    user-select: none;
    position: absolute;
    padding: 10px;
    bottom: 0px;
    right: 0px;
  }

  .gallery__delete span {
    font-size: 10px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.03em;
    color: var(--cozh-white);
    text-transform: uppercase;
    transition: all .2s ease-out;
  }



  @media (max-width: 767px) {
    .gallery__item {
      width: calc(50% - 10px);
    }
  }

</style>