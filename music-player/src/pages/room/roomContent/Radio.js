import { useReducer, useRef, useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import axios from "axios";
import "./Radio.scss";
import {Layout} from "antd";
import {SoundFilled, SoundOutlined} from '@ant-design/icons';

// Idea from https://blog.csdn.net/sinat_39013092/article/details/121352204 (In Chinese).

const cookie = `MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/feedback;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/feedback;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/feedback;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/openapi/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/feedback;;MUSIC_U=68879b246ef892676efd49ceb5b473380f50b79ae78fdcd7133ff7c4b1b89eed519e07624a9f005380ecdbe3ebbb91cf3d7f23ebde55f4357f37683f98f232b2b9dca67e059c307b7a561ba977ae766d; Max-Age=1296000; Expires=Wed, 11 May 2022 06:01:43 GMT; Path=/;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/openapi/clientlog;;MUSIC_SNS=; Max-Age=0; Expires=Tue, 26 Apr 2022 06:01:43 GMT; Path=/;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/eapi/feedback;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/neapi/feedback;;__remember_me=true; Max-Age=1296000; Expires=Wed, 11 May 2022 06:01:43 GMT; Path=/;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/api/clientlog;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/wapi/clientlog;;MUSIC_R_T=1650952748082; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/clientlog;;__csrf=e637cd5008c57017112351f558d3af11; Max-Age=1296010; Expires=Wed, 11 May 2022 06:01:53 GMT; Path=/;;MUSIC_A_T=1650952747956; Max-Age=2147483647; Expires=Sun, 14 May 2090 09:15:50 GMT; Path=/weapi/clientlog;`;

function musicListReducer(state, action) {
    switch (action.type) {
        case 'shift':
            // Move played song to back of the list.
            return action.data.concat(state.slice(2), [state[0]]);
        case 'init':
            // Set first song to be the current song playing in radio.
            return action.data.playlist.slice(action.data.index).concat(action.data.playlist.slice(0, action.data.index))
        default:
            throw new Error("Error");
    }
}

async function getMusicUrl(id) {
    // Get music url from netease API.
    const promise = await axios({
        method: 'get',
        url: 'https://netease-cloud-music-bn6p2obor-adamliu327.vercel.app/song/url?id=' + id + '&cookie=' + cookie,
    })
    return promise.data.data[0].url;
}

const MyRadio = forwardRef((props, ref) => {
    const { Content } = Layout;
    // Playing status.
    const [playing, setPlaying] = useState(false);
    const [firstClicked, setFirstClicked] = useState(false);
    const aRef = useRef(null);
    const [musicList, setMusicList] = useReducer(musicListReducer, [])

    async function setMusic(data) {
        if (firstClicked === false) {
            data.playlist[data.index].url = await getMusicUrl(data.playlist[data.index].id);
            setMusicList({type: 'init', data: data})
        }
    }

    // Run when song ends.
    useEffect(() => {
        aRef.current.onended = async () => {
            // Switch to next song.
            const nextSong = await musicList[1];
            const song = [{
                name: nextSong.name,
                artists: nextSong.artists,
                id: nextSong.id,
                albumUrl: nextSong.albumUrl,
                duration: nextSong.duration,
                url: await getMusicUrl(nextSong.id)
            }]
            setMusicList({type: 'shift', data: song});
        }
    }, [musicList])

    function setCurrentTime(sec) {
        // Set music current from api.
        aRef.current.currentTime = sec;
    }

    function switchPlaying() {
        if (firstClicked === false) {
            // First time clicked, get the radio process and playlist from backend.
            setFirstClicked(true)
            axios({
                method: 'get',
                url: 'http://127.0.0.1:3001/api/radio/getRadioProcess',
            }).then(function (response) {
                const data = response.data;
                setMusic(data);
                setCurrentTime(data.current);
                // Start playing.
                aRef.current.play();
            })
        }
        // Switch muted status.
        setPlaying(!playing);
    }

    return (
        <div>
            <Layout className="main-container">
                <Content className="cover-container">
                    <div>
                        <img className="cover-img" src={musicList[0]?.albumUrl } onerror="this.style.display='none'"/>
                    </div>
                    <p className="cover-text">Currently Playing {playing ? '...' : '(muted)'}</p>
                    <audio style={{display: 'none'}} src={musicList[0]?.url} ref={aRef} autoPlay muted={!playing}></audio>
                    <p className="song-info">{musicList[0]?.name}</p>
                    <p className="artist-info">
                        {musicList[0]?.artists.map((value, key) => [
                            key > 0 && ", ",
                            value
                        ])}
                    </p>
                    <p onClick={switchPlaying}>
                        {playing ? 
                            <div><SoundFilled className='button'/><span className='mute-text'>Mute</span></div> :
                            <div><SoundOutlined className='button'/><span className='mute-text'>Unmute</span></div>}
                    </p>
                </Content>
            </Layout>
        </div>

    )
});

export default MyRadio
