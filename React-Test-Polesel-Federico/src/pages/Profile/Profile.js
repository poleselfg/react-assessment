import './Profile.styles.css';
import * as React from 'react';
import withAccount from '../../hoc/withAuthorization';
import useLocalStorage from '../../hooks/useLocalStorage';
import useLogin from '../../hooks/useLogin';
import Avatar from '../../assets/avatar.jpeg';

const Profile = () => {
    const { user, getProfile } = useLogin();
    const storage = useLocalStorage();

    React.useEffect(() => {
        const token = storage.get('@reactlab_token');

        if (!user) {
            getProfile(token);
        }
    }, [user])

    return user ? <div className="container">
        <img className="user-avatar" src={Avatar} alt="user avatar" />
        <h4>@{user.username}</h4>
        <p>{user.bio}</p>
    </div> : null
}

export default withAccount(Profile);
