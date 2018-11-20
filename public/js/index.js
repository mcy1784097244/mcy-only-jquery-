$(function(){
   //轮播图片请求
   $.ajax({
      url:"http://127.0.0.1:3000/index/ImageCarousel",
	  type:"get",
	  dataType:"json",
	  success:function(res){
	      //console.log(res);
		  var html="";
		  for (var p of res){
			  html+=`<img src="${p.img}" >`;
		  }
		  var carousel=$("div.lunbo_contaner div.lunbo_count");
          carousel.html(html);
		  carousel.children().first().addClass("show")
	  }
   })
  //首页其他图片
   $.ajax({
       url:"http://127.0.0.1:3000/index/indexImg",
	   type:"get",
	   dataType:"json",
	   success:function(res){
	       //console.log(res);
		   var html="";
		//遍历1楼的1个产品
		   for(var i=1;i<7;i++){  
		       var {pic,price,href}=res[i];
			   html+=`<li>
						   <img src="${pic}" >
						   <div class="three_mask">
							   <span>￥${price}</span>
							  <button>
				                 <a href="${href}">查看详情</a>
			                  </button>
							  <button>加入购物车</button>
						   </div>
					  </li>`
		   }
		   var img_one=$("#outwears ul")
		  img_one.children().first().after(html);

	  //遍历1楼的2个产品
		var html="";
		for(var i=7;i<13;i++){  
		       var {pic,price,href}=res[i];
			   html+=`<li>
						   <img src="${pic}" >
						   <div class="three_mask">
							   <span>￥${price}</span>
							  <button>
				                 <a href="${href}">查看详情</a>
			                  </button>
							  <button>加入购物车</button>
						   </div>
					  </li>`
		   }
		   var img_one=$("#dresses ul")
		  img_one.children().first().after(html);

	  //遍历1楼的3个产品
		var html="";
		for(var i=13;i<19;i++){  
		       var {pic,price,href}=res[i];
			   html+=`<li>
						   <img src="${pic}" >
						   <div class="three_mask">
							   <span>￥${price}</span>
							  <button>
				                 <a href="${href}">查看详情</a>
			                  </button>
							  <button>加入购物车</button>
						   </div>
					  </li>`
		   }
		   var img_one=$("#tees ul")
		  img_one.children().first().after(html);
		
	 //遍历1楼的4个产品
		var html="";
		for(var i=19;i<=24;i++){  
		       var {pic,price,href}=res[i];
			   html+=`<li>
						   <img src="${pic}" >
						   <div class="three_mask">
							   <span>￥${price}</span>
							  <button>
				                 <a href="${href}">查看详情</a>
			                  </button>
							  <button>加入购物车</button>
						   </div>
					  </li>`
		   }
		   var img_one=$("#pants ul")
		  img_one.children().first().after(html);
		 
     //遍历2楼
	     var html=""; 
		 for(var i=25;i<=29;i++){ 
			var {pic,href}=res[i];
			html+=`<li class="box">
				      <a href="${href}">
				        <img class="louceng1_img2 louceng1" src="${pic}" alt=""><div class="mask"></div>
			          </a>
				    </li>`
		  }
			var img_one=$("div.lou div.louceng_counter1 ul.louceng_ul")
			img_one.html(html);

     //遍历3楼
         var html=""; 
		 for(var i=30;i<=34;i++){ 
			var {pic,href}=res[i];
			html+=`<li class="product">
						<div class="product-hover"></div>
						<a href="${href}"><img src="${pic}"></a>
					</li>`
		  }
			var img_one=$("div.lou div.main ul.main_three")
			img_one.html(html);



	  }
   })
  //轮播
	function task(){
		   //找出当前在轮播的
	       var $show=$(".show")
           $show.removeClass("show") //去掉show
		   if($show.next().length==0){ //如果当前轮播在最后一张图片
		       var next=$show.parent().children("img:first-child") //下一个轮播图片切换到第一张
			   var index=0; //index 如果当前轮播在最后一张图片,那么下一个轮播图片对应的原点的下标
		   }else{//如果在中间 1,2,3
		       var next=$show.next() //下一个轮播的就是当前轮播图片的下一个兄弟
			   var index=$show.index()+1  //当前轮播图片的下标+1就是下一张轮播图片的下标
		   }
	      next.addClass("show")  
		  $("ul.lunbo_button").children(":eq("+index+")").addClass("active").siblings().removeClass("active")  //当前轮播的增加active，兄弟移除active
	   }
	   var timer=setInterval(task,2000)

	   //鼠标移入移除
	   var box=$("div.lunbo_contaner");
	   box.mouseover(function(){
	      clearInterval(timer);
		  timer=null;
	   })
	   box.mouseout(function(){
	      timer=setInterval(task,2000);
	   })

       //左右箭头
	   var aLeft=$(".left");
       var aRight=$(".right");
	   aRight.click(function(){  //1,2,3,4
	       task();
	   })
	   aLeft.click(function(){ //4,3,2,1
	       var $show=$(".show")
           $show.removeClass("show") 
		   if($show.prev().length==0){ //轮播在第一张
		      var prev=$show.parent().children("img:last-child")
			  var index=$(".lunbo_count>img").length-1  //4-1
		   }else{ //轮播在2,3,4
		      var prev=$show.prev()
			  var index=$show.index()-1 //有show的下标-1
		   }
		   prev.addClass("show") 
		   $("ul.lunbo_button").children(":eq("+index+")").addClass("active").siblings().removeClass("active") 
	   })

	   //点击小圆点
	   var $ul=$("ul.lunbo_button")
	   var $img=$(".lunbo_count")
	   $ul.on("click","li",function(){
	      var i=$(this).index()//当前点击原点的下标
		  $img.children(":eq("+i+")").addClass("show").siblings().removeClass("show")  
		  $ul.children(":eq("+i+")").addClass("active").siblings().removeClass("active") 
	   })
  //三楼
	$("ul:has([data-toggle=item])").on("click","[data-toggle=item]",function(e){
	   e.preventDefault()
       $a=$(this);
	   var id=$a.attr("href");
	   $a.parent().addClass("active")
	              .siblings().removeClass("active");
	   $(id).addClass("active")
	              .siblings().removeClass("active");
   })
  //左边导航栏
   var $navbar=$(".navbar");
	var $floor=$(".floor");
	console.log($floor);
	$(window).scroll(function(){
		var gunTop=$(window).scrollTop();
		if(gunTop>=100){
		   $navbar.show()
		   $floor.each(function(i,f){
			 var $f=$(f);
			 var offsetTop=$f.offset().top;
			 if(offsetTop<=gunTop+innerHeight/2){
				$navbar.children(".item:eq("+i+")").addClass("active")
												   .siblings().removeClass("active")
			 }
		   })
		}else{
		   $navbar.hide()
		}
	})
	/*点击左边的导航栏*/
	$navbar.on("click",".item",function(e){
		e.preventDefault();
		var i=$(this).index();
		var offsetTop=$($floor[i]).offset().top-200
		$("html").stop(true).animate({
			scrollTop:offsetTop
		},300)
	})
  //广告弹出
	var t=setInterval(function(){
		$("div.advent").addClass("in")
	
	},3000)
	$("div.advent .close").click(function(){
		$(this).parent().removeClass("in");
	    clearInterval(t);
	})





})