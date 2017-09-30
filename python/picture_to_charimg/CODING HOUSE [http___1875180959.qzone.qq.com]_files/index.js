seajs.use(["v8/index/profile","v8/index/visitor",'v8/toolbar/core',"v8/menu/cover_menu","v8/index/photo_wall","v8/index/like","v8/ic/accessory"].concat(window.g_moreModules || []),function(profile,visitor,toolbar,covermenu,photowall,like,accessory, msgboard){

	var cpujs = {
		"load":function(cb,args){
			
			if(typeof cb == "function"){
				cb(args);
			}else{
				var i = 0;

				for(i = 0;i < cb.length;i++){
					if(args && args.length){
						cb[i](args[i]);
					}else{
						cb[i]();
					}
					
				}
			}
		}
	};
	window.cpujs = cpujs;
	function _report(type, val, opt){
		if(QZONE.FrontPage.isInteractZone() && location.href.indexOf('qz_gdt=')>-1){
			var id = 'index_v8_checkInteractZoneVisit';

			opt = opt || {};
			opt.uin = window.g_iUin;
        	window.TCISD && TCISD.valueStat && TCISD.valueStat(id, type, val, opt);
		}
    }
	var page = {
		bootstrap:function(){
			_report(1, 11);

			if(!QZONE.FrontPage.isInDressMode()){
				toolbar.bootstrap();
				covermenu.bootstrap();
			}else{
				toolbar.gotoTop();
			}

			profile.bootstrap();
			visitor.bootstrap();
			photowall.bootstrap();
			like.bootstrap();   //赞主页
			//weather.bootstrap();//天气模块
			
			if(!QZONE.FP.isInDressMode()){ //装扮模式不加载AC
				setTimeout(function(){
					accessory.bootstrap();
				},1000);
			}else{
				setTimeout(function(){
					accessory.initNewVipHelper();	
				});
			}
			
			
			QZONE.Global.Event.scrollEvent.init();//滚动引擎初始化

			if(QZONE.FrontPage.isInDressMode()){
				QZONE.shop.initDressUp();
				QZONE.FrontPage.toApp(window.location.href);
			}else{
				window.g_app_identifier && QZONE.FrontPage.toApp(window.location.href);

				QZONE.shop.initDressUp();
			}
			QZONE.qzEvent && QZONE.qzEvent.addEventListener("_qz_enterAppStart",function(){
				G_Param.userScrolling = 0;
			});


			
			seajs.use('http://'+siDomain+'/qzone/v8/engine/compatible.js');
			_report(1, 12);
			if(QZONE.FrontPage.isInteractZone()){ //认证空间
				seajs.use('http://' + siDomain + '/qzone/biz/vpage/v8/v.js', function(module){
					if(module){
						_report(1, 13);
					    module.init();
					}
					//todo
				});
			}else if(QZONE.FrontPage.isFamousZone()){ //名博
			    seajs.use('http://' + siDomain + '/qzone/biz/vpage/v8/f.js', function(module){
                    if(module){
                        module.init();
                    }
                    //todo
                });
			}
			
			//访客礼包
			seajs.use('http://' + siDomain + '/qzone/v8/api/interface/gift4visitor.js');
			if(!window.ownermode){
				seajs.use('v8/index/msgboard/index',function(msgboard){
					msgboard && msgboard.get('./init').init();//留言板模块
				});
			}
			
			
			//主页页面总pv统计
			TCISD&&TCISD.pv("home.qzone.qq.com","v8index");
		}
	};
	page.bootstrap();


	
});