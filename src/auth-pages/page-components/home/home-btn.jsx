import { useNavigate } from 'react-router-dom'


const HomeBtn = () => {

const navigate = useNavigate();

  return (
    <div onClick={()=>navigate('/')}>
      Home
    </div>
  )
}

export default HomeBtn;