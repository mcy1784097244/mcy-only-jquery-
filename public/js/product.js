$(function(){
	if(location.search.indexOf("kwords=")!=-1){
		var kwords=decodeURI(location.search.split("=")[1]);
        var pno=0;
		function loadPage(no=0){
			pno=no;
			$.ajax({
				url:"http://127.0.0.1:3000/product",
				type:"get",
				data:{kwords,pno},
				dataType:"json",
				success:function(output){
					//console.log(output);
				    var {product,pageCount}=output;  
					//搜索到产品
					var html="";
					for(var p of product){
						var {lid,title,price,md}=p;
						html+=`<li>
						<a href="product_details.html?lid=${lid}"><img src="${md}" alt=""></a>
						<p>￥${price}</p>			
						<p>${title}</p>
						<div>
							<button>-</button>
							<span class="span1">1</span>
							<button >+</button>
							<a href="#" data-lid="${lid}" class="btn">加入购物车</a>
						</div>
                    </li>`
					}
                    var $plist=$("div.all .bottom div.bottom-left ul");
					$plist.html(html);
					
					//下面分页按钮
					var html="";
					for(var i=1;i<=pageCount;i++){
						html+=`<a href="#" class="${i==pno+1?'active':''}">${i}</a>`
					}
					$btn=$plist.next();
					$btn.children(":not(:first-child):not(:last-child)").remove()
                    $btn.children().first().after(html);
					if(pno==0){ //如果当前页是第一页，禁用上一页按钮
					   $btn.children().first().addClass("disabled");
					}else{
					   $btn.children().first().removeClass("disabled");
                    }
					if(pno==pageCount-1){
						$btn.children().last().addClass("disabled");
					}else{
						$btn.children().last().removeClass("disabled");
					}
				}
			
			})
		}
	    loadPage();
		var $plist=$("div.all .bottom div.bottom-left ul");
		$btn=$plist.next();
		$btn.on("click","a",function(e){    
			e.preventDefault();
			$a=$(this);
			if(!$a.is(".active,.disabled")){  //除了当前页和已经禁用了的
				if($a.is(":first-child")){
					var no=pno-1  //点击上一页，页号-1
				}else if($a.is(":last-child")){   //点击下一页，页号+1
					var no=pno+1
				}else{
					var no=$a.html()-1
				}
				loadPage(no);//重新加载新页号的页面内容
			}
		});

		$plist.on("click","button,a.btn",function(e){
			e.preventDefault();
			$btn=$(this)
			if($btn.is("button")){
				var $span=$btn.siblings(".span1");
				var n=$span.html()
				if($btn.html()=="+"){
				    n++
				}else if(n>1){
					n--
				}
			    $span.html(n);
			}else{
				(async function(){
					var res=await $.ajax({  //同步先判断是否登录
                        url:"http://127.0.0.1:3000/users/islogin",
						type:"get",
						dataType:"json"
					})
					//console.log(res)
					if(res.ok==0){
						alert("请先登录")
					}else{  //登录了
						var count=$btn.siblings(".span1").html();//产品页的点击时当前产品的数量
						var lid=$btn.attr("data-lid");  //拓展属性提前保存用户id
						console.log(count,lid)
						var res=await $.ajax({
							url:"http://127.0.0.1:3000/cart/add",
							type:"get",
							data:{lid,count}
						})
						$btn.siblings("input").val(1);//东西加入购物车之后自动清除为默认值1
						alert("添加成功");
						location.reload();
					}
						
						
				})()
			}//else的括号

		})


	}
	
    
})