import { useEffect,useState,useRef } from "react";

const OTPGenerator = () => {
  const [otp, setOtp] = useState(null);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [timer]);

  function generateOtp() {

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    setOtp(newOtp);
    setTimer(5);

    intervalRef.current = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return (
    <div className="container">
      <h1 id="otp-title">OTP Generator</h1>
      <h2 id="otp-display">
        {otp ? otp : "Click 'Generate OTP' to get a code"}
      </h2>
      <p id="otp-timer" aria-live="assertive">
        {timer > 0
          ? `Expires in: ${timer} seconds`
          : otp
          ? "OTP expired. Click the button to generate a new OTP."
          : ""}
      </p>
      <button
        id="generate-otp-button"
        onClick={generateOtp}
        disabled={timer > 0}
      >
        Generate OTP
      </button>
    </div>
  );
};

export default OTPGenerator;
