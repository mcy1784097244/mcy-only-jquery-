const express=require("express")
const router =express.Router()
const pool=require("../pool")



router.get("/add",(req,res)=>{  
    var lid=req.query.lid  //产品id
    var count=req.query.count
    var uid=req.session.uid  //用户id
    console.log(lid,count,uid)
    var sql="select * from fz_shoppingcart_item where uid=? and product_id=?"
    pool.query(sql,[uid,lid],(err,result)=>{
        if(err) console.log(err)
        //console.log(result)
        if(result.length==0){  //如果这个用户没有产品就直接插入
            var sql="insert into fz_shoppingcart_item values(null,?,?,?,0)"
            pool.query(sql,[uid,lid,count],(err,result)=>{
                if(err) console.log(err)
                console.log(result)
                res.end();
            })
        }else{//否者直接在原有数量上加
            var sql="update fz_shoppingcart_item set count=count+? where uid=? and product_id=?"
            pool.query(sql,[count,uid,lid],(err,result)=>{
                if(err) console.log(err)
                //console.log(result)
                res.end();
            })
        }
    })
})

router.get('/item',(req,res)=>{
    var uid=req.session.uid
    console.log(uid)
    var sql=`SELECT *,(SELECT sm FROM fz_laptop_pic WHERE laptop_id=product_id LIMIT 1 ) AS sm FROM fz_shoppingcart_item inner JOIN fz_laptop on product_id=lid WHERE uid=?`
    pool.query(sql,[uid],(err,result)=>{
        if(err)  console.log(err)
        //console.log(result)
        res.writeHead(200,{
            "Content-Type":"application/json;charset=utf-8"
        });
        res.write(JSON.stringify(result))
        res.end();
    })
})

router.get("/update",(req,res)=>{   
    var iid=req.query.iid;
    var count=req.query.count;
    console.log(iid,count)
    if(count>0){
        var sql="update fz_shoppingcart_item set count=? where iid=?"
        var data=[count,iid];
    }else{
        var sql="delete from fz_shoppingcart_item where iid=?"
        var data=[iid];
    }
    pool.query(sql,data,(err,result)=>{
        if(err) console.log(err)
        res.end();
    })
})

    

module.exports=router;