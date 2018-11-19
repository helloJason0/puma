require(["config"], function(){
	require(["jquery", "tools", "header", "footer","lunbo"], function($,tools,header,footer,lunbo){
		$("header").load("/html/component/header.html", function(){
			header.news().init().xiding().welcome().out();
		});
		$(".banner").load("/html/component/lunbo.html", function(){
			lunbo.init();
		});
		$("footer").load("/html/component/footer.html", function(){
				
		});
		
	})
})