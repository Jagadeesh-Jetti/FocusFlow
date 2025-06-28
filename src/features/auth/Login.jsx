import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './authThunk';
import { useDispatch } from 'react-redux';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const loginHandler = () => {
    dispatch(loginUser(input));
    setInput({
      email: '',
      password: '',
    });
    navigate('/dashboard');
  };

  return (
    <div className="flex ">
      <div className="w-1/2 pl-50 pt-40">
        <h1 className="text-5xl p-10 font-serif"> Login </h1>
        {/* <p className="">Login to continue crush your goals</p> */}

        <div className="">
          <input
            type="text"
            placeholder="Email"
            className="bg-blue-50 p-2 m-2 w-80 border-none rounded-md outline-none"
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Password"
            className="bg-blue-50 p-2 m-2 w-80 border-none rounded-md outline-none"
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
        </div>
        <button
          className="bg-gray-600 text-gray-50 font-semibold  rounded-md p-3 m-2 w-80"
          onClick={loginHandler}
        >
          Login
        </button>
        <div>
          Dont have an account?
          <button
            className="bg-gray-600 text-gray-50 font-semibold w-40 rounded-md p-3 m-2"
            onClick={() => navigate('/')}
          >
            Sign up
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-gray-600 text-white h-screen font-serif text-left pl-40 text-7xl pt-48">
        <div>Login </div>
        <div> to the world </div>
        <div> Planning and Productivity</div>
      </div>
    </div>
  );
};
