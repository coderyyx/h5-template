import React from 'react';
export default function VideoPlay(params) {
    return <video
                id="my-player"
                className="video-js"
                controls
                preload="auto"
                poster="//vjs.zencdn.net/v/oceans.png"
                data-setup='{}'>
            <source src="//vjs.zencdn.net/v/oceans.mp4" type="video/mp4"></source>
            <source src="//vjs.zencdn.net/v/oceans.webm" type="video/webm"></source>
            <source src="//vjs.zencdn.net/v/oceans.ogv" type="video/ogg"></source>
            <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider upgrading to a
                web browser that
                <a href="http://videojs.com/html5-video-support/" target="_blank">
                supports HTML5 video
                </a>
            </p>
            </video>
}