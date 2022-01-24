
const query = require('../db/articleQuery');

// CREATE 
const articleCreate = async (req, res) => { 
    const { content } = req.body; 
    let result; 
    try{
        result = await query.insertArticle(content); 
    }catch(e){ 
        console.error(e); 
    }
    res.send(result.recordset ? result.recordset.id : "");
}
// READ 
const articleRead = async (req, res) => { 
    const { pageNum, pageSize } = req.query; 
    let result; 
    try{
        result = await query.selectAllArticle(pageNum, pageSize); 
    }catch(e){ 
        console.error(e); 
    }
    console.log(result.recordsets);
    res.send(result.recordsets ? result.recordsets : [] );
}

// ONE CONTENT READ 
const articleReadOne = async (req, res) => { 
    const { id } = req.params; 
    console.log(id)
    let result; 
    try{
        result = await query.selectOneArticle(id); 
    }catch(e){ 
        console.error(e); 
    }
    res.send(result.recordsets ? result.recordsets[0] : [] );
}

// UPDATE
const articleUpdate = (req, res) => { 
    
}
// DELETE
const articleDeleteOne = async (req, res) => { 
    const { id } = req.body; 
    let result;
    try{ 
        result = await query.deleteOneArticle(id); 
    }catch(e){ 
        console.error(e); 
    }
    res.send(result)
}

const articleUpdateOne = async (req, res) => { 
    const { id, content } = req.body
    let result; 
    try{ 
        result = await query.updateOneArticle(id, content)
    }catch(e){ 
        console.error(e); 
    }
    res.send(result)
}

module.exports = {
    articleCreate,
    articleRead,
    articleReadOne, 
    articleUpdate,
    articleDeleteOne,
    articleUpdateOne
}