import AboutUs from '../components/pages/about/AboutUs'
import Gallery from "../components/pages/gallery/Gallery";
import Contacts from '../components/pages/contacts/Contacts'
import Courses from '../components/pages/courses/Courses'
import Events from '../components/pages/events/Events'
import Home from '../components/pages/home/Home'

export const routesArray = [
  {
    id: 1,
    name: 'HOME',
    component: Home,
    path: '/',
  },
  {
    id: 2,
    name: 'COURSES',
    component: Courses,
    path: '/course-category',
  },
  {
    id: 3,
    name: 'EVENTS',
    component: Events,
    path: '/events',
  },

  {
    id: 4,
    name: 'GALLERY',
    component: Gallery,
    path: '/gallery',
  },
  {
    id: 5,
    name: 'CONTACTS',
    component: Contacts,
    path: '/contacts',
  },
  {
    id: 6,
    name: 'ABOUT_US',
    component: AboutUs,
    path: '/about-us',
  },

  // {
  //   id: 7,
  //   name: 'TERMINATES',
  //   component: Terminates,
  //   path: '/terminates',
  // },
]
