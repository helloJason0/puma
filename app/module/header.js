 define(["jquery","cookie"],function($){
	function Header(){};
	
	//实现新闻栏新闻滚动；
	
	Header.prototype.news = function(){
		var $ul = $("#news"),
		 	$aLi = $("#news li");
		var len =$aLi.length,
			liHeight = $aLi.eq(0).height();
		$ul[0].innerHTML += $ul[0].innerHTML;
	 	var index = 0;
	 	setInterval(function(){
	 		index++;
	 		if(index > len){
	 			$ul.css("top","0");
	 			index = 1;
	 		}
	 		$ul.animate({"top":-index*liHeight})
	 	},2500)
	 	return this;
	 	
	}
	//下拉菜单hover效果；
	
	Header.prototype.init = function(){
		var $men = $("#men"),
		 	$_men = $("#men div");
		 	$men.hover(function(){
	 		$_men.eq(0).css({"display":"block"});
		},function(){
	 		$_men.eq(0).css({"display":"none"});
	 	})
	 	return this;
	}
	//导航栏吸顶
	
	Header.prototype.xiding = function(){
		var $navTop = $("header nav").offset().top;
		$(document).on("scroll",function(){
			var $bTop = $(document).scrollTop();
			if ($bTop >= $navTop) {
				$("header nav").addClass("ac");
				$("header nav .a1 .img").css({"background-position":"-89px -144px"});
			}else{
				$("header nav").removeClass("ac");
				$("header nav .a1 .img").css({"background-position":"-3px -166px"});
			}
		})
		return this;
	}
	
	//登陆成功header显示欢迎用户名
	Header.prototype.welcome = function(){
		if ($.cookie("user")) {
			var str = JSON.parse($.cookie("user"));
			$("#dl").css("display","none");
			$("#zc").css("display","none");
			$("#user").css("display","block").html("欢迎您:"+str[0].username);
			$("#quit").css("display","block").html("退出当前用户")
		}
		return this;
	}
	
	//退出当前用户交互
	Header.prototype.out =function(){
		$("#quit").click(function(){
			$.cookie("user","",{path: '/' ,expires:-1});
			$("#user").css("display","none");
			$("#quit").css("display","none");
			$("#dl").css("display","block");
			$("#zc").css("display","block");
		})
	}
	
	return new Header();
})