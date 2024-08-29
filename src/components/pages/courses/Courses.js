import popularCoursesArray from '../../../entities/popularCoursesArray';
import {coursesArray} from "../../../entities/coursesArray";
import PopularCourse from '../shared/home/PopularCourse';
import {useNavigate, useParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import {useState, useEffect} from 'react';
import CoursesMenu from "./CoursesMenu";

export default function Courses() {
    const [gridStyleTF, setGridStyle] = useState(true);
    const [coursesPerPage, setCoursesPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);
    const nav = useNavigate();
    const {id: categoryId} = useParams()
    const handleCategoryClick = (id) => {
        nav(`/course-category/${id}`);
    };
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    const filteredCourses = categoryId ? popularCoursesArray.filter(course => course.category.toString() === categoryId) : popularCoursesArray;

    useEffect(() => {
        setCurrentPage(1); // Reset to the first page when the category changes
        setCoursesPerPage(6)
    }, [categoryId]);

    const startIndex = (currentPage - 1) * coursesPerPage;
    const endIndex = Math.min(startIndex + coursesPerPage, filteredCourses.length);
    const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
    const paginatedCourses = () => {
        return filteredCourses.slice(startIndex, endIndex);
    };

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
    let gridStyle = gridStyleTF === true ? 'md:grid-cols-3 sm:grid-cols-2 grid-cols-1 ' : 'grid-cols-1';
    return (<main className="max:px-5 max-w-[1300px] mx-auto py-5 flex flex-col">
        <h1 className="text-5xl font-roboto-slab font-bold text-primaryDark">
            Courses
        </h1>
        <div className="flex mid:flex-row flex-col  gap-5 py-10">
            <div className="w-[25%] mid:flex flex-col hidden h-min border-b" style={{
                position: 'sticky', top: `10px`,
            }}>
                <h1 className="min-w-max text-2xl font-roboto-slab font-bold text-primaryDark">
                    Categories
                </h1>
                {coursesArray.sort((a, b) => a.text.localeCompare(b.text)).map(({id, text}) => (<p
                    onClick={() => handleCategoryClick(id)}
                    className={`min-w-max w-full textHover cursor-pointer py-[5px] ${+categoryId === id ? "text-color56" : "text-primaryDark"}`}
                    key={id}>{text}
                </p>))}
            </div>
            <button onClick={toggleMenu} className="mid:hidden flex bg-color56 text-white font-roboto-slab text-sm uppercase font-bold w-min px-9 py-2">
                Filter
            </button>
            <div className="mid:w-[80%] w-full">
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
                        {`Showing ${startIndex + 1}-${endIndex} of ${filteredCourses.length} results`}
                    </p>
                </div>
                <div
                    className={`opacityPopularCourse content-center grid ${gridStyle} ${gridStyleTF === true ? 'gap-10' : 'gap-0'} py-6`}>
                    {paginatedCourses().map(({image, id, title, count, desc, price}) => {
                        return (<PopularCourse
                            gridStyleTF={gridStyleTF}
                            desc={desc}
                            image={image}
                            title={title}
                            count={count}
                            price={price}
                            key={id}
                            id={id}
                        />)
                    })}
                </div>
                {renderPagination()}
            </div>
        </div>
        <CoursesMenu isOpen={showMenu} toggleMenu={toggleMenu} categoryId={categoryId}/>
    </main>);
}
