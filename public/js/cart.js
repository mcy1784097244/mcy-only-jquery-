$(function(){
    async function loadcart(){
        var res=await $.ajax({
            url:"http://127.0.0.1:3000/users/islogin",
            type:"get",
            dataType:"json"
          });
          if(res.ok==0){
            alert("暂未登录，无法使用购物车");
          }else{
              var res=await $.ajax({
                url:"http://127.0.0.1:3000/cart/item",
                type:"get",
                dataType:"json"
              })
              console.log(res)
              var html="",total=0,countTo=0;
              for(var item of res){
                 var {iid,title,subtitle,count,price,sm}=item;
                 total+=price*count;
                 countTo=countTo+count;
                 html+=`<div class="cart-body">
                 <div class="select">
                     <input type="checkbox" name="" id="">
                 </div>
                 <div class="product">
                     <img src="${sm}" />
                     <div>
                         <p>${title.split("|")[0]}</p>
                         <p>${subtitle}</p>
                     </div>
                 </div>
                 <div class="price">￥${price}</div>
                 <div class="num">
                     <button data-iid="${iid}">-</button>
                     <span class="span1">${count}</span>
                     <button data-iid="${iid}">+</button>
                 </div>
                 <div class="priceTO">￥${(price*count).toFixed(2)}</div>
                 <div class="delete">
                     <a href="#">删除</a>
                 </div>

             </div>`
              }
              var $ulCart=$("#section .cart-box .content")
              $ulCart.children(":gt(0)").remove()
              $ulCart.children(".cart-top").after(html)
            console.log(countTo)
            $ulCart.siblings("div.cart-bottom")
              .children("div.money")
              .find("span.totalPrice").html(`￥${total.toFixed(2)}`)
              .parent()
              .prev().children(".totalProduct").html(`${countTo}`)
          }

    }
    loadcart()

    var $ulCart=$("#section .cart-box .content");
    $ulCart.on("click","button",function(){
      var $btn=$(this);
      (async function(){
        var iid=$btn.attr("data-iid");
        var count=$btn.siblings(".span1").html();
        // console.log(count)
        if($btn.html()=="+"){
           count++;
        //    console.log(count);
        }else{ 
           count--;
        }
        if(count==0)
            if(!confirm("是否删除改商品？"))
              return;//退出当前函数
        await $.ajax({
           url:"http://127.0.0.1:3000/cart/update",
           type:"get",
           data:{iid,count}
        })
        loadcart()
      })()
    })




})