import React, { useState, useEffect } from 'react';

const ShowSchools = () => {
    const [schools, setSchools] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/getSchools');
                if (response.ok) {
                    const data = await response.json();
                    setSchools(data);
                }
            } catch (error) {
                console.error('Error fetching schools:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {schools.map((school) => (
                <div key={school.id}>
                    <img src={`schoolImages/${school.image}`} alt={school.name} />
                    <p>{school.name}</p>
                    <p>{school.address}</p>
                    <p>{school.city}</p>
                </div>
            ))}
        </div>
    );
};
export default ShowSchools;