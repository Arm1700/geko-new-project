import ReactPaginate from 'react-paginate';
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from 'react';
import CoursesMenu from "./CoursesMenu";
import Course from "../shared/home/Course";

export default function Courses() {
    const [gridStyleTF, setGridStyle] = useState(true);
    const [coursesPerPage, setCoursesPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const [courses, setCourses] = useState([]);
    const [popularCourses, setPopularCourses] = useState([]);
    const nav = useNavigate();
    const {id: coursesId} = useParams()
    const handleCoursesClick = (id) => {
        nav(`/course-category/${id}`);
    };
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/courses/`);
                // const response = await fetch(`https://dev.gekoeducation.com/api/categories/`);
                const data = await response.json();
                console.log(data)
                setCourses(data); // Сохранение категорий в состояние
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/courses/${coursesId}/`);
                // const response = await fetch(`https://dev.gekoeducation.com/api/categories/${categoryId}/`);
                const data = await response.json();
                console.log(data)
                setPopularCourses(data); // Сохранение курсов в состояние
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        if (coursesId) {
            fetchCourses();
        }
    }, [coursesId]);

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when the category changes
        setCoursesPerPage(6)
    }, [coursesId]);

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = Math.min(startIndex + coursesPerPage, popularCourses.length);
    const totalPages = Math.ceil(popularCourses.length / coursesPerPage);

    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const renderPagination = () => (<ReactPaginate
        previousLabel="<"
        nextLabel=">"
        pageCount={totalPages}
        onPageChange={handlePageChange}
        breakLabel="..."
        pageRangeDisplayed={5}
        renderOnZeroPageCount={null}
        // Apply custom CSS classes
        className={'pagination'}
        pageClassName={'pagination__item'}
        pageLinkClassName={'pagination__link'}
        activeLinkClassName={'pagination__link--active'}
        previousClassName={'pagination__previous'}
        nextClassName={currentPage === totalPages ? 'pagination__next disabled' : 'pagination__next'} // Disable next on last page
    />);
    let gridStyle = gridStyleTF === true ? 'md:grid-cols-4 sm:grid-cols-2 grid-cols-1 ' : 'grid-cols-1';
    return (<main className="max:px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
        <h1 className="text-5xl font-roboto-slab font-bold text-primaryDark">
            Courses
        </h1>
        <div className="flex mid:flex-row flex-col  gap-5 py-10">
            <div className="w-full">
                <div className="flex gap-3 items-center">
                    <i
                        className={`fa fa-th-large text-xl hover:text-color56 cursor-pointer ${gridStyleTF === true ? 'text-color56' : 'text-color66'}`}
                        aria-hidden="true"
                        onClick={() => setGridStyle(true)}
                    ></i>
                    <i
                        className={`fa fa-list-ul text-lg hover:text-color56 cursor-pointer ${gridStyleTF === false ? 'text-color56' : 'text-color66'}`}
                        aria-hidden="true"
                        onClick={() => setGridStyle(false)}
                    ></i>
                    <p className="text-color66 text-custom-15">
                        {`Showing ${startIndex + 1}-${endIndex} of ${popularCourses.length} results`}
                    </p>
                </div>
                <div
                    className={`opacityPopularCourseStand content-center grid ${gridStyle} ${gridStyleTF === true ? 'gap-10' : 'gap-0'} py-6`}>
                    {courses.map(({image, id, name, desc}) => {
                        return (<Course
                            gridStyleTF={gridStyleTF}
                            desc={desc}
                            image={image}
                            name={name}
                            key={id}
                            id={id}
                        />)
                    })}
                </div>
                {renderPagination()}
            </div>
        </div>
        <CoursesMenu isOpen={showMenu} toggleMenu={toggleMenu} categoryId={coursesId}/>
    </main>);
}
