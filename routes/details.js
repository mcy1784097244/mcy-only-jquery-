const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
	var lid=req.query.lid;
	var output={product:{},pics:[]};
	var sql1="select * from fz_laptop where lid=?"  //通过lid 获取商品信息
	var sql2="select * from fz_laptop_pic where laptop_id=?";
	Promise.all([
		new Promise(function(open){  
			pool.query(sql1,[lid],(err,result)=>{
				if(err) console.log(err)
				//console.log(result);
				output.product=result[0];
				open();
				console.log("查询product完成");
			})
		}),
        new Promise(function(open){
				pool.query(sql2,[lid],(err,result)=>{
				if(err) console.log(err)
				//console.log(result);
				output.pics=result;
				open();
				console.log("查询pics完成");
			})
		})
	]).then(function(){
		res.writeHead(200,{
		    "Content-Type":"application/json;charset=utf-8",
			"Access-Control-Allow":"*"
		})
		res.write(JSON.stringify(output));  
		res.end();
		console.log("响应完成");
	})
})

module.exports=router