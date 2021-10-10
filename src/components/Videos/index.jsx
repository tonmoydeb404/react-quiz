import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import useVideoList from '../../hooks/useVideoList';
import Classes from '../../styles/Videos.module.css';
import Video from './Video';

const Videos = () => {
    const [page, setPage] = useState(1);
    const { error, loading, hasMore, videos } = useVideoList(page);

    return (
        <InfiniteScroll dataLength={videos.length} hasMore={hasMore} next={() => setPage(page + 8)}>
            <div className={Classes.videos}>
                {videos.length > 0 &&
                    videos.map((v) =>
                        v.noq ? (
                            <Link
                                to={{
                                    pathname: `/quiz/${v.youtubeID}`,
                                    state: { videoTitle: v.title },
                                }}
                                key={v.youtubeID}
                            >
                                <Video id={v.youtubeID} noq={v.noq} title={v.title} />
                            </Link>
                        ) : (
                            <Video key={v.youtubeID} id={v.youtubeID} noq={v.noq} title={v.title} />
                        )
                    )}

                {!loading && videos.length === 0 && <div>No Data Found</div>}
                {error && <div>There was an error</div>}
                {loading && <div>Data is loading...</div>}
            </div>
        </InfiniteScroll>
    );
};

export default Videos;
