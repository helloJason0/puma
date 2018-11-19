require(["config"], function(){
	require(["jquery", "template", "header", "footer","cookie"], function($, template, header,footer){
		$("header").load("/html/component/header.html", function(){
			header.news().init().xiding();
			
		})
		$("footer").load("/html/component/footer.html",function(){})
		var $username = $("#username"),
			$password = $("#password"),
			$repassword = $("#repassword"),
			$telnum = $("#telnum"),
			$email = $("#email");
		var usernameReg = /^[A-Za-z0-9\u4e00-\u9fa5_]{2,10}$/,
			passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/,
			telnumReg=/^[1][3,4,5,7,8][0-9]{9}$/,
			emailReg=/\w+@[a-z0-9]+\.[a-z]+/i;
		var flag1 = false,
			flag2 = false,
			flag3 = false,
			flag4 = false,
			flag5 = false;
			
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
		
		$telnum.blur(function(){
			if ($(this).val() === "") {
				flag2 = false;
			}else if (! telnumReg.test($(this).val())) {
				$(".telnum").css("display","block");
				flag2 = false;
			}else{
				$(".telnum").css("display","none");
				flag2 = true;
			}
			console.log(flag2)
		})
		
		$password.blur(function(){
			if ($(this).val() === "") {
				flag3 = false;
			}else if (! passwordReg.test($(this).val())) {
				$(".password").css("display","block");
				flag3 = false;
			}else{
				$(".password").css("display","none");
				flag3 = true;
			}
			console.log(flag3)
		})
		
		$repassword.blur(function(){
			if ($(this).val() === "") {
				flag4 = false;
			}else if (! ($(this).val() === $password.val())) {
				$(".repassword").css("display","block");
				flag4 = false;
			}else{
				$(".repassword").css("display","none");
				flag4 = true;
			}
			console.log(flag4)
		})
		 
		$email.blur(function(){
			if ($(this).val() === "") {
				flag5 = false;
			}else if (! emailReg.test($(this).val()) ) {
				$(".email").css("display","block");
				flag5 = false;
			}else{
				$(".email").css("display","none");
				flag5 = true;
			}
			console.log(flag5)
		})
		
		$("#btn").click(function(){
			
			if (flag1 && flag2 && flag3 && flag4 && flag5 && $("#chekb").prop("checked")) {
				console.log($("#chekb").prop("checked"))
				var data = {
					username: $username.val(),
					password: $password.val()
				};
				$("#form").submit(function(e){
					$.ajax({
						type:"get",
						url:"http://localhost/api/regist.php",
						data:data,
						dataType:"json",
						success:function(res){
							if (res.code === 1) {
								alert("注册成功");
								var arr = [data];
								var str = JSON.stringify(arr);
								$.cookie("user",str,{path: '/' ,expires:7});
								location.href = "./login.html"
							}else{
								alert("注册失败")
							}
						}
					})
					return false;
				})
			}else{
				alert("请将带*信息正确完善")
			}
		})
	})
})