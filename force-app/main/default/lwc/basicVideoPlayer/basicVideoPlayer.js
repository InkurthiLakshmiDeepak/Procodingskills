import { LightningElement,api } from 'lwc';

export default class BasicVideoPlayer extends LightningElement {
    @api videoUrl="https://www.w3schools.com/tags/movie.mp4";

    @api
    get isPlaying() {
        const player = this.template.querySelector('video');
        return player !== null && player.paused === false;
    }

    @api
    play() {
        const player = this.template.querySelector('video');
         if (player) {
            player.play();
        }
    }

    @api
    pause() {
        const player = this.template.querySelector('video');
        if (player) {
             player.pause();
        }
    }

}