$(function(){
	$("<link rel='stylesheet' href='css/header.css'>").appendTo("head")
    $.ajax({
		url:"http://127.0.0.1:3000/header.html",
	    type:"get",
		success:function(res){
			$("#header").replaceWith(res)
		    
			var $btnSearch=$("#search div.header-center a");
			var $input=$btnSearch.prev();
			$btnSearch.click(function(e){
			    e.preventDefault();
				var kw=$input.val().trim() //获取关键词，并且把左右空格去掉
				if(!kw==""){
					location.href=`product.html?kwords=${kw}`
				}
			})
			$input.keyup(function(e){
				if(e.keyCode==13){
					$btnSearch.click();
				}
			   
			})
			
			//模糊查询
			if(location.search.indexOf("kwords")!=-1){
				var kwords=decodeURI(location.search.split("=")[1]);
			    $input.val(kwords);
			}
            $("#btnLogin").click(function(){   
               location.href="login.html?back="+location.href
           })
		}
	
	})

    $.ajax({
		url:"http://127.0.0.1:3000/users/islogin",
	    type:"get",
		dataType:"json",
		success:function(res){
		   if(res.ok==0){
			   $("#signout").show();
			   $("#signin").hide();
		   }else{
		       $("#uname").html(res.uname);
			   $("#signin").show();
			   $("#signout").hide();
		   }
		   $("#btnSignout").click(function(){
		        $.ajax({
					url:"http://127.0.0.1:3000/users/signout",
					type:"get",
					success:function(res){
						location.reload();
					}
				
				})
		   })
		}
	
	})



})








