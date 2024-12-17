import { useNavigate } from 'react-router-dom'


const HomeBtn = () => {

const navigate = useNavigate();

  return (
    <div onClick={()=>navigate('/')}>
    </div>
  )
}

export default HomeBtn;