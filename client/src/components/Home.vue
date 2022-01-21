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
                :id ="item.id" 
                :content="item.content" 
                :key="index"
                @deleteContent="deleteContent" 
                @editNumer="editNumer"
                :editNum="editNum"
            />
        </ul>
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
          editNum: 0
      }
  },
  created(){ 
    this.getArticle(); 
  }, 
  components : { 
      Card
  },
  methods:{ 
    async getArticle(){
      const { data }  = await axios.get('http://localhost:3000/read', { 
          params: { 
              pageNum : this.page_num, 
              pageSize: this.page_size
          }
      })
      .catch((e) => { 
          console.log(e) 
      });
      this.articles = data
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
            this.getArticle() 
            /**조회 DB에 offset를 추가해야 할 것 같음 */
        }else{  
            alert('서버와의 통신이 이뤄지지 않았습니다.')
        }
        
    },
    async deleteContent(id){
        const result = await axios.post('http://localhost:3000/delete',{ 
                id : id
        })
        if(result.status === 200){ 
            alert('delete ok!'); 
            this.getArticle() 
        }else{ 
            alert('삭제 실패'); 
        }
       // console.log(result); 
       
    }, 
    editNumer(id){ 
        this.editNum = id 
    }
  }
}
</script>
<style scoped>
    ul{ 
        width: 100%;
        max-width: 360px;
        justify-content: center;
        margin: 0px auto;
        margin-top: 30px;
    }
</style>