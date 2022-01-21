<template>
    <li> 
        <span v-if="this.editNum === id" class="textArea">
            <input type="text" class="editInput" v-model="contentText"/>
            <button class="editbtn" @click="() => editContent(id)">✅</button>
        </span> 
        <span v-if="this.editNum !== id">{{id}} : {{content}} </span>
        <span class="btnArea">
            <button @click="() => editNumer(id)">수정</button>
            <button @click="() => deleteContent(id)" >삭제</button>
        </span> 
    </li>
</template>
<script>
//import axios from "axios"; 

export default {
    name: 'Card',
    data(){ 
        return {
            contentText: ''
        }
    }, 
    props: { 
        id: Number, 
        content: String,
        editNum: Number
    }, 
    methods: { 
        async deleteContent(id){ 
            this.$emit('deleteContent', id); 
        }, 
        editNumer(id){ 
            this.$emit('editNumer',id)
        },
        editContent(id){ 
            alert(id, this.contentText)
            //this.$emit('editContentText', id, contentText); 
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