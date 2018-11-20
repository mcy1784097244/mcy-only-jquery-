//1.加载模块
const express=require('express');
const pool=require('./pool.js');
const bodyParser = require('body-parser');
const session = require('express-session');

/*引入路由模块*/
const index=require("./routes/index.js");
const product=require("./routes/product.js");
const details=require("./routes/details.js")
const users=require("./routes/users.js")
const register=require("./routes/register.js")

//2.创建express对象
var app = express();
//3.指定静态目录 
app.use(express.static(__dirname+"/public"));
//4.绑定监听端口
var server=app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
     secret:'128位随机字符串',
	 resave:false,
	 saveUninitialized: true,
}))



/*使用路由器来管理路由*/
app.use("/index",index);   //后端访问 http://127.0.0.1:3000/index/ImageCarousel
app.use("/product",product);
app.use("/details",details)
app.use("/users",users)
app.use("/register",register)