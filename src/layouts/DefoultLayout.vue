<template>
    <div>
      <Header />
      <main>
        <router-view />
      </main>
      <Footer />
    </div>
</template>
<script>
import Header from "@/components/Header.vue"; 
import Footer from "@/components/Footer.vue"; 

export default {
  name: "DefaultLayout",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>

main {
  min-height: 100vh;
  box-sizing: border-box;
}
</style>