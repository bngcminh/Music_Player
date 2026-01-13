const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const music = {
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
        var playList = $('.playlist');
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

    // handle event
    handleEvents: function(){
        const cd = $('.cd');
        const cdWidth = cd.offsetWidth;
        document.onscroll = function(){
            const scrollTop = window.screenY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop;
            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0; 
        }
    },

    start: function(){
        this.handleEvents();
        this.render();
    },
}

music.start();