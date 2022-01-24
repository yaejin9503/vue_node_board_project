<template>
    <li> 
        <span v-if="isEditing" class="textArea">
            <input type="text"  v-model="content" class="editInput"/>
        </span> 
        <span v-else>{{article.id}} : {{article.content}} </span>
        <span class="btnArea">
            <button @click="() => editBtnClick()">{{ !isEditing ? "수정" : "수정취소"}}</button>
            <button @click="() => !isEditing ? deleteElem(article.id) : editContent()" >{{!isEditing ? "삭제" : "수정완료" }}</button>
        </span>     
    </li>
</template>
<script>
//import axios from "axios"; 
import axios from "axios"; 

export default {
    name: 'Card',
    props: {
        article: { 
            default: {
                content: null, 
                id: null, 
            }
        } 
    }, 
    data(){ 
        return{ 
            content: '', 
            isEditing: false
        }
    }, 
    methods: { 

        editBtnClick(){ 
            this.content = this.article.content
            this.isEditing = !this.isEditing; 
        },
        async deleteElem(id){ 
            await axios.post('http://localhost:3000/delete',{ 
                id : id
            })
            this.$emit('delete', id);
        },
        async editContent(){ 
            await axios.post('http://localhost:3000/update',{ 
                id : this.article.id, 
                content: this.content 
            })
            this.isEditing = !this.isEditing 
            this.$emit('update', { id: this.article.id, content: this.content }); 
        }
    }
}
</script>
<style scoped>
    button{ 
        margin-right: 10px;
    }
    li{ 
        width: 100%;
        /* height: max-content; */
        display: flex;
        justify-content: space-between;
    }
    .editInput{ 
        height: 16px;
    }
    .editbtn{ 
        border: 0;
        background-color: #ffffff;
        /* height: 22px; */
        cursor: pointer;
    }


</style>