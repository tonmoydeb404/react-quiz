import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useAnswers = (id) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const answerRef = ref(db, `/answers/${id}/questions`);
        const answerQuery = query(answerRef, orderByKey());

        const fetchVideos = async () => {
            try {
                setError(false);
                setLoading(true);

                // REQUEST TO FIREBASE DATABASE
                const snapshot = await get(answerQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setAnswers((prevAnswers) => [...prevAnswers, ...Object.values(snapshot.val())]);
                }
            } catch (err) {
                console.log(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchVideos();
    }, [id]);

    return { error, loading, answers };
};

export default useAnswers;
