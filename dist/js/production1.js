require(["config"],function(){
	require(["jquery","template","header","footer","fdj","cookie"],function($,template,header,footer){
		$("footer").load("/html/component/footer.html",function(){})
		$("header").load("/html/component/header.html",function(){
			header.news().init().xiding();
			var ss = location.search.slice(1),
				arr = ss.split("="),
				obj = {};
			obj[arr[0]] = arr[1];
			$.ajax({
				type:"get",
				data:obj,
				url:"http://rap2api.taobao.org/app/mock/117569/xqy2",
				success: function(res){
					var obj = {
								picbox:"picbox",
								fdj1:"fdj",
								bigbox:"bigbox",
								bigpic:"bigpic"
							}	
							$(".content").fdj(obj);
							console.log(369)
					var html = template("pro-template",{pro: res});
					$(".content .pic").html(html);
					var html1 = template("pro-template1",{pro: res});
					$("#name").html(html1);
					
					
					//购物车cookie操作
					var size = $(".informt ul li").eq(0).html();
					var obj1 = {};
					var arr = [];
					obj1.id = obj.id;
					obj1.img1 = res.img1;
					obj1.price = res.price;
					obj1.listname = res.listname;
					obj1.proname = res.proname;
					obj1.size = size;
					console.log(obj1)
					
					//默认尺码样式加在第一个li上
					var size = $(".informt ul li").eq(0).html();
					$(".informt ul li").eq(0).addClass("ac");
					$(".informt ul li").click(function(){
						$(this).addClass("ac").siblings().removeClass("ac");
						size = $(this).html();
						obj1.size = size;
					})
					//点击购物车存商品信息
					$("#add").click(function(){
						if (!$.cookie("shopping")) {
							obj1.num = $(".num").val();
							arr.push(obj1);
							var json = JSON.stringify(arr);
							$.cookie("shopping",json,{path: '/'});
						} else{
							var str = JSON.parse($.cookie("shopping"));
							obj1.num = $(".num").val();
							for (var i=0;i<str.length;i++) {
						 		if (str[i].id === obj1.id) {
						 	    str[i].num =str[i].num*1 + obj1.num*1;
						 	    break;
					    		}
						 	}
							if (str.length === i) {
								obj1.num = $(".num").val();
						 		str.push(obj1);
						 	}
							var str1 = JSON.stringify(str);
							$.cookie("shopping",str1,{path: '/',expires:7});
							console.log(str1)
						}
					})
				}
			})
		})
	})
})
