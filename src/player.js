/**
* mini html5 video player
*/
function Player(elem,options){
    this.elem = typeof elem == 'object' ? elem : document.getElementById(elem);
    this.src = options.src;
    if(!this.src){
        throw new Error('require video src');
        return;
    }
    for(var key in options){
        this[key] = options[key];
    }
    this.init();
}

Player.prototype.init = function(){
    this.createPlayer();
    var that = this;
    setTimeout(function(){
        that.createControl();
        that.attachEvents();
    },10);
}

Player.prototype.createPlayer = function(){
    this.player = document.createElement('video');
    this.player.setAttribute('class','min-video-js');
    this.player.src = this.src;
    this.elem.appendChild(this.player);
}

Player.prototype.createControl = function(){
    this.control = document.createElement('div');
    this.control.setAttribute('class','min-video-js-control');
    var inner = [];
    inner.push('<span class="min-video-js-control-playBtn"></span>');
    this.progressWidth = (parseInt(this.player.clientWidth) - 55) + 'px'; 
    inner.push('<div class="min-video-js-control-progress" style="width:'+this.progressWidth+'"><div></div><span>0s/'+parseInt(this.player.duration)+'s<span></div>')
    this.control.innerHTML = inner.join('');
    this.elem.appendChild(this.control);
}

Player.prototype.updateProgressBar = function(current,total,percent){
    console.log(percent);
    var currentPOS = percent*(parseInt(this.progressWidth));
    console.log(currentPOS);
    document.querySelector(".min-video-js-control-progress > span").innerHTML = parseInt(current)+"s/"+parseInt(total)+"s";
    document.querySelector(".min-video-js-control-progress > div").style.width = currentPOS + 'px';
}
Player.prototype.attachEvents = function(){
    var that = this;
    this.player.addEventListener('loadedmetadata',function(){
        console.log(this.duration);
        console.log(this.buffered);
    });
    this.player.addEventListener('timeupdate',function(){
        //console.log(that.player.played.start(0));
        if(that.player.played.length > 0){
            that.updateProgressBar(that.player.played.end(0),that.player.duration,that.player.played.end(0)/that.player.duration);
        }
        //console.log(that.player.played.end(0));
    });
    this.control.addEventListener('click', function(){
        if(that.player.paused){
            that.player.play();
        }else{
            that.player.pause();
        }
    });
}