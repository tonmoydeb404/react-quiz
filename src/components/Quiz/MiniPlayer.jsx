import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import Classes from '../../styles/MiniPlayer.module.css';

const MiniPlayer = ({ videoId, videoTitle }) => {
    const [play, setPlay] = useState(false);
    const miniPlayerRef = useRef();

    const togglePlayer = () => {
        if (play) {
            setPlay(false);
            miniPlayerRef.current.classList.add(Classes.floatingBtn);
        } else {
            setPlay(true);
            miniPlayerRef.current.classList.remove(Classes.floatingBtn);
        }
    };

    return (
        <div className={`${Classes.miniPlayer} ${Classes.floatingBtn}`} ref={miniPlayerRef}>
            <span
                className={`material-icons-outlined ${Classes.open}`}
                role="button"
                onClick={togglePlayer}
            >
                play_circle_filled
            </span>
            <span
                className={`material-icons-outlined ${Classes.close}`}
                role="button"
                onClick={togglePlayer}
            >
                close
            </span>

            <ReactPlayer
                className={Classes.player}
                width="300px"
                height="168px"
                controls
                playing={play}
                url={`https://youtube.com/watch?v=${videoId}`}
            />

            <p>{videoTitle || null}</p>
        </div>
    );
};

export default MiniPlayer;
