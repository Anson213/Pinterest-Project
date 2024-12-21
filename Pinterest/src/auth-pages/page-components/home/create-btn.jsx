import { useNavigate } from 'react-router-dom'


const CreateBtn = () => {

const navigate = useNavigate();

  return (
    <div onClick={()=>navigate('/create')}>
      Create
    </div>
  )
}

export default CreateBtn;