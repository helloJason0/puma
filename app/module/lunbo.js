define(["jquery"],function($){
	function lunbo(){};
	lunbo.prototype.init = function(){
		var $ul = $(".banner .box ul"),
			$imgs =$(".banner .box ul li"),
			$imgWidth = $imgs.eq(0).width(),
			len = $imgs.length,
			$btn = $(".banner .box .btn"),
			index = 0,
			timer = null,
			flag = false;
			
			$("#goPrev").hover(function(){
				$(this).css({"background":"url(/img/soccer/sprit/1.png) no-repeat 0 -50px","background-color":"white"})
			},function(){
				$(this).css({"background":"url(/img/soccer/sprit/1.png) no-repeat","background-color":""})
			})
			
			$("#goNext").hover(function(){
				$(this).css({"background":"url(/img/soccer/sprit/1.png) no-repeat -24px -50px","background-color":"white"})
			},function(){
				$(this).css({"background":"url(/img/soccer/sprit/1.png) no-repeat -25px 0","background-color":""})
			})
			
		$imgs.each(function(){
			$("<span>")
			.addClass($(this).index() == 0?"ac":"")
			.appendTo($btn);
		})
		$imgs.eq(0).clone(true).appendTo($ul);
		$ul.css("width",$imgWidth*(len+1));
		$btn.on("click","span",function(){
			if (!flag) {
				flag = true;
				$(this).addClass("ac").siblings().removeClass("ac");
				index = $(this).index();
				$ul.animate({"left":-index*$imgWidth},"slow",function(){
					flag = false;
				})
			}
		})
		$("#goNext").click(function(){
			if (!flag) {
				flag = true;
				if (++index >= len) {
					index = 0;
					$ul.animate({"left":-len*$imgWidth},"slow",function(){
						$ul.css("left",0);
						flag = false;
					})
				}else{
					$ul.animate({"left":-index*$imgWidth},"slow",function(){
						flag = false;
					})
				}
				$btn.children().eq(index).addClass("ac").siblings().removeClass("ac");
			}
		})
		$("#goPrev").click(function(){
			if (!flag) {
				flag = true;
				if (--index<0) {
					index = len-1;
					$ul.css("left",-len*$imgWidth);
				}
				$ul.animate({"left":-index*$imgWidth},"slow",function(){
					flag = false;
				})
				$btn.children().eq(index).addClass("ac").siblings().removeClass("ac");
			}
		})
		$(".banner .box ul").hover(function(){
			clearInterval(timer);
		},(function autoPlay(){
			timer = setInterval(function(){
				$("#goNext").trigger("click")
			},2500)
			return autoPlay;
		})())
	}
	return new lunbo();
})