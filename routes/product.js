const express=require("express");
const router=express.Router();
const pool=require("../pool.js")

router.get("/",(req,res)=>{
    var kwords=req.query.kwords;
    var arr=kwords.split(" "); 
	for(var i=0;i<arr.length;i++){
		arr[i]=`title like N'%${arr[i]}%'` //title like N'%裙%'
	}
    var where=" where "+arr.join(" and ")  //where title like N'%裙%' AND title like N'%衣%'
	var output={pageSize:9}//每一页9个产品
	output.pno=req.query.pno;
	var sql="select *,(select md from fz_laptop_pic where laptop_id=lid limit 1) as md from fz_laptop  ";
	pool.query(sql+where,[],(err,result)=>{
		if(err) console.log(err);
		console.log(result);
		output.count=result.length; //总记录数
		output.pageCount=Math.ceil(output.count/output.pageSize) //总页数
        output.product=result.slice(output.pno*9,output.pno*9+9)
	    res.writeHead(200,{
		  "Content-Type":"application/json;charset=utf-8",
		  "Access-Control-Allow-Origin":"*"
       })
	  res.write(JSON.stringify(output));
	  res.end()
	})
 
})

module.exports=router;  


//select *,(select md from fz_laptop_pic where laptop_id=lid limit 1) as md from fz_laptop where title like N'%only%'