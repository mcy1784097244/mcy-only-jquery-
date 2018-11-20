$(function(){
   if(location.search.indexOf("lid=")!=-1){
        var lid=location.search.split("=")[1];
        (async function(){
			var res=await $.ajax({
				url:"http://127.0.0.1:3000/details",
				type:"get",
				data:{lid},
				dataType:"json"
			})
            //console.log(res);
			var {product,pics}=res;
			var {title,subtitle,price}=product
            var details=$("#d1 ul");
			details.children(".right-li1").children(":nth-child(1)").html(title);
			details.children(".right-li1").children(":nth-child(2)").html(subtitle);
			details.children(":nth-child(2)").children(":nth-child(1)").children(":nth-child(2)").html("￥"+price.toFixed(2));

			var html="";
			for(var pic of pics){
				var {sm,md,lg}=pic;//请求图片，让图片地址存储在这里
				html+=`<li>   
				  <img src="${sm}" data-md="${md}" data-lg="${lg}">
				</li>`
            }
			//图片切换
			var ul=$("div.product_center .left .left-bottom .small-img").html(html)
			var mdImg=$("#md-img");   
			var divLg=$("#div-lg");
            mdImg.attr("src",pics[0].md);
			divLg.css("backgroundImage",`url(${pics[0].lg})`);
			ul.on("mouseover","img",function(e){
				  var img=$(this);
				  var md=img.attr("data-md");
				  var lg=img.attr("data-lg");
				  mdImg.attr("src",md);
				  divLg.css("backgroundImage",`url(${lg})`);
				     img.addClass("active")
				     img.parent().siblings().children().removeClass("active");
			})

            var $mask=$("#mask");//半透明遮罩
            var $smask=$("#super-mask");//透明玻璃板
			var MSIZE=176;//mask的大小
			var MAX=430-MSIZE;//top和left的最大值   
            $smask.hover(function(){
               $mask.toggleClass("hide");   
               divLg.toggleClass("hide");  
            })
			$smask.mousemove(function(e){
				var left=e.offsetX-MSIZE/2;
				var top=e.offsetY-MSIZE/2;
				if(left<0) left=0; 
				else if(left>MAX) left=MAX;
				if(top<0) top=0;
				else if(top>MAX) top=MAX;
				$mask.css({left,top});
				divLg.css("background-position",
				  `-${130/43*left}px -${130/43*top}px`)
		  })



	
		  //加减
			$("#d1 ul").on("click",".add,.sub",function(){
				 if($(this).hasClass("add")){
					 var span=$(this).prev().html()
					 span++
					 $(this).prev().html(span);
				 }else{
					 var span=$(this).next().html()
					 span--
					 if(span<1){
						span=1
					}
					$(this).next().html(span)
				}
			})
			//详情切换
			$("ul.tab:has([data-toggle=tabs])")
				.on("click","[data-toggle=tabs]",function(e){
				  e.preventDefault()
				  var $tar=$(this);
				  var i=$tar.parent().prevAll().length;
				  var left=i*150;
				  $("div.tab_box").css({left});
				  if(!$tar.parent().is(".active")){
					$tar.parent().addClass("active")
					  .siblings().removeClass("active");
					var id=$tar.attr("href");
					$(id).addClass("active")
					  .siblings().removeClass("active");
				  }
		    })



	 })()
	}
})
