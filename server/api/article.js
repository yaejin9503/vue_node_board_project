
const query = require('../db/articleQuery');

// CREATE 
const articleCreate = async (req, res) => { 
    const { content } = req.body; 
    try{
        await query.insertArticle(content); 
    }catch(e){ 
        console.error(e); 
    }
}
// READ 
const articleRead = (req, res) => { 
    
    
}

// ONE CONTENT READ 
const articleReadOne = async () => { 
    const { id } = req.body; 
    try{
        await query.SelectOneArticle(id); 
    }catch(e){ 
        console.error(e); 
    }
}

// UPDATE
const articleUpdate = (req, res) => { 
    
}
// DELETE
const articleDeleteOne = async (req, res) => { 
    const { id } = req.body; 
    try{ 
        await query.DeleteOneArticle(id); 
    }catch(e){ 
        console.error(e); 
    }
}
module.exports = {
    articleCreate,
    articleRead,
    articleReadOne, 
    articleUpdate,
    articleDeleteOne
}