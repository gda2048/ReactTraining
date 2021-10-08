import { useSelector } from 'react-redux'
import { selectUser } from '../../../store/user'

const UserPage = () => {
	const user = useSelector(selectUser)
	return (
	    <div>
            User {user.localId}
			<p>Email: {user.email}</p>
		</div>
	)
}

export default UserPage