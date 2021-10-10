import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

const useQuestion = (id) => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [question, setQuestion] = useState([]);

    useEffect(() => {
        const db = getDatabase();
        const questionRef = ref(db, `quiz/${id}/questions`);
        const questionQuery = query(questionRef, orderByKey());

        const fetchVideos = async () => {
            try {
                setError(false);
                setLoading(true);

                // REQUEST TO FIREBASE DATABASE
                const snapshot = await get(questionQuery);
                setLoading(false);

                if (snapshot.exists()) {
                    setQuestion((prevQuestion) => [
                        ...prevQuestion,
                        ...Object.values(snapshot.val()),
                    ]);
                }
            } catch (err) {
                console.log(err);
                setError(true);
                setLoading(false);
            }
        };

        fetchVideos();
    }, [id]);

    return { error, loading, question };
};

export default useQuestion;
