require(["config"], function(){
	require(["jquery", "header", "footer","tools","cookie"], function($,header,footer,QFTools){
		$("header").load("/html/component/header.html", function(){
			header.news().init().xiding().welcome().out();
		});
		
		$("footer").load("/html/component/footer.html", function(){
				
		});
		if ($.cookie("shopping")) {
			$(".empty").css("display","none");
			var	tab = QFTools.$("#demo"),
				tbody = QFTools.$("tbody")[0],
				arr = JSON.parse($.cookie("shopping")),
				zj = QFTools.$("#zj"),
				editBtns = QFTools.$(".ebtn"),
				okBtns = QFTools.$(".okbtn"),
				cancelBtns = QFTools.$(".cbtn"),
				delBtns = QFTools.$(".delbtn");
			var len = arr.length;
			var index = 0;
			var allPrice = 0;
			var n = len;
			console.log($.cookie("shopping"));
			for (var i=0;i<arr.length;i++) {
				var tr = document.createElement("tr");
				tr.innerHTML = `
					<tr>
						<td class="td1">
							<div class="dbtn">
								<input type="checkbox"  checked="checked"  class="dx" id = "${arr[i].id}"/>
							</div>
							<div class="img">
								<img src="${arr[i].img1}"/>
							</div>
							<div class="mes">
								<p class="name">${arr[i].listname}</p>
								<p class="xh">${arr[i].proname}</p>
							</div>
						</td>
						<td class="td2">
							<a href="javascript:;" class="ebtn">编辑</a>
							<a href="javascript:;" class="delbtn">删除</a>
							<a href="javascript:;" class="okbtn">确定</a>
							<a href="javascript:;" class="cbtn">取消</a>
						</td>
						<td class="td3">${arr[i].size}</td>
						<td class="td4"><span>${arr[i].num}</span><input type="number" id="num"/></td>
						<td class="td5">${arr[i].price}</td>
						<td class="td6">${arr[i].price*arr[i].num +"元"}</td>
					</tr>
				`
				tbody.appendChild(tr);
			}
			//给确定发编号确定点击按钮对应的cookie
			for (var i=0;i<okBtns.length;i++) {
				okBtns[i].index = i;
			}
			
			//给删除发编号确定点击按钮对应的cookie
			for (var i=0;i<delBtns.length;i++) {
				delBtns[i].index = i;
			}
			
			
			//编辑
			for (var i=0;i<editBtns.length;i++) {
			 	editBtns[i].onclick = function(){
			 		var tr = this.parentNode.parentNode;
			 		tr.className = "edit";
					var span = QFTools.$("span",tr)[0];
					span.nextElementSibling.value = span.innerHTML;
			 	}
		    }
			
			//删除
			for (var i=0;i<delBtns.length;i++) {
				delBtns[i].onclick =function(){
					var tr = this.parentNode.parentNode;
					if(confirm("确定删除么？")){
						tr.parentNode.removeChild(tr);
					}
					index = this.index;
					arr.splice(index,1);
					var json = JSON.stringify(arr);
					if (!arr.length) {
						$.cookie("shopping","",{path:"/",expires:-1});
						 window.location.reload();
					} else{
						$.cookie("shopping",json,{path:"/",expires:7});
					}
					
					ZJ();
					console.log($.cookie("shopping"));
				}
			}
			
			//确定	
			for (var i=0;i<okBtns.length;i++) {
				okBtns[i].onclick = function(){
					var tr = this.parentNode.parentNode;
					var input = QFTools.$("input",tr)[1];
					if (input.value>=0) {
						input.value = input.value
					} else{
						input.value=0;
					}
					input.previousElementSibling.innerHTML = input.value;
					this.parentNode.parentNode.className = "";
					index = this.index;
					arr[index].num = input.value;
					var json = JSON.stringify(arr);
					$.cookie("shopping",json,{path:"/",expires:7});
					QFTools.$(".td6",tr)[0].innerHTML = input.value*QFTools.$(".td5",tr)[0].innerHTML +"元"
					console.log(QFTools.$(".td5",tr)[0].innerHTML);
					ZJ();
				}
			}
			
			//取消
			for (var i=0;i<cancelBtns.length;i++) {
				cancelBtns[i].onclick = function(){
					this.parentNode.parentNode.className = "";
				}
			}
			
			//算总价
			function ZJ(){
				allPrice = 0;
				for(var item of arr){
					allPrice += item.price * item.num;
				}
				zj.innerHTML = allPrice ;
			}
			ZJ();
			
			//算每个商品的总价
			function dj(id){
				var singelPrice = 0;
				for(var item of arr){
					if (item.id == id) {
						console.log(item)
						singelPrice = item.price*item.num;
					} 
				}
				
				return singelPrice;
			}
			
			//单选、全选效果
			$("#qx").change(function(){
				if (!$(this).prop("checked")) {
					$(".dx").each(function(){
						$(this).removeAttr("checked")
					})
					zj.innerHTML = 0;
					$("td").css("color","#C0C0C0");
					allPrice = 0;
					n =0;
				} else{
					ZJ();
					$("td").each(function(){
						$(this).css("color","#333333");
					})
					$(".dx").each(function(){
						$(this).prop("checked","checked");
					})
					n = len;
				}
			})
			$(".dx").change(function(){
				if ($(this).prop("checked")) {
					n++;
					zj.innerHTML =zj.innerHTML*1 + dj($(this).attr("id")); 
					//$("tr").eq($(this).index()).css("color","#333333");
					$(this).parent().parent().parent().css("color","#333333");
				} else{
					n--;
					zj.innerHTML = zj.innerHTML*1 - dj($(this).attr("id")); 
					console.log(dj($(this).attr("id")))
					console.log($(this).attr("id"))
					$(this).parent().parent().parent().css("color","#C0C0C0");
				}
				if (n === len) {
					$("#qx").prop("checked","checked");
					ZJ();
					$(this).parent().parent().parent().css("color","#333333");
				} else{
					$("#qx").removeAttr("checked");
					//zj.innerHTML = "总价：" + 0 + "元";
					
				}
			})
			
			
			
			
			
			
			
			
			
			
				
		}else{
			$(".empty").css("display","block")
		}
	})
})