import { useParams } from 'react-router-dom'
import GetSpecificBook from '../../Components/SpecificBook'



function Book() {
  const { book } = useParams();

  return <GetSpecificBook id={book}/>;
}

export default Book;
