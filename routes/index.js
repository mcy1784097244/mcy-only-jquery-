const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.get("/ImageCarousel",(req,res)=>{  //首页轮播
   var sql="SELECT img FROM fz_index_carousel";
   pool.query(sql,[],(err,result)=>{  
	  if(err) console.log(err);
      //res.send(result);
	  res.writeHead(200,{
	      "Content-Type":"application/json;charset=utf-8",
          "Access-Control-Allow-Origin":"*"
	  })
	  res.write(JSON.stringify(result));
      res.end();
   })
})
   
router.get("/indexImg",(req,res)=>{  //首页其他图片
   var sql="SELECT pic,price,href FROM fz_index_product";
   pool.query(sql,[],(err,result)=>{
       if(err) console.log(err);
	   //res.send(result)
	   res.writeHead(200,{
	       "Content-Type":"application/json;charset=utf-8",
		   "Access-Control-Allow-Origin":"*"
	   })
		res.write(JSON.stringify(result));
	    res.end();
   })
})

module.exports=router;  