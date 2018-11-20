$(function(){
	$("div.form-button a").click(function(e){
		e.preventDefault();
	    var uname=$("#loginname").val();
		var upwd=$("#loginupwd").val();
		(async function(){
		    var res=await $.ajax({
			   url:"http://127.0.0.1:3000/users/signin",  
			   type:"post",
			   data:{uname,upwd},
			   dataType:"json"
			})
		    if(res.ok==0){
			   //alert(res.msg)
			   $("#haserr").show();
               
			}else{
				$("#haserr").hide();
			    alert("登录成功！即将返回来时的页面...")
			   
			   if(location.search.startsWith("?back=")){
			       var url=location.search.slice(6)   
			   }else{
				   var url="index.html"
				}
				location.href=url;
	          }
        })()
		Save();
    })


   
    $(document).ready(function () {
		if ($.cookie("rmbUser") == "true") {
			$("#autologin").attr("checked", true);
			$("#loginname").val($.cookie("username"));
			$("#loginupwd").val($.cookie("password"));
		}
    });
    
    function Save() {
		if ($("#autologin").attr("checked")) {
		  var str_username = $("#loginname").val();
		  var str_password = $("#loginupwd").val();
		  $.cookie("rmbUser", "true", { expires: 7 }); //存储一个带7天期限的cookie
		  $.cookie("username", str_username, { expires: 7 });
		  $.cookie("password", str_password, { expires: 7 });
		}
		else {
		  $.cookie("rmbUser", "false", { expire: -1 });
		  $.cookie("username", "", { expires: -1 });
		  $.cookie("password", "", { expires: -1 });
		}
      }; 



})




