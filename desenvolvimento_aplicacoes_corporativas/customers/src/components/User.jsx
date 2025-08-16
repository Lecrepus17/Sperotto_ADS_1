import { Link, useParams } from "react-router-dom";
const User = ({ onRemoveUser }) => {
  const { userId } = useParams();
  return (
    <>
      <h2>User: {userId}</h2>
      <button type="button" onClick={() => onRemoveUser(userId)}>
        Remove
      </button>
      <Link to="/users">De volta aos usuários</Link>
    </>
  );
};
export default User;
