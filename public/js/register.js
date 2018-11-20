$(function(){
    /* var unamefag=false;
    	var	upwdfag=false;
    	var	emailfag=false;
    	var	phonefag=false;*/
	$("#username").blur(function(){
		var uname=$("#username").val();   
		var span=$("#span1");
		var reg= /^[a-zA-Z][\w]{2,8}$/;
		if(uname!="" && reg.test(uname)){
			$.ajax({
				url:"http://127.0.0.1:3000/register/checkUname",    
				type:"get",
				data:{uname},
				dataType:"json",
				success:function(res){
					if(res=="1"){
		              span.html("用户名称已存在！");
		              span.css("color","red");

		            }else{
		              span.html("正确");
		              span.css("color","green");

		            }	
				}
			})
	    }else{
			span.html("用户名开头为字母,3到9位字母或数字");
			span.css("color","red");
			
		}
	})
    

    $("#password").blur(function(){
		var upwd=$("#password").val();   
		var span=$("#span2");
		var reg=/^[\d]{6,10}$/;
	    if(upwd!="" && reg.test(upwd)){
		   span.html("正确");
		   span.css("color","green");
		}else{
		   span.html("密码必须为6到10位数字");
		   span.css("color","red");
		}
	})
	
	$("#confirmPassword").blur(function(){
		var upwd=$("#password").val();   
		var dupwd=$("#confirmPassword").val();   
		var span=$("#span3");
		if(dupwd!="" && dupwd===upwd){
		   span.html("正确");
		   span.css("color","green");
		}else{
		   span.html("重复密码与原密码不一致");
		   span.css("color","red");
		}
	    
	})

	$("#phone").blur(function(){  
		var phone=$("#phone").val();   
		var span=$("#span5");
		var reg=/^1[3-8]\d{9}$/;
		if(phone!="" && reg.test(phone)){
		   span.html("正确");
		   span.css("color","green");
		}else{
		   span.html("手机号码格式错误");
		   span.css("color","red");
		}  
	})

	$("#email").blur(function(){  
		var email=$("#email").val();   
		var span=$("#span6");
		var reg=/[a-zA-Z0-9]{1,10}@[a-zA-Z0-9]{1,5}\.[a-zA-Z0-9]{1,5}/;
		if(email!="" && reg.test(email)){
		   span.html("正确");
		   span.css("color","green");
		}else{
		   span.html("邮箱格式错误");
		   span.css("color","red");
		}  
	})

    $("input[type=button]").click(function(){
		var span=$("div.content span");
		//console.log(span);
		var uname=$("#username").val(); 
		var upwd=$("#password").val(); 
		var phone=$("#phone").val();   
		var email=$("#email").val(); 
     for(var i=0,sum=0;i<=4;i++){
		 //console.log(span[i]);
          //console.log(span[i].innerHTML);
          if(span[i].innerHTML=="正确") sum+=1
	 }
		if(sum<5){
		    alert('请输入正确的信息');
             //结束
			 console.log(sum);
		}else if(sum==5){
			console.log(sum);
			console.log(2);
		    $.ajax({
				url:"http://127.0.0.1:3000/register/register",
				type:"post",
                data:{uname,upwd,email,phone},
				dataType:"json",
                success:function(res){
					console.log(res);
				  if(res.ok=="1"){
				   alert("注册成功");
                   window.location = "login.html";
				 }
				}
			
			})
		}

	})


























})