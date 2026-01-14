const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const header = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playList = $('.playlist');
const playBtn = $('.btn.btn-toggle-play')

const music = {
    currentIndex: 0,
    isPlaying: false,
    song: [
        {
            name: 'A Stranger I Remain',
            singer: 'Platinum Mix',
            path: '../public/music/Metal Gear Rising - A Stranger I Remain (Original + Platinum Mix Combination) + Lyrics.mp3', 
            img: '../public/img/Tachyon.jpg'
        },
        {
            name: 'A Soul Can"t Be Cut',
            singer: 'Platinum Mix',
            path: '../public/music/Metal Gear Rising- Revengeance Soundtrack - 09. A Soul Can"t Be Cut (Platinum Mix).mp3', 
            img: '../public/img/Tachyon.jpg'
        },
        {
            name: 'Collective Consciousness',
            singer: 'Platinum Mix',
            path: '../public/music/Metal Gear Rising- Revengeance Soundtrack - 10. Collective Consciousness (Maniac Agenda Mix).mp3', 
            img: '../public/img/Tachyon.jpg'
        },
        {
            name: 'It Has to Be This Way',
            singer: 'Platinum Mix',
            path: '../public/music/Metal Gear Rising- Revengeance Soundtrack - 11. It Has to Be This Way (Platinum Mix).mp3', 
            img: '../public/img/Tachyon.jpg'
        },
        {
            name: 'The War Still Rages Within',
            singer: 'Platinum Mix',
            path: '../public/music/Metal Gear Rising- Revengeance Soundtrack - 12. The War Still Rages Within.mp3', 
            img: '../public/img/Tachyon.jpg'
        },
    ],

    // handle render playlist
    render: function(){
        var html = this.song.map(function(list){
            return `
                <div class="song">
                    <div class="thumb" style="background-image: url('${list.img}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${list.name}</h3>
                        <p class="author">${list.singer}</p>
                    </div>
                    <div class="option">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
            `
        })
        playList.innerHTML = html.join('');
    },

    defineProperties: function(){
        Object.defineProperty(this,'currentSong', {
            get: function(){
                return this.song[this.currentIndex];
            }
        })
    },

    // handle event
    handleEvents: function(){
        // Handle CD size
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? cdWidth - scrollTop + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Handle play-pause song
        const _this = this;
        
        playBtn.onclick = function(){
            if(_this.isPlaying){
                audio.pause();
            }else{
                audio.play();
            }
        }
        audio.onplay = function(){
            _this.isPlaying = true;
            player.classList.add('playing');
        }

        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
        }
    },

    loadCurrentSong: function(){
        header.innerText = this.currentSong.name;
        cdThumb.style.backgroundImage = `url('${this.currentSong.img}')`;
        audio.src = this.currentSong.path; 
    },

    start: function(){
        this.handleEvents();
        this.defineProperties();
        this.loadCurrentSong();
        this.render();
    },
}

music.start();