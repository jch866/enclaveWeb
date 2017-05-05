$(function() {
    var doc = $(window);
    var artListUl = $(".artList>ul");
    var recommendUl = $(".recommend>ul");
    var details = $('.article_detail');
    var art_head = $('.article_head');
    var menu_tab = $('.menu_con');
    var delay = 60 * 60 * 3 * 1000; //3小时缓存机制
    var cache = { aL: 'artList', aLT: 'artList_time' };
    var util = {
        //[util.supports_ls 判断是否支持localstorage]
        supports_ls: function() {
            return !!(window.localStorage)
        },
        //[util.setls 判断是否支持localstorage]
        setls: function(key, value) {
            window.localStorage[key] = value;
        },
        //[util.getls 判断是否支持localstorage]
        getls: function(key) {
            return window.localStorage[key];
        },
        //[util.rmls 判断是否支持localstorage]
        rmls: function(key) {
            window.localStorage.removeItem[key];
        },
    };
    var selfCacheData = util.supports_ls() ? util.getls(cache.aL) : false;
    var lsTime = util.supports_ls() ? (util.getls(cache.aLT) - 0) : false;
    var url = {
        al: 'https://app.enclavebooks.cn/v1_4/index', //article list
        ad: 'http://app.enclavebooks.cn/v1_4/article?', //article detail
        ar: 'http://app.enclavebooks.cn/v1_4/recommend' //article random  随机三篇
    };

    /**
     * 
     * @return {[type]} [description]
     */


    /**
     * [docRefresh 绑定首页按F5刷新事件]
     * @return {[type]} [description]
     */
    function docRefresh() {
        doc.keydown(function(e) {
            //阻止F5默认事件
            e.preventDefault();
            var x = e.keyCode;
            if (x === 116) {
                getArticle();
            }
        })
    }
    /**
     * [getArticle 获取文章列表]
     * @return {[type]} [description]
     */
    function getArticle() {
        $('.artList').addClass('loadingBg');
        $.get(url.al, function(data) {
            // console.log(data);
            if (data.code == 200) {
                if (util.supports_ls()) {
                    util.setls(cache.aL, JSON.stringify(data))
                    util.setls(cache.aLT, new Date().getTime())
                }
                // console.log(JSON.stringify(data));
                var artArray = data.result.data;
                artArray.length = 9;
                renderDom(artListUl, artArray);
                $('.artList').removeClass('loadingBg');
            }
        })
    }
    /**
     * [renderDom 渲染DOM元素]
     * @param  {[type]} data [服务器发回的JSON数据]
     * @return {[type]}      [void]
     */
    function renderDom(wrap, data) {
        switch (wrap) {
            case artListUl: //文章列表的Dom
                artListUl.html('');
                $.each(data, function(index, item) {
                    var str = '<li>' +
                        '<a href="article.html?art_id=' + item.art_id + '" ><img src=' + item.art_thumb + ' alt=""></a>' +
                        '<h3>' + item.art_title + '</h3>' +
                        '<p class="des">' + item.art_description + '</p>' +
                        '<div class="editor">' +
                        '<p><span class="mark">生活岛屿</span>' + item.art_editor + '</p>' +
                        '</div>' +
                        '</li>';
                    artListUl.append($(str));
                })
                break;
            case details://文章详情的Dom
                var str = '<img src="' + data.art_thumb + '" alt=""><h1>' + data.art_title + '</h1>' +
                    '<div class="author">' +
                    '<img src="' + data.editor_avatar + '" alt=""><span>' + data.art_editor + ' · ' + data.art_time + '</span>' +
                    '</div>' + data.art_content +
                    '<div class="readOther">' +
                    '<span class="left mark"> 生活岛屿 </span>' +
                    '<span class="reads"><i></i>' + data.art_view + '</span>' +
                    '</div>';
                details.html($(str));
                break;
            case recommendUl://文章详情页下面的随机三篇文章的Dom
                recommendUl.html('');
                $.each(data, function(index, item) {
                    var str = '<li>' +
                        '<a href="article.html?art_id=' + item.art_id + '" ><img src=' + item.art_thumb + ' alt=""></a>' +
                        '<div class="summary">' +
                        '<h2>' + item.art_title + '</h2>' +
                        '<p>' + item.art_description + '</p>' +
                        '<div><p><span class="mark">生活岛屿</span>' + item.art_editor + '</p></div>' +
                        '</div>' +
                        '</li>';
                    recommendUl.append($(str));
                })
                break;
        }


    }
    /**
     * [renderBySelfDate 利用存储的数据渲染文章列表]
     * @return {[type]} [description]
     */
    function renderBySelfDate() {
        var selfObj = JSON.parse(selfCacheData);
        var artArray = selfObj.result.data;
        artArray.length = 9;
        renderDom(artListUl, artArray);
    }
    //以时间判断是否需要重新加载文章列表
    function isOverTime() {
        if (lsTime) {
            var deferTime = new Date().getTime() - lsTime;
            return !!(deferTime < delay);
        }
        return false;
    }
    /**
     * [initArtList 初始化文章数据]
     * @return {[type]} [description]
     */
    function initArtList() {
        //有数据且不超时
        if (selfCacheData && isOverTime()) {
            renderBySelfDate();
        } else {
            //localStorage.removeItem(cache.aL);
            //localStorage.removeItem(cache.aLT);
            getArticle();
        }
    }
    //artListUl.length != 0可判断是不是在首页
    (artListUl.length != 0) && initArtList();
    //按F5刷新
    (artListUl.length != 0) && docRefresh();


    /**
     * [getArticleCon 得到单篇文章内容]
     * @return {[type]} [description]
     */
    function getArticleCon() {
        var localId = location.search.substring(1); //"art_id=270"
        $.get(url.ad + localId, function(data) {
            //console.log(data.message);
            if (data.code == 200) {
                //console.log(data.result);
                var item = data.result;
                renderDom(details, item);
            }
        })
        //随机文章3篇
        getRandomArticle();
    }

    (details.length != 0) && getArticleCon();

    function getRandomArticle() {
        $.get(url.ar, function(data) {
            //console.log(data);
            if (data.code == 200) {
                var res = data.result.data;
                renderDom(recommendUl, res);
            }
        })
    }

    /**
     * [scrollFixed 绑定window滚动事件达到临界点head就fixed]
     * @return {[type]} [description]
     */
    function scrollFixed() {
        doc.scroll(function() {
            var headHeight = art_head.height();
            if (doc.scrollTop() > headHeight) {
                art_head.addClass('fixedTop')
            } else {
                art_head.removeClass('fixedTop')
            }
        })
    }

    (art_head.length != 0) && scrollFixed();
    /**
     * [tabChange 关于我们，页面标题TAB]
     * @return {[type]} [description]
     */
    function tabChange() {
        var tab = $('.menu > a');
        var index = 0;
        if (tab.length != menu_tab.length) {
            return;
        } else {
            tab.on("click", function() {
                tab.removeAttr('class');
                $(this).addClass('curr');
                index = tab.index($(this));
                menu_tab.hide();
                menu_tab.eq(index).show();
            })
        }
    }
    (menu_tab.length != 0) && tabChange();
});
