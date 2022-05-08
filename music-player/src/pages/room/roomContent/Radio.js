import { useReducer, useRef, useEffect, useImperativeHandle, useState } from "react";
import { forwardRef } from "react";
import axios from "axios";

function musicListReducer(state, action) {
    switch (action.type) {
        case 'shift':
            // Move played song to back of the list.
            return state.slice(1).concat([state[0]])
        case 'init':
            // Set first song to be the current song playing in radio.
            return action.data.playlist.slice(action.data.index).concat(action.data.playlist.slice(0, action.data.index))
        default:
            throw new Error("Error");
    }
}

const MyRadio = forwardRef((props, ref) => {
    // 音乐列表
    const [musicList, setMusicList] = useReducer(musicListReducer, [])

    function setMusic(data) {
        if (firstClicked === false) {
            setMusicList({type: 'init', data: data})
        } else {
            setMusicList({type: 'add', data: data})
        }
    }

    // Run when song ends.
    useEffect(() => {
        audioRef.current.onended = () => {
            // Switch to next song.
            setMusicList({type: 'shift'});
        }
    }, [])

    // Playing status.
    const [playing, setPlaying] = useState(false);
    const [firstClicked, setFirstClicked] = useState(false);
    const audioRef = useRef(null);

    function setCurrentTime(sec) {
        audioRef.current.currentTime = sec;
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
                audioRef.current.play();
            })
        }
        // Switch muted status.
        setPlaying(!playing);
    }

    return (
        <div>
            <img src={musicList[0]?.albumUrl} />
            <audio style={{display: 'none'}} src={musicList[0]?.url} ref={audioRef} autoPlay muted={!playing}></audio>
            <p>{musicList[0]?.name}</p>
            <p>
                {musicList[0]?.artists.map((value, key) => [
                    key > 0 && ", ",
                    value
                ])}
            </p>
            <button onClick={switchPlaying}>
                {playing ? <span>🔈</span> : <span>🔕</span>}
            </button>
        </div>

    )
});

export default MyRadio