import ReactPaginate from 'react-paginate';
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import CoursesMenu from "./CoursesMenu";
import Course from "../shared/home/Course";
import { DataContext } from "../data/DataProvider";

export default function Courses() {
    const [gridStyleTF, setGridStyle] = useState(true);
    const [coursesPerPage, setCoursesPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const { id: coursesId } = useParams();
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const { courses } = useContext(DataContext); // Use context
    const filteredCourses = courses.filter(course => course.categoryId === coursesId); // Фильтрация по ID категории

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when the category changes
        setCoursesPerPage(8);
    }, [coursesId]);

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = Math.min(startIndex + coursesPerPage, filteredCourses.length);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

    const handlePageChange = (data) => {
        setCurrentPage(data.selected + 1);
    };

    const renderPagination = () => (
        <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            pageCount={totalPages}
            onPageChange={handlePageChange}
            breakLabel="..."
            pageRangeDisplayed={5}
            renderOnZeroPageCount={null}
            className={'pagination'}
            pageClassName={'pagination__item'}
            pageLinkClassName={'pagination__link'}
            activeLinkClassName={'pagination__link--active'}
            previousClassName={'pagination__previous'}
            nextClassName={currentPage === totalPages ? 'pagination__next disabled' : 'pagination__next'}
        />
    );

    let gridStyle = gridStyleTF ? 'md:grid-cols-4 sm:grid-cols-2 grid-cols-1' : 'grid-cols-1';

    return (
        <main className="max:px-5 max-w-[1300px] mx-auto py-5 flex flex-col min-h-[52.3vh]">
            <h1 className="text-5xl font-roboto-slab font-bold text-primaryDark">
                Courses
            </h1>
            <div className="flex mid:flex-row flex-col gap-5 py-10">
                <div className="w-full">
                    <div className="flex gap-3 items-center">
                        <i
                            className={`fa fa-th-large text-xl hover:text-color56 cursor-pointer ${gridStyleTF ? 'text-color56' : 'text-color66'}`}
                            aria-hidden="true"
                            onClick={() => setGridStyle(true)}
                        ></i>
                        <i
                            className={`fa fa-list-ul text-lg hover:text-color56 cursor-pointer ${!gridStyleTF ? 'text-color56' : 'text-color66'}`}
                            aria-hidden="true"
                            onClick={() => setGridStyle(false)}
                        ></i>
                        <p className="text-color66 text-custom-15">
                            {`Showing ${startIndex + 1}-${endIndex} of ${filteredCourses.length} results`}
                        </p>
                    </div>
                    <div
                        className={`opacityPopularCourseStand content-center grid ${gridStyle} ${gridStyleTF ? 'gap-10' : 'gap-0'} py-6`}>
                        {filteredCourses.slice(startIndex, endIndex).map(({ image, id, name, desc }) => {
                            return (
                                <Course
                                    gridStyleTF={gridStyleTF}
                                    desc={desc}
                                    image={image}
                                    name={name}
                                    key={id}
                                    id={id}
                                />
                            );
                        })}
                    </div>
                    {renderPagination()}
                </div>
            </div>
            <CoursesMenu isOpen={showMenu} toggleMenu={toggleMenu} categoryId={coursesId} />
        </main>
    );
}
