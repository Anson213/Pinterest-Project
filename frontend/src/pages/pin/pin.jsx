import { useParams } from "react-router-dom";

const Pin = () => {
    const { pinId } = useParams();
    return (
        <div>
            <h1>Pin Page</h1>
            <p>This is the pin page. {pinId}</p>
        </div>
    );
};

export default Pin;