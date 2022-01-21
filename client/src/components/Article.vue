<template>
    <div>
        <div class="card">
            {{article[0].content}}
        </div>
    </div>
</template>
<script>
import axios from "axios"; 
export default {
  data() { 
      return {
          article: [
              {
                  id : null, 
                content: null
              }
          ]
      }
  },
  created(){ 
    this.getArticle(); 
  }, 
  methods:{ 
    async getArticle(){ 
      const id = this.$route.params.id; 
      const { data } = await axios.get(`http://localhost:3000/read/${id}`);
      this.article = [
          ...data
      ]
      console.log("data!",this.article);  
    }
  }
}
</script>
<style>
    
</style>