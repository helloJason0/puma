define(["jquery"],function($){
	$.fn.extend({
		fdj:function(obj){
			var picbox = $("." + obj.picbox),
			    fdj1 = $("#" + obj.fdj1),
			    bigbox = $("#" + obj.bigbox),
			    bigpic = $("." + obj.bigpic);
			    console.log(picbox[0])
		    var n = bigpic.height() / picbox.height();
		    	console.log(n)
		    picbox.mousemove(function(e){
		    	var _left = e.clientX - picbox.offset().left - fdj[0].offsetWidth/2,
		    		_right = e.clientY - picbox.offset().top - fdj[0].offsetHeight/2;
		    	if(_left < 0) _left = 0;
				if(_top < 0) _top = 0;
				if(_left > picbox[0].offsetWidth - fdj[0].offsetWidth) _left = picbox[0].offsetWidth - fdj[0].offsetWidth;
				if(_top > picbox[0].offsetHeight - fdj[0].offsetHeight) _top = picbox[0].offsetHeight - fdj[0].offsetHeight;
				fdj.css({"display":"inline-block","left":_left,"top":_top});
				bigbox.css("display","inline-block");
				
				bigpic.css({"left":"-n*_left","top":"-0*_top"})
		    })
		    picbox.mouseleave(function(){
		    	fdj.css("display","none");
		    	bigbox.css("display","none");
		    })
		}
	})
	
})
