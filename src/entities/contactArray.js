import { MdOutlinePlace } from "react-icons/md";
import { MdOutlineContactMail } from "react-icons/md";
import { BsStopwatch } from "react-icons/bs";

const contactArray = [
{
  id:1,
  title:'Address Way',
  color:'#2e67f5',
  Icon:MdOutlinePlace,
  description:'725 E Broadway, Glendale, CA, United States, 91205'
},
{
  id:2,
  title:'Contact info',
  color:'#5ebb3e',
  Icon:MdOutlineContactMail,
  description:'Mobile: +1 747-236-8888 \n Hotline: 1800 - 1102 \n Mail: contact@eduma.com'
},
{
  id:3,
  title:'Work timer',
  Icon:BsStopwatch,
  color:'#ffbf25',
  description:'Monday - Friday: 09:00 - 20:00 \nSunday & Saturday: 10:30 - 22:00  '
}
]

export default contactArray