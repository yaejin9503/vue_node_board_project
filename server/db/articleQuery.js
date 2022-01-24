const pool = require('../config/pool'); 
const sql = require('mssql'); 

const insertArticle = async function(content){ 
    const connectionPool = await pool;

    const request = await connectionPool.request()
    const input = await request.input('content', sql.NVarChar, content)

    try{ 
        const query = await input.execute('Insert_Article'); 
        return query; 
    }catch(err){ 
        return err; 
    }
}

const selectAllArticle = async function(pageNum, pageSize){ 
    const connectionPool = await pool;
    const request = await connectionPool.request()
    const input = await request.input('PAGE_NO', sql.Int, pageNum)
                               .input('PAGE_SIZE', sql.Int, pageSize)

    try{ 
        const query = await request.execute('Select_All_Article'); 
        return query; 
    }catch(err){ 
        return err; 
    }
}

const selectOneArticle = async function(id){ 
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

const deleteOneArticle = async function(id){ 
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

const updateOneArticle =async function(id, content){ 
    const connectionPool = await pool; 

    const request = await connectionPool.request() 
    const input = await request.input('id', sql.Int, id)
                               .input('content', sql.NVarChar, content) 

    try{ 
        const query = await input.execute('Update_One_Article')
        return query; 
    }
    catch(err){ 
        return err; 
    }
}


module.exports = {
    insertArticle,
    deleteOneArticle,
    selectAllArticle,
    selectOneArticle,
    updateOneArticle
}