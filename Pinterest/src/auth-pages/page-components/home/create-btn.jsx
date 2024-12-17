import { useNavigate } from 'react-router-dom'


const CreateBtn = () => {

const navigate = useNavigate();

  return (
    <div onClick={()=>navigate('/create')}>
    </div>
  )
}

export default CreateBtn;