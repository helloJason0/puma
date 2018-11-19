require(["config"],function(){
	require(["jquery","template","header","footer"],function($,template,header,footer){
		$("header").load("/html/component/header.html",function(){
			header.news().init().xiding();
			$.ajax({
				type:"get",
				url:"http://rap2api.taobao.org/app/mock/117050/soccer",
				success: function(res){
					console.log(res.production)
					var html = template("pro-template",{production: res.production});
					console.log(html);
					$("#allitems").html(html);
				}
			});
		})
		$("footer").load("/html/component/footer.html",function(){
			
		})
	})
})
