import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div className="w-1/2 bg-gray-600 text-white h-screen font-serif text-left pl-40 text-7xl pt-54">
        <div>Get</div>
        <div> Into Your</div>
        <div> Focus Flow state</div>
      </div>
      <div className=" b-3 pl-50 pt-20">
        <div className=" text-5xl flex  p-10 font-serif">Sign up</div>
        <div className="">
          <input
            type="text"
            placeholder="Full Name"
            className="bg-blue-50 p-2 m-2 w-80 border-none rounded-md outline-none"
          />
        </div>
        <div className="border-none">
          <input
            type="email"
            placeholder="Email"
            className="bg-blue-50 p-2 m-2 w-80 border-none rounded-md outline-none"
          />
        </div>
        <div className="border-none ">
          <input
            type="password"
            placeholder="Password"
            className="bg-blue-50 p-2 m-2 w-80 border-none rounded-md outline-none"
          />
        </div>
        <div>
          <button className="bg-gray-600 text-white font-semibold  rounded-md p-3 m-2 w-80">
            Signup
          </button>
        </div>
        <div>
          Already Signed up?
          <button
            className="bg-gray-600 text-white font-semibold w-40 rounded-md p-3 m-2"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};
