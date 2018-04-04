/**
 * Created by lizixiang on 16/8/14.
 */
$(function () {

    (function () { //header 购物车
        var $hide = $('#h_main .h_m_right .h_m_r_shop .h_m_r_s_hide');
        var $shop = $('#h_main .h_m_right .h_m_r_shop');
        $shop.hover(function () {
            $hide.stop(true).slideDown(200);
        },function () {
            $hide.stop(true).slideUp(200);
        });
    })();

    (function () {  //nav 搜索
        var $hide = $('#nav .n_search .search-box');
        var $search = $('#nav .n_search .n_s_text');
        var $hot = $('#nav .n_search .search-hot-words');
        var $btn =$('#nav .n_search .n_s_btn');
        $search.on('focus',function () {
            $search.add($btn).addClass('active');
            $hot.fadeOut(200);
            $hide.fadeIn(200);
        });
        $search.on('blur',function () {
            $search.add($btn).removeClass('active');
            $hide.fadeOut(200);
            $hot.fadeIn(200);
        });
    })();

    (function () {  //nav 产品
        var $more = $('#nav .n_li .n_l_more');
        var $product =$('#nav .n_product');
        var $ul = $('#nav .n_product ul');
        var timer1 = null;
        var timer2 = null;
        var _index = 0;
        $more.hover(function () {
                $product.stop(true).slideDown(200);
                _index = $(this).index();
                $ul.eq(_index).show().siblings().hide();
        },function () {
            $product.stop(true).slideUp(200);
                // $ul.hide();
        });
        $product.hover(function () {
            $product.stop(true).slideDown(200);
        },function () {
            $product.delay('slow').stop(true).slideUp(200);
        });
    })();

    (function () {  //baner
        var $tab = $('#bannerMain .b_m_tab li');
        var $img = $('#bannerMain .b_m_img li');
        var $btn = $('#bannerMain .b_m_btn div');
        var _index = 0;//全局索引
        var timer = null;
        $tab.hover(function () {
            $(this).addClass('hover');
        },function () {
            $(this).removeClass('hover');
        }).on('click',function () {
            $(this).addClass('active');
            _index = $(this).index();
            plays();
            clearInterval(timer);
            auto();
        });
        $btn.on('click',function () {
            var index= $(this).index();
            if (index){ //index=1,右按钮
                _index++;
                if(_index > $img.length-1){
                    _index = 0;
                }
                plays();
                clearInterval(timer);
                auto();
            }else{
                _index--;
                if(_index < 0){
                    _index = $img.length-1;
                }
                plays();
                clearInterval(timer);
                auto();
            }
        });
        function plays() {  //封装统一函数
            $tab.eq(_index).addClass("active").siblings().removeClass("active");
            $img.eq(_index).fadeIn().siblings().fadeOut();
        }
        function auto() {  //定时器
            timer = setInterval(function () {
                _index++;
                if (_index> $img.length-1){
                    _index = 0;
                }
                plays();
            },3000);
        }
        clearInterval(timer);
        auto();
        //鼠标移入b_main停止定时，离开继续
        $img.hover(function () {
            clearInterval(timer);
        },function () {
            auto();
        });

    })();

    (function () {  //bannerNav 更多产品
        var $li = $('#bannerNav>ul>li');
        var $more = $('#bannerNav .b_n_more');
        var _index = 0;
        $li.hover(function () {
            _index =$(this).index();
            $more.eq(_index).show();
        },function () {
            $more.eq(_index).hide();
        });
    })();

    (function () {  //明星产品
        var $data = miData.starGoods;
        var len = $data.imgSrc.length;
        var html = "";
        var $ul = $('#starProducts .s_products ul');
        var $btn = $('#starProducts .s_more .s_m_btn');
        var $btn1 =$('#starProducts .s_more .s_m_btn.btn1');
        var $btn2 =$('#starProducts .s_more .s_m_btn.btn2');
        var flag = true;
        var timer = null;
        for (var i=0;i<len;i++){
            html += "<li class='l"+(i+1)%5+"'>"+
                "                <a href='#' class='s_p_img'><img src='"+$data.imgSrc[i]+"' alt=''></a>"+
                "                <a href='#' class='s_p_title'><span>"+$data.title[i]+"</span></a>"+
                "                <span class='s_p_detail'>"+$data.detail[i]+"</span>"+
                "                <span class='s_p_price'>"+$data.price[i]+"</span>"+
                "            </li>"
        }
        $ul.append(html);
        var margin = 1240;
        $btn.on('click',function () {
            var index = $(this).index();
            if ( index ){  //btn2
               if (flag){
                   flag = !flag;
                   $ul.stop(true).animate({
                       marginLeft:-margin
                   },500);
                   toggle();
                   clearInterval(timer);
                   auto();
               }
            }else{
               if (!flag){
                   flag = !flag;
                   $ul.stop(true).animate({
                       marginLeft:0
                   },500);
                   toggle();
                   clearInterval(timer);
                   auto();
               }
            }
        });
        function toggle(){
            $btn1.toggleClass("disable");
            $btn2.toggleClass("disable");
        };
        //自动轮播
        function auto(){
            timer = setInterval(function(){
                if(flag){
                    flag = !flag;
                    $ul.stop(true).animate({
                        marginLeft:-margin
                    },500);
                    toggle();
                }else{
                    flag = !flag;
                    $ul.stop(true).animate({
                        marginLeft:0
                    },500);
                    toggle();
                }
            },5000);
        };
        auto();
    })();

    (function () {  //通用选项卡
        var $title = $('.commonDiv .common_title ul li');
        var $ul = $('.common_products_right ul');
        var $li = $('.common_products_right ul li');
        var $hide = $('.c_p_c_hide');
        var _index = 0;
        $title.hover(function () {
            _index = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parent().parent().parent().find($ul).eq(_index).show().siblings().hide();
        });
        $li.hover(function () {
            $(this).find($hide).slideDown(200);
        },function () {
            $(this).find($hide).slideUp(200);
        });
    })();

});