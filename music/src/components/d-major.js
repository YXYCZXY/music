import {dom} from './utils.js'

export default class Dmusic{
    constructor (options){
        let defaultOptions = {
            //音乐append的元素
            ele:'#d-audio',
            //音乐封面
            imageurl:'http://www.daiwei.org/sunmmer.jpg',
            //音乐地址
            src:'',
            //音乐名字
            name:'',
            //音乐歌手
            singer:'',
            // 是否显示进度信息
            showprogress:true,
            // ''就是默认状态,cricle则是初始化就是圆
            initstate:'',
            // 是否循环、
            loop:false,
            // 音乐播放结束事件，可设置播放下一首音乐
            ended:() => {},
            // 音乐下一首的点击事件触发，需要配合checkAudio体现切歌的效果
            next:() => {}
        }

        // 判断是否存在id
        if(document.getElementById('d-major-content')){
            console.error('you have already init d-major, do not init again');
            return
        }

        // Object.assign合并（）中的
        this.opt = Object.assign(defaultOptions,options)
        // 判断传进来的是DOM还是字符串
        if(typeof this.opt.ele === 'string'){
            // querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
            this.opt.ele = document.querySelector(this.opt.ele)
        }

        // 初始化一些内部设置
        this.loading = false
        this.isplaying = false
        this.progress = 0
        this.height = this.opt.ele.offsetHeight || 50
        this.duration = 0
        this.currentTime = 0
        this.defaultimg = 'http://www.daiwei.org/sunmmer.jpg'

        // 需要的元素
        this.dom = {
        cricleImage: null,
        playPause: null,
        next: null,
        majorTitle: null,
        majorSinger: null,
        }

        // 初始化audio   // 拿到各个元素
        this.initAudio()
        this.initEvent()
    }

    //初始化元素
    initAudio(){
        let d = this.dom
        //major-content  矩形框
         //.createElement()方法 创建一个div className命名
         d.majorContent = document.createElement('div')
         if(this.opt.initstate === 'cricle'){
             d.majorContent.className = 'major-content' + this.opt.initstate
            //  这样才能成一个圆
            d.majorContent.style.width = this.height + 'px'
         }else{
             d.majorContent.className = 'major-content'
         }
        //setAttribute() 创建一个属性 id 
        d.audioContent.setAttribute('id', 'd-major-content')
        this.opt.ele.appendChild(d.audioContent)

        //major-cricle
        d.majorCricle = document.createElement('div')
        d.majorCricle.className = 'major-cricle'
        d.majorCricle.title = this.opt.name + '-' this.opt.singer
        d.majorCricle.innerHTML = `<img id="d-major-cricleImage" src=${this.opt.imageurl || this.defaultimg}>`
        d.majorCricle.style.cssText = `width: ${this.height}px; height: ${this.height}px;`
        d.majorContent.appendChild(d.majorCricle)

        // d-major-cricle-range
        d.majorCricleRange = document.createElement('div')
        d.majorCricleRange.className = 'd-major-cricle-range'
        d.majorCricle.appendChild(d.majorCricleRange)

        this.initDomInfo()
    }

     // 将初始化需呀使用的元素放到this.dom中方便使用
     initDomInfo () {
        this.dom.cricleImage = document.getElementById('d-major-cricleImage')
        this.dom.playPause = document.getElementById('d-major-playPause')
        this.dom.next = document.getElementById('d-major-next')
        this.dom.majorTitle = document.getElementById('d-major-majorTitle')
        this.dom.majorSinger = document.getElementById('d-major-majorSinger')
  }
}