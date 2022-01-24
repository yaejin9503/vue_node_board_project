<template>
    <div>
        <div class="input">
            <h6>새 게시글 등록</h6>
            <input type="text" v-model="content"/> 
            <button @click="addArticle">등록</button>
        </div>
        <ul>
            <!-- <li v-for="(item, index) in articles" :key="index">
                <a href="javascript:void(0)" @click="() => goContent(item.id)">{{ item.content }}</a>
            </li> -->
            <Card 
                v-for="(item, index) in articles" 
                :article ="item" 
                :key="index"
                @update="updateContent"
                @delete="deleteContent"
            />
        </ul>
        <div v-if="isShowMoreBtn">
            <button @click="morebtn">더보기</button>
        </div>
    </div>
</template>
<script>
import axios from "axios"; 
import Card from "./Card.vue"; 

export default {
  data() { 
      return {
          articles: [],
          content: '',
          page_num: 1,
          page_size: 10,
          editNum: 0,
          editContent: '',
          dataLength: 0,
          isShowMoreBtn: true 
      }
  },
  created(){ 
    this.init(); 
  }, 
  components : { 
      Card
  },
  methods:{ 
    async init(){
      this.articles = await this.getArticles();
      this.isShowMoreBtn = this.dataLength <= this.articles.length ? false : true; 
    }, 
    async getArticles(){ 
        const { data } = await axios.get('http://localhost:3000/read', { 
          params: { 
              pageNum : this.page_num, 
              pageSize: this.page_size
          }
      })
      .catch((e) => { 
          console.log(e) 
      });
      this.dataLength = data[1][0].totalCount; 
      this.isShowMoreBtn = this.dataLength <= this.articles ? false : true; 
      return data[0]; 
    },
    goContent(articleId){ 
        this.$router.push({ name: 'article', params: {id : articleId}})
    }, 
    async addArticle(){ 
        const result = await axios.post('http://localhost:3000/create', { 
            content : this.content
        })
        // console.log(result); 
        if(result.status === 200){ 
            this.page_num = this.page_num !== 1 ? 1 : this.page_num
            this.init(); 
        }else{  
            alert('서버와의 통신이 이뤄지지 않았습니다.')
        }
        
    },
    deleteContent(id){ 
        const idx = this.articles.findIndex(item => item.id === id); 
        this.articles.splice(idx, 1);
    },
    updateContent({id, content}){
        const idx = this.articles.findIndex(item => item.id === id); 
        this.articles[idx].content = content
    },
    async morebtn(){ 
        this.page_num = this.page_num + 1
        const data = await this.getArticles(); 
        // 불필요한 데이터 렌더링 축소
        this.articles = this.articles.concat(data);
        this.isShowMoreBtn = this.dataLength <= this.articles.length ? false : true; 
    }
  }
}
</script>
<style scoped>
    ul{ 
        width: 100%;
        max-width: 390px;
        justify-content: center;
        margin: 0px auto;
        margin-top: 30px;
    }
</style>