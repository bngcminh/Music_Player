const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const player = $('.player');
const cd = $('.cd');
const header = $('header h2');
const cdThumb = $('.cd-thumb');
const audio = $('#audio');
const playList = $('.playlist');
const playBtn = $('.btn.btn-toggle-play')
const nextBtn = $('.btn.btn-next')
const prevBtn = $('.btn.btn-prev');
const repeatBtn = $('.btn.btn-repeat');
const randomBtn = $('.btn.btn-random');
const progress = $('.progress');

const music = {
    currentIndex: 0,
    isPlaying: false,
    isRepeat: false,
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
            path: '../public/music/Metal Gear Rising- Revengeance Soundtrack - 09. A Soul Can\'t Be Cut (Platinum Mix).mp3', 
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

    // Hàm hiển thị danh sách bài hát 
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

    // Hàm định nghĩa
    defineProperties: function(){
        Object.defineProperty(this,'currentSong', {
            get: function(){
                return this.song[this.currentIndex];
            }
        })
    },

    // Hàm xử lý các sự kiện
    handleEvents: function(){
        // Hàm điều chỉnh kích cỡ CD
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? cdWidth - scrollTop + 'px' : 0;
            cd.style.opacity = newCdWidth / cdWidth;
        }

        // Hàm tạo animation cho CD
        const cdAnimation = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdAnimation.pause();
        // console.log(cdAnimation)

        // Hàm xử lý bật tắt bài hát
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
            cdAnimation.play();
        }

        audio.onpause = function(){
            _this.isPlaying = false;
            player.classList.remove('playing');
            cdAnimation.pause();
        }

        // Hàm xử lý tua bài hát
        audio.ontimeupdate = function(){
            if(audio.duration){
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100);
                progress.value = progressPercent; 
            }
            // console.log(audio.currentTime);
            // console.log(audio.duration);
        }
        progress.oninput = function(){
            if(audio.duration){
                const seekTime = (audio.duration / 100 * progress.value);
                audio.currentTime = seekTime;
            }
        }

        // Hàm xử lý chuyển tiếp bài hát sau khi chạy hết bài
        audio.onended = function(){
            // console.log('end');
            _this.currentIndex++
            if(_this.currentIndex >= _this.song.length){
                _this.currentIndex = 0;
            } 
            _this.loadCurrentSong();
            audio.play();
        } 

        // Hàm xử lý chuyển tiếp và lùi bài hát
        nextBtn.onclick = function(){
            _this.currentIndex++;
            // console.log('Gia tri cua index: ', _this.currentIndex);
            // console.log('Do dai cua mang song: ', _this.song.length);
            if(_this.currentIndex >= _this.song.length){
                _this.currentIndex = 0;
            }
            _this.loadCurrentSong();
            audio.play();
        }

        prevBtn.onclick = function(){
            _this.currentIndex--;
            // console.log('Gia tri cua index: ', _this.currentIndex);
            // console.log('Do dai cua mang song: ', _this.song.length);
            if(_this.currentIndex < 0){
                _this.currentIndex = _this.song.length - 1;
                // console.log('Gia tri cua index: ', _this.currentIndex);
            }
            _this.loadCurrentSong();
            audio.play();
        }

        // Hàm xử lý lặp bài hát
        randomBtn.onclick = function(){
            audio.onended = function(){
                if(is)
            }
        }

        // Hàm xử lý chuyển bài hát ngẫu nhiên
    },

    

    // Hàm tải và hiển thị bài hát đầu tiên 
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