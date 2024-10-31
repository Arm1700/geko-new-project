import React, {createContext, useEffect, useState} from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [certificate, setCertificate] = useState([]);
    const [events, setEvents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesResponse, certificatesResponse, eventsResponse] = await Promise.all([
                    fetch("https://grandstage.gekoeducation.com/api/courses/"),
                    fetch("https://grandstage.gekoeducation.com/api/certificate"),
                    fetch("https://grandstage.gekoeducation.com/api/events")
                ]);

                if (!coursesResponse.ok) {
                    throw new Error(`Error fetching courses: ${coursesResponse.statusText}`);
                }

                if (!certificatesResponse.ok) {
                    throw new Error(`Error fetching certificates: ${certificatesResponse.statusText}`);
                }


                if (!certificatesResponse.ok) {
                    throw new Error(`Error fetching events: ${eventsResponse.statusText}`);
                }

                const coursesData = await coursesResponse.json();
                const certificatesData = await certificatesResponse.json();
                const eventsData = await eventsResponse.json();

                // Сохраняем данные в localStorage
                localStorage.setItem('courses', JSON.stringify(coursesData));
                localStorage.setItem('certificates', JSON.stringify(certificatesData));
                localStorage.setItem('events', JSON.stringify(eventsData));

                setCourses(coursesData);
                setCertificate(certificatesData);
                setEvents(eventsData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        // Запускаем загрузку данных только если их нет в localStorage
        const savedCourses = localStorage.getItem('courses');
        const savedCertificates = localStorage.getItem('certificates');
        const savedEvents = localStorage.getItem('events');

        if (!savedCourses || !savedCertificates) {
            fetchData();
        } else {
            setCourses(JSON.parse(savedCourses));
            setCertificate(JSON.parse(savedCertificates));
            setEvents(JSON.parse(savedEvents));
            setLoading(false);
        }
    }, []);

    const getCourseById = (id) => {
        return courses.find(course => course.id === parseInt(id));
    };
    const getEventById = (id) => {
        return events.find(event => event.id === parseInt(id));
    };
    return (
        <DataContext.Provider value={{courses, getCourseById, getEventById, events, certificate, loading, error}}>
            {children}
        </DataContext.Provider>
    );
};
