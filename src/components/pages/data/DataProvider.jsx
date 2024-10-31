import React, { createContext, useEffect, useState } from "react";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [certificate, setCertificate] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesResponse, certificatesResponse] = await Promise.all([
                    fetch("https://grandstage.gekoeducation.com/api/courses/"),
                    fetch("https://grandstage.gekoeducation.com/api/certificate")
                ]);

                if (!coursesResponse.ok) {
                    throw new Error(`Error fetching courses: ${coursesResponse.statusText}`);
                }

                if (!certificatesResponse.ok) {
                    throw new Error(`Error fetching certificates: ${certificatesResponse.statusText}`);
                }

                const coursesData = await coursesResponse.json();
                const certificatesData = await certificatesResponse.json();

                // Сохраняем данные в localStorage
                localStorage.setItem('courses', JSON.stringify(coursesData));
                localStorage.setItem('certificates', JSON.stringify(certificatesData));

                setCourses(coursesData);
                setCertificate(certificatesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Запускаем загрузку данных только если их нет в localStorage
        const savedCourses = localStorage.getItem('courses');
        const savedCertificates = localStorage.getItem('certificates');

        if (!savedCourses || !savedCertificates) {
            fetchData();
        } else {
            setCourses(JSON.parse(savedCourses));
            setCertificate(JSON.parse(savedCertificates));
            setLoading(false);
        }
    }, []);

    const getCourseById = (id) => {
        return courses.find(course => course.id === parseInt(id));
    };

    return (
        <DataContext.Provider value={{ courses, getCourseById, certificate, loading, error }}>
            {children}
        </DataContext.Provider>
    );
};
