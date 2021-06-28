import { useLocation } from 'react-router-dom'
import GetSpecificBook from '../../Components/SpecificBook'



function Book() {
	const idString = useLocation().pathname.substring(1); 
	const idNum = parseInt(idString, 10)

  return (
	  GetSpecificBook(idNum)
  );
}

export default Book;
