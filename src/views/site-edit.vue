<template>
<p>edit</p>


</template>

<script>
import { siteService } from "../services/site-service.js";

export default {
  props: {
    
  },
  data() {
    return {
      siteToEdit: null
    };
  },
  async created() {
    const { id } = this.$route.params;
    this.siteToEdit = id ? await siteService.getById(id) : siteService.getEmptySite()
    console.log('this.siteToEdit', this.siteToEdit )
  },
  methods: {
    
  },
  components: {
   
    },
};
</script>