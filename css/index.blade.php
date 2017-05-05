<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>飞地 | 诗歌 文学 艺术 生活 | 飞地书局 | 飞地APP </title>
    <meta name="keywords" content="诗歌,文学,艺术,生活,诗人,当代艺术,小说,阅读,视频,电台,FM,文艺,文化">
    <meta name="description" content="飞地是一个汇聚当下最优秀创作者的平台，每日推出3条高品质内容，诗歌、文学、艺术，以视频、声音、文本的形式，带给你精神上的饱满体验。">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,Chrome=1">
    <link rel="shortcut icon" href="{{asset('resources/views/home/img/favicon.ico')}}" />
    <link href="{{asset('resources/views/home/newWeb/css/reset.css')}}" rel="stylesheet" type="text/css">
    <link href="{{asset('resources/views/home/newWeb/css/main.css')}}" rel="stylesheet" type="text/css">
    <script src="{{asset('resources/views/home/newWeb/js/jquery-3.1.0.min.js')}}"></script>
    <meta name="baidu-site-verification" content="6irq8FW73N" />
</head>

<body>
    <header class="head" id="header" >
        <!-- <img src="img/bg.png" alt=""> -->
        <!-- <div class="floatTop"> -->
            <div class="logo"><img src="{{asset('resources/views/home/newWeb/img/logo_white.svg')}}" alt=""></div>
            <div class="title_down">
                <h1>诗歌朝向未来</h1>
                <h2>古典、先锋、品质、趣味。<br>
            在这里，发现诗歌，文学，电影等艺术的无限可能。</h2>
                <ul class="appDown">
                    <li><a href="https://itunes.apple.com/us/app/fei-de/id1179249797?mt=8"><img src="{{asset('resources/views/home/newWeb/img/AppStore@2x.png')}}" alt=""></a></li>
                    <li><a href="https://apk.enclavebooks.cn/%E9%A3%9E%E5%9C%B01.0.2.apk"><img src="{{asset('resources/views/home/newWeb/img/Android_download.png')}}" alt=""></li>
                    <!-- <li><a href=""><img src="{{asset('resources/views/home/newWeb/img/GooglePlay@2x.png')}}" alt=""></a></li> -->
                </ul>
                </div>
            <div class="arrow">
                <a href="javascript:void(0)"><img src="{{asset('resources/views/home/newWeb/img/arrow.svg')}}" alt=""></a>
            </div>
       <!--  </div> -->
    </header>
    <div class="content" id="arrow">
        <div class="share">
            <ul>
                <li class="share_wx"><img src="{{asset('resources/views/home/newWeb/img/wechat.svg')}}" alt=""></li>
                <li><a href="https://site.douban.com/234332/" target="_blank"><img src="{{asset('resources/views/home/newWeb/img/douban.svg')}}" alt=""></a></li>
                <li><a href="http://weibo.com/p/1006062763209230/home?from=page_100606&amp;mod=TAB&amp;is_all=1" target="_blank"><img src="{{asset('resources/views/home/newWeb/img/sina.svg')}}" alt=""></a></li>
            </ul>
            <div class="clearfix"></div>
        </div>
        <div class="artList">
            <ul>
            @foreach($datas as $d)
                <li>
                    <a href="{{url('/share/article/'.$d->art_id)}}"><img src="{{$d->art_thumb}}" alt=""></a>
                    <h3>{{$d->art_title}}</h3>
                    <p>{{$d->art_description}}</p>
                </li>
               @endforeach
                
            </ul>
            <div class="clearfix"></div>
        </div>
        <a href="#header"><button class="downBtn">下载飞地App阅读更多</button></a>
    </div>
    <footer class="foot">
        <div class="footTop">
            <div class="introduce">
                <img src="{{asset('resources/views/home/newWeb/img/logo_black.svg')}}" alt="">
                <p>飞地传媒为致力于推广与传播诗歌艺术的独立文化品牌。飞地（Enclave）源自人文地理术语，意在喻指当代思想、精神之领土与净地。飞地以独立、开放、前瞻的姿态，专注于对诗歌、艺术等文化形态的深度梳理、纪录传播，藉此构建与守护我们共有的人文领地。</p>
                <div class="contact">
                    <span class="tel">+86 0755-2290 2869</span>
                    <span class="email">contact@enclavelit.com</span>
                    <span class="address">深圳市福田区园岭街道八卦岭工业区423栋6楼东01-12</span>
                </div>
            </div>
            <div class="brand sorts">
                <h3>品牌</h3>

                    <li><a href="http://weidian.com/?userid=317474198" target="_blank">飞地书局</a></li>
                    <li><a href="http://www.lizhi.fm/1423296/" target="_blank">声音馆</a></li>
                    <li><a href="http://weidian.com/?userid=317474198" target="_blank">丛刊</a></li>
                </ul>
            </div>
            <div class="application sorts">
                <h3>App</h3>
                <ul>
                    <li><a href="https://www.enclavemedia.cn/l">活动</a></li>
                    <li><a href="https://www.lagou.com/gongsi/133764.html">招聘</a></li>
                    <li><a href="https://www.enclavemedia.cn/">商务合作</a></li>

                </ul>
            </div>
        </div>
        <div class="footBottom">
            <div class="link">     
            <a href="http://www.hinabook.com/"  target="_blank">后浪</a>
            <a href="http://www.poemlife.com/"  target="_blank">诗生活网</a>
                        <a href="http://www.szwriter.com/"  target="_blank">深圳作协</a>
                        </div>
            <div class="copyRight">粤ICP备16106448号-1  &nbsp;&nbsp;<img src="{{asset('resources/views/home/newWeb/img/ba.png')}}" alt="" style="width: 20px;height: 20px;"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030402000516"  target="_blank">粤公网安备 44030402000516号</a></div>
        </div>
    </footer>
    <script src="{{asset('resources/views/home/newWeb/js/main.js')}}"></script>
    <script>
        window.onresize = function() {
              resizeLoad();
        }
    </script>
</body>

</html>
