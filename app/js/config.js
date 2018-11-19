require.config({
	baseUrl: "/",
	paths: {
		"fdj":"module/FDJ",
		"lunbo":"module/lunbo",
		"header": "module/header",
		"footer": "module/footer",
		"jquery": "libs/jquery/jquery-1.11.3",
		"bootstrap": "libs/bootstrap/js/bootstrap",
		"tools": "libs/tools",
		"template": "libs/template-web",
		"cookie":"libs/jquery.cookie"
	},
	//垫片
	shim:{
		"bootstrap": {
			deps: ["jquery"]
		}
	}
})