import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const useFirestore = (collectionName, conditions = []) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ref = collection(db, collectionName);
                let q = query(ref);

                if (conditions.length > 0) {
                    const constraints = conditions.map(c => where(c.field, c.op, c.value));
                    q = query(ref, ...constraints);
                }

                const snapshot = await getDocs(q);
                const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setData(results);
            } catch (err) {
                console.error("Error fetching Firestore data:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [collectionName, JSON.stringify(conditions)]);

    return { data, loading, error };
};
