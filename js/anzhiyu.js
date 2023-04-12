var navMusicEl = document.getElementById("nav-music");
var anzhiyu = {
    // 音乐节目切换背景
    changeMusicBg: function (isChangeBg = true) {
      if (window.location.pathname != "/music/") {
        return;
      }
      const anMusicBg = document.getElementById("an_music_bg")
  
      if (isChangeBg) {
        // player listswitch 会进入此处
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      } else {
        // 第一次进入，绑定事件，改背景
        let timer = setInterval(()=>{
          const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
          // 确保player加载完成
          console.info(anMusicBg);
          if (musiccover) {
            clearInterval(timer)
            anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
            // 绑定事件
            anzhiyu.addEventListenerChangeMusicBg();
            
            // 暂停nav的音乐
            if (document.querySelector("#nav-music meting-js").aplayer && !document.querySelector("#nav-music meting-js").aplayer.audio.paused){
              anzhiyu.musicToggle()
            }
          }
        }, 100)
      }
    },
    addEventListenerChangeMusicBg: function () {
      const anMusicPage = document.getElementById("anMusic-page");
      const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
  
      anMusicPage.querySelector("meting-js").aplayer.on('loadeddata', function () {
        anzhiyu.changeMusicBg();
        console.info('player loadeddata');
      });
  
      aplayerIconMenu.addEventListener("click", function () {
        document.getElementById('menu-mask').style.display = "block";
        document.getElementById('menu-mask').style.animation = "0.5s ease 0s 1 normal none running to_show";
      })
  
      document.getElementById('menu-mask').addEventListener("click", function () {
        if (window.location.pathname != "/music/") return;
        anMusicPage.querySelector('.aplayer-list').classList.remove("aplayer-list-hide");
      })
    },
     //切换音乐播放状态
    musicToggle: function (changePaly = true) {
      if (!anzhiyu_musicFirst) {
        musicBindEvent();
        anzhiyu_musicFirst = true;
      }
      let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>'; // 此处可以更改为你想要显示的文字
      let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>'; // 同上，但两处均不建议更改
      if (anzhiyu_musicPlaying) {
        navMusicEl.classList.remove("playing");
      }
    }
  }
  
  // 调用
  anzhiyu.changeMusicBg(false);