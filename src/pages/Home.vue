<template>
    <component
      v-for="comp in renderComponents()"
      :key="comp.key"
      :is="comp.component"
      v-bind="comp.props"
    />
    
    <MapContact v-if="isContentLoaded" />
</template>

<script>
import BaseComponent from "@/components/BaseComponent.vue";
import HomeIcons from "@/components/HomeIcons.vue";
import Services from "@/components/Services.vue";
import Booking from "@/components/Booking.vue";
import MapContact from "@/components/MapContact.vue";
import Carousel from "@/components/Carousel.vue";
import DoctorGallery from "@/components/DoctorGallery.vue";
import DocumentGallery from "@/components/DocumentGallery.vue";
import VideoGallery from "@/components/VideoGallery.vue";

export default {
  name: "HomePage",
  components: {
    BaseComponent,
    HomeIcons,
    Services,
    Booking,
    MapContact,
    Carousel,
    DoctorGallery,
    DocumentGallery,
    VideoGallery
  },
  data() {
    return {
      content: {},
      isContentLoaded: false, 
      componentsOrder: [
        { component: 'Carousel', key: 'mainSlider', props: { sliderType: 'mainSlider' } },
        { component: 'BaseComponent', key: 'aboutUs', props: { name: 'aboutUs', showButtons: true } },
        { component: 'HomeIcons', key: 'benefitsList', props: { name: 'benefitsList', showTitle: false, size: 'default' } },
        { component: 'Services', key: 'services', props: { name: 'services' } },
        { component: 'VideoGallery', key: 'videoSlider', props: { sliderType: 'videoSlider' } },
        { component: 'BaseComponent', key: 'clinicBlock', props: { name: 'clinicBlock', showButtons: false } },
        { component: 'HomeIcons', key: 'benefitsList2', props: { name: 'benefitsList2', showTitle: true, size: 'large' } },
        { component: 'Booking', key: 'booking', props: { name: 'booking' } },
        { component: 'DoctorGallery', key: 'doctorSlider', props: { sliderType: 'doctorSlider' } },
        { component: 'DocumentGallery', key: 'documentSlider', props: { sliderType: 'documentSlider' } }
        
      ]
    };
  },
  methods: {
    /**
     * @param {String} name - Имя компонента.
     * @returns {String} - Имя компонента.
     */
    getComponentName(name) {
      return name;
    },
    
    /**
     * @param {Object} component - Объект компонента из componentsOrder
     * @returns {Object} - Свойства для компонента
     */
    getComponentProps(component) {
      const { key, props } = component;
      if (key && this.content[key]) {
        return {
          ...props,
          data: this.content[key][0] || this.content[key],
          content: this.content[key]
        };
      }
      return props;
    },
    
    /**
     * @returns {Array} - Массив компонентов для рендеринга
     */
    renderComponents() {
      return this.componentsOrder.map((comp, index) => {
        if (comp.key && !this.content[comp.key]) {
          return null;
        }
        const componentProps = comp.key
          ? { ...comp.props, data: this.content[comp.key][0], content: this.content[comp.key] }
          : { ...comp.props };
        return {
          component: comp.component,
          props: componentProps,
          key: index
        };
      }).filter(comp => comp !== null); 
    }
  },
  created() {
    fetch("/data/content.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка загрузки файла");
        }
        return response.json();
      })
      .then((data) => {
        this.content = data;
        this.isContentLoaded = true; 
      })
      .catch((error) => {
        console.error("Ошибка загрузки контента:", error);
      });
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
}
</style>
