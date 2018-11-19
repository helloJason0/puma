require(["config"], function(){
	require(["jquery", "template", "header", "footer","cookie"], function($, template, header,footer){
		$("header").load("/html/component/header.html", function(){
			header.news().init().xiding();
		})
		$("footer").load("/html/component/footer.html",function(){})
		
		
		var	$username = $("#username"),
			$password = $("#password");
			if ($.cookie("user")) {
				var str = JSON.parse($.cookie("user"));
				console.log(str)
				console.log(str[0])
				$username.val(str[0].username);
				$password.val(str[0].password);
			}
		var usernameReg = /^[A-Za-z0-9\u4e00-\u9fa5_]{2,10}$/,
			passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
		var flag1 = false,
			flag2 = false;
		$username.blur(function(){
			if ($(this).val() === "") {
				flag1 = false;
			}else if (! usernameReg.test($(this).val())) {
				$(".username").css("display","block");
				flag1 = false;
			}else{
				$(".username").css("display","none");
				flag1 = true;
			}
		console.log(flag1)
			
		})
		
		$password.blur(function(){
			if ($(this).val() === "") {
				flag2 = false;
			}else if (! passwordReg.test($(this).val())) {
				$(".password").css("display","block");
				flag2 = false;
			}else{
				$(".password").css("display","none");
				flag2 = true;
			}
			console.log(flag2)
		})
		
		$("#form").submit(function(e){
				console.log(23)
				var data = {
					username:$username.val(),
					password:$password.val()
				}	
				$.ajax({
					type:"get",
					url:"http://localhost/api/login.php",
					data:data,
					dataType:"json",
					success:function(res){
						console.log(res)
						if (res.code === 1) {
							var arr = [data];
							var str = JSON.stringify(arr);
							$.cookie("user",str,{ path: '/' ,expires:7});
							location.href = "http://localhost:1807/"
						}else{
							alert("用户不存在或用户名、密码错误");
						}
					}
				});
				return false;
			})
		$("#btn").click(function(){
			if((flag1 && flag2) || $.cookie("user")){
				$("#form").submit();
			}else{
				alert("用户名、密码格式错误")
			}
		})
	})
})





