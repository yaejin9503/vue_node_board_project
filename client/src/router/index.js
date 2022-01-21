import Vue from "vue"; 
import VueRouter from "vue-router";
Vue.use(VueRouter); 

import Home from "@/components/Home.vue";
import Article from "@/components/Article.vue";


const router = new VueRouter({ 
    mode: "history", 
    routes: [
        { name: 'home', path : "/", component: Home}, 
        { name: 'article', path : "/:id" , component: Article}
    ]
})

export default router; 
