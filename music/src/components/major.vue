<template>
    <major class="main_major">
        <div id="d-major">
            <div id="test" class="cricle" @click="change">
                <div class="left-config" id="left" style="display:none">
                    <i id="d-major-playPause"  class="play icon-play" @click="start" > </i>
                    <i id="d-major-next" class="next icon-next" @click="next"></i>
                </div>
                <div class="right-info" id="right" @click="cg_ce" style="display:none"  >
                    <h3 id="d-audio-audioTitle" class="m-title"></h3>
                    <p id="d-audio-audioSinger" class="m-singer"></p>
                </div>
                <div class="audio-progress" id="bouttom" style="display:none"></div>
            </div>
        </div>
    </major>
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            isContent:false,
            playInfo:{},
            playAudio:{},
            nextInfo:{},
            nextFunction:{},
            playType:true,
            bgColor:{}
        }
    },
    created() {
        this.document.getElementById('left').style.display = 'none';
    },
    methods: {
        // 图案改变
        change:function(e) {
            // console.log(e)
            // e就是点击后获取的东西
            let pause = document.getElementById('d-major-playPause');
            let next = document.getElementById('d-major-next');

            if (document.getElementById('test').className == 'cricle'){
                document.getElementById('test').className = 'content';
                document.getElementById('left').style.display = 'block';
                document.getElementById('right').style.display = 'block';
                document.getElementById('bouttom').style.display = 'block';
                let bgImg = this.bgColor
                document.getElementById('test').style.cssText =`background:rgba(${bgImg.r},${bgImg.g},${bgImg.b},1);`
            }else if (e.target != pause && e.target != next) {
                document.getElementById('test').className = 'cricle';
                document.getElementById('left').style.display = 'none';
                document.getElementById('right').style.display = 'none';
                document.getElementById('bouttom').style.display = 'none';
                let bgImg = this.nextInfo
                document.getElementById('test').style.cssText = `background-image: url("${bgImg.imageurl}");background-size: cover;background-position: center;`
            }
        },
        // 开始
         start(){
            //用来判断播放暂停
             if(this.playType == false){
                 this.playAudio.play()
                 document.getElementById('d-major-playPause').className = 'play icon-pause'
                 this.playType = true
             }else{
                if(document.getElementById('d-major-playPause').className == 'play icon-play'){
                document.getElementById('d-major-playPause').className = 'play icon-pause'
                axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=playlist&id=2179377798').then((res)=>{
                let music = res.data.playlist.tracks
                /*
                Math.floor(Math.random() * music.length)
                Math.random() * music.length --> 产生[0,music.length)的数
                Math.floor()则会取整 把取得的赋给index
                */
                let index = Math.floor(Math.random() * music.length)
                axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id='+ music[index].id).then((res)=>{
                    let d = {
                        src: res.data.data[0].url,
                        imageurl: music[index].al.picUrl + '?param=300y300',
                        name: music[index].name,
                        singer: music[index].ar[0].name
                    }
                    this.playInfo = d
                    this.srcImage = this.playInfo.imageurl
                    this.bgImg()
                    // console.log('src',d.src)
                    // console.log('img', d.imageurl)
                    // console.log('name', d.name)
                    // console.log('singer', d.singer)
                    let h3 = document.getElementById('d-audio-audioTitle')
                    h3.innerHTML = `${d.name}`
                    let p = document.getElementById('d-audio-audioSinger')
                    p.innerHTML = `${d.singer}`
                    var Audio = document.createElement('audio')
                    Audio.setAttribute('src',this.playInfo.src)
                    Audio.setAttribute('id','audio')
                    document.getElementById('test').appendChild(Audio)
                    this.playAudio = Audio
                    Audio.play()
                    this.sendTimer = setInterval(()=>{
                       if(document.getElementById('audio').ended == true){
                           this.nextPlay()
                       }
                       this.playTime()
                   },1000)
                })
            },(err)=>{
                console.log(err)
            })
                }else{
                    document.getElementById('d-major-playPause').className = 'play icon-play'
                    this.playAudio.pause()
                    this.playType = false
                }
            }
        },
        // 下一曲
        next (){
            if( document.getElementById('d-major-playPause').className == 'play icon-pause'){
                document.getElementById('d-major-playPause').className = 'play icon-pause'
            }else{
                 document.getElementById('d-major-playPause').className = 'play icon-pause'
            }
            this.nextPlay()
            this.playType = true
        },
        nextMusic(){
            this.nextPlay()
        },

        // 下一首歌曲 axios
        nextPlay(){
            axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=playlist&id=2179377798').then((res)=>{
                let music = res.data.playlist.tracks
                /*
                Math.floor(Math.random() * music.length)
                Math.random() * music.length --> 产生[0,music.length)的数
                Math.floor()则会取整 把取得的赋给index
                */
                let index = Math.floor(Math.random() * music.length+1)
                this.playMusic = music
                axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id='+ music[index].id).then((res)=>{
                    index = Math.floor(Math.random() * music.length)
                    axios.get('http://www.daiwei.org/vue/server/music.php?inAjax=1&do=musicInfo&id=' + music[index].id).then((res) => {
                        let info = {
                            src: res.data.data[0].url,
                            imageurl: music[index].al.picUrl + '?param=300y300',
                            name: music[index].name,
                            singer: music[index].ar[0].name
                        }
                        this.nextInfo = info
                        this.srcImage = this.nextInfo.imageurl
                        let h3 = document.getElementById('d-audio-audioTitle')
                        h3.innerHTML = `${info.name}`
                        let p = document.getElementById('d-audio-audioSinger')
                        p.innerHTML = `${info.singer}`
                        let nextAudio = document.getElementById('audio')
                        nextAudio.setAttribute('src',this.nextInfo.src)
                        nextAudio.play()
                        this.bgImg()
                    }, (err) => {
                        console.log(err)
                    })
                })
            },(err)=>{
                console.log(err)
            })
        },
        //播放时间进度条
        playTime(){
            let now = parseInt(document.getElementById('audio').currentTime)
            let total = parseInt(document.getElementById('audio').duration)
            let wh = parseInt((now/total)*100) + '%'
            document.getElementById('bouttom').style.cssText = `width:${wh}`
        },
        //获取背景图片颜色
        bgImg(){
            let _this = this
            let cas = document.createElement('canvas')
            cas.setAttribute('id','canvas')
            document.getElementById('test').appendChild(cas)
            let img = new Image()
            if(this.srcImage == this.playInfo.imageurl){
                img.src = this.playInfo.imageurl
            }else if(this.srcImage == this.nextInfo.imageurl){
                img.src = this.nextInfo.imageurl
            }
            img.crossOrigin = "Anonymous"
            let canvas = document.getElementById('canvas')
            let ctx = canvas.getContext('2d');
            document.getElementById('canvas').style.display = 'none';
            img.onload = function() {
                // 在canvas上画图片
                ctx.drawImage(img, 10, 10);
            function getImageColor() {
                canvas.width = img.width;
                canvas.height = img.height;
                var context = canvas.getContext("2d");
                context.drawImage(img, 10, 10);
            
                // 获取像素数据
                var data = context.getImageData(10, 10, img.width, img.height).data;
                let r = 0,
                    g = 0,
                    b = 0
                // 取所有像素的平均值
                for (var row = 0; row < img.height; row++) {
                    for (var col = 0; col < img.width; col++) {
                        r += data[((img.width * row) + col) * 4];
                        g += data[((img.width * row) + col) * 4 + 1];
                        b += data[((img.width * row) + col) * 4 + 2];
                    }
                }
            
                // 求取平均值
                r /= (img.width * img.height);
                g /= (img.width * img.height);
                b /= (img.width * img.height);
            
                // 将最终的值取整
                r = Math.round(r);
                g = Math.round(g);
                console.log('r,g,b',r,g,b)
                _this.bgColor = {
                    r,g,b
                }
                if(document.getElementById('test').className =='content' ){
                    document.getElementById('test').style.cssText =`background:rgba(${_this.bgColor.r},${_this.bgColor.g},${_this.bgColor.b},1);`
                }
            }
            getImageColor()
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
*{
    margin 0
    padding 0
}
@-webkit-keyframes rotation{
from {-webkit-transform: rotate(0deg);}
to {-webkit-transform: rotate(360deg);}
}

.cricle{
    margin:0 auto
    width 55px
    height 55px
    border: 3px solid rgba(14, 90, 80, 0.397);
    background-image: url("../assets/logo.png")
    background-repeat:no-repeat;
    background-size:100% 100%;
    -moz-background-size:100% 100%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    border-radius: 50%;
    position absolute
    top 292px
    left 47.4%
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite
    -o-animation: rotation 3s linear infinite;
    transition: all 2s;
    /*transition: height 1s;*/
}
    
.content
    margin:0 auto
    width: 240px;
    height: 55px;
    overflow: hidden;
    border-radius: 6px;
    font-family: 'PingFangSC-Regular', Arial, Helvetica, sans-serif;
    z-index: 5
    align-items: center;
    justify-content: center;
    visibility: visible;
    opacity: 1;
    position absolute
    top 292px
    left 41.2%
    transition: all 2s;
    background:rgba(0,0,0,0.6)
    .left-config
      float left
      display flex
      margin 0
      width 90px
      padding-left 5px
      padding-right 10px
      height: 100%;
      align-items: center;
      overflow: hidden;
      box-sizing: border-box;
      i{
          display block
          width 36px
          height 36px
          background rgba(0,0,0,0.5)
          border-radius 50%
          color rgba(255,255,255,0.8)
          text-align center
          line-height 36px
          font-size 22px
          cursor pointer
          z-index 100
          &.next{
              width 28px
              height 28px
              margin-left 10px
              line-height 28px
              font-size 10px
          }
          &:hover{
              background :rgba(0,0,0,1)
          }
      }
      #d-major-playPause{
          position absolute
          top 9.5px
      }
      .pause{
          position relative;
          top 10px
          left 5px
      }
      .next{
          position absolute
          left 40px
          top 15px
      }
    .right-info
        // float left  
        overflow:hidden
        width 135px
        height: 100%;
        padding-left 5px
        padding-right 5px
        visibility: visible;
        opacity: 1;
        display: flex;
        align-items: center
        justify-content: center
        flex-direction: column
        .m-title{
            background  linear-gradient(to bottom right, #FDD, #70d12f)
            font-size 20px
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            padding 1px 0
            font-weight 500
            text-overflow ellipsis
            overflow hidden
            white-space nowrap
            width 100%
            text-align center
            position relative
            top 6px
        }
        .m-singer{
            background  linear-gradient(to bottom right, #2fbec3, #FDD)
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight:bold
            padding: 1px 0;
            font-size: 15px;
            margin: 0;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
            text-align: center;
            position relative
            top 4px
        }
.audio-progress{
    position: absolute;
    left: 0;
    height: 2px;
    bottom: 0;
    width: 0px;
    // background-color:black
    background-image: linear-gradient(to right, rgba(255, 56, 56, 0.1) 30%, rgba(255, 56, 56, 0.6));
    transition: all 0.5s;
    z-index: 4;
}
</style>
