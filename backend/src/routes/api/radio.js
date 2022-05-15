const express = require('express');
const axios = require('axios')

// Idea from https://blog.csdn.net/sinat_39013092/article/details/121352204 (In Chinese).

const router = express.Router();

let playList = [];
let process_s = 0; // Process of song in second.
let song_index = 0; // Index of current song playing.

function getSongs() {
    // Get all songs from playlist 60198 (Billboard)
    axios({
        method: 'get',
        url: 'https://netease-cloud-music-api-lime-zeta.vercel.app/playlist/detail?id=60198',
    })
        .then(function (response) {
            const playlistIdList = [];

            // Get all the song ids for getting all song details.
            response.data.privileges.map((value) => {
                playlistIdList.push(value.id);
            });

            axios({
                method: 'get',
                url: 'https://netease-cloud-music-api-lime-zeta.vercel.app/song/detail?ids=' + playlistIdList.join(',')
            }).then(function (res) {
                // Push all songs into playlist.
                res.data.songs.map((value) => {
                    pushMusic(value);
                });
                console.log("Playlist generated");
                calculateRadioProcess();
            });
        });
}

function pushMusic(value) {
    const aList = [] // Artist list
    value.ar.map(function(value) {
        aList.push(value.name)
    });

    if (value.fee !== 1) {
        // Remove VIP only songs.
        playList.push({
            name: value.name,
            artists: aList,
            id: value.id,
            albumUrl: value.al.picUrl,
            duration: Math.round(value.dt / 1000)
        })
    }
}

function calculateRadioProcess() {
    // Run every one second to add 1 to process_s or switch to another song.
    setInterval(() => {
        if (process_s > playList[song_index].duration) {
            // If song index reach the end, reset index to 0.
            song_index = song_index + 1 >= playList.length ? 0 : song_index + 1
            process_s = 0
        } else {
            process_s += 1
        }
    }, 1000)
}

router.get("/getRadioProcess", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Returns current radio process.
    res.json({
        playlist: playList,
        current: process_s,
        index: song_index
    })
})

getSongs();

export default router;
