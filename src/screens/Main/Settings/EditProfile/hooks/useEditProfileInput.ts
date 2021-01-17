import { useState } from 'react';
import User from '../../../../../models/User';

const useEditProfileInput = (initialValue: User): [any, any, () => void] => {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    }
  };

  return [value, bind, reset];
};

export default useEditProfileInput;
