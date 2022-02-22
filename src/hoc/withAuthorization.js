import * as React from 'react';
import { useHistory } from 'react-router-dom';
import useLocalStorage from "../hooks/useLocalStorage";

const withAccount = (Component) => (props) => {
    const router = useHistory();
    const storage = useLocalStorage();

    React.useEffect(() => {
      const token = storage.get('@reactlab_token');

      if (!token) {
          router.push('/');
      }
    }, []);

    return <Component {...props} />;
  };

export default withAccount;
