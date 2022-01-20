const pool = require('../config/pool'); 
const sql = require('mssql'); 

const insertArticle = async function(content){ 
    const connectionPool = await pool;

    const request = await connectionPool.request()
    const input = await request.input('content', sql.VarChar, content)

    try{ 
        const query = await input.execute('Insert_Article'); 
        return query; 
    }catch(err){ 
        return err; 
    }
}

const SelectOneArticle = async function(id){ 
    const connectionPool = await pool;

    const request = await connectionPool.request()
    const input = await request.input('id', sql.Int, id)

    try{ 
        const query = await input.execute('Select_One_Article'); 
        return query; 
    }catch(err){ 
        return err; 
    }
}

const DeleteOneArticle = async function(id){ 
    const connectionPool = await pool;

    const request = await connectionPool.request()
    const input = await request.input('id', sql.Int, id)

    try{ 
        const query = await input.execute('Delete_One_Article'); 
        return query; 
    }catch(err){ 
        return err; 
    }
}

module.exports = {
    insertArticle,
    DeleteOneArticle,
    SelectOneArticle
}