<template>
	<div class="user">
      <div class="user__info">
        <div class="user__avatar">
          {{ symbol }}
        </div>
        <div class="user__name">
          {{ user.name }}
        </div>
      </div>
      <div class="user__controll">
        <a class="user__btn">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="5" r="4" stroke="#AEC1CC" stroke-width="2"/>
            <path d="M15.9802 15.2904C15.1829 10.6024 11.0057 11.0089 9 11.0089C6.99433 11.0089 2.81706 10.6024 2.01976 15.2904C1.86087 16.2247 2.68289 17 3.66503 17H14.335C15.3171 17 16.1391 16.2247 15.9802 15.2904Z" stroke="#AEC1CC" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </a>
        <a class="user__btn" @click="logout">
          <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 1.76389C11.4692 1.28885 10.7684 1 10 1H4C2.34315 1 1 2.34315 1 4V16C1 17.6569 2.34315 19 4 19H10C10.7684 19 11.4692 18.7111 12 18.2361" stroke="#AEC1CC" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 6L8 10M8 10L12 14M8 10H16" stroke="#AEC1CC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'UserState',
    data: () => ({
    }),
    computed: {
    	user () {
      	return this.$store.state.auth.user;
    	},
    	symbol () {
    		return this.user.name.charAt(0);
    	}
    },
    methods: {
      async logout () {
        this.$store.dispatch('logout');
        this.$router.push({name: 'PageLogin'});
      },
    },
  }
</script>

<style scoped>
	.user {
    padding-left: 15px;
    background-color: var(--cozh-white);
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    height: 60px;
    width: auto;
    margin-left: 10px;
    min-width: 300px;
	}
.user__info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
}
.user__avatar {
    min-height: 40px;
    min-width: 40px;
    background-color: var(--cozh-blue);
    font-size: 18px;
    font-weight: 800;
    color: var(--cozh-white);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 10px;
}
.user__name {
    font-weight: 600;
    font-size: 11px;
}
.user__controll {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin-left: 15px;
    border-left: 1px solid var(--cozh-light-grey);
}
.user__btn {
    padding: 0px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
}
.user__btn:last-child {
  padding-right: 12px;
}
.user__btn:first-child {
  padding-left: 12px;
}
.user__btn svg path, .user__btn svg circle {
    transition: all .2s ease-out;
}
.user__btn:hover svg path, .user__btn:hover svg circle {
    stroke:  var(--cozh-blue);
}
@media (max-width: 767px) {
  .user {
  	display: none;
  }
}
</style>