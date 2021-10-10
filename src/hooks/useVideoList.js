import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';
import { useEffect, useState } from 'react';

const useVideoList = (page) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const videosRef = ref(db, 'videos');
        const videoQuery = query(videosRef, orderByKey(), startAt(`${page}`), limitToFirst(8));

        const fetchVideos = async () => {
            try {
                setError(false);
                setLoading(true);

                // REQUEST TO FIREBASE DATABASE
                const snapshot = await get(videoQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setVideos((prevVideos) => [...prevVideos, ...Object.values(snapshot.val())]);
                } else {
                    setHasMore(false);
                }
            } catch (err) {
                console.log(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchVideos();
    }, [page]);

    return { error, loading, hasMore, videos };
};

export default useVideoList;
