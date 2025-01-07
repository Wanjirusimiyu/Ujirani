import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';

const GoogleAuthButton = ({ onSuccess, buttonText }) => {
  const login = useGoogleLogin({
    onSuccess: tokenResponse => onSuccess(tokenResponse),
    onError: error => console.error('Google Login Failed:', error)
  });

  return (
    <button
      onClick={() => login()}
      className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
    >
      <FcGoogle className="w-5 h-5" />
      <span>{buttonText}</span>
    </button>
  );
};

export default GoogleAuthButton;
