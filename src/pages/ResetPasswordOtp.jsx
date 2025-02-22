import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp, resendOtp } from "../features/authSlice"; // Import actions
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/authSlice";
import { verifyResetPasswordCode } from "../features/resetSlice";

const ResetPasswordOtp = () => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.reset);

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();


  // Countdown timer for OTP resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input field
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  // Handle backspace key press
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  // Submit OTP
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      dispatch(verifyResetPasswordCode({ otpCode }));
    } else {
      toast.error("Enter all 6 digits");
    }
  };

   // Show success or error messages
 useEffect(() => {
  if (error) toast.error(error);
  if (success === "verified") {
    toast.success("Verification successful!");
    navigate('/reset-password')
    setTimeout(() => {
    }, 2000);
  }
}, [error, success, navigate]);


  // Resend OTP
  const handleResend = () => {
    if (canResend) {
      dispatch(resendOtp());
    //   setTimer(60);
      setCanResend(false);
      toast.info("OTP Resent!");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Verify OTP</h2>
      <p>Enter the 6-digit code sent to your email/phone</p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength="1"
              style={styles.otpInput}
            />
          ))}
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <p>
        Didn't receive the OTP?{" "}
        <button onClick={handleResend} disabled={!canResend} style={styles.resendButton}>
          {canResend ? "Resend OTP" : `Resend in ${timer}s`}
        </button>
      </p>
    </div>
  );
};

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  otpInput: {
    width: "40px",
    height: "40px",
    textAlign: "center",
    fontSize: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  button: {
    backgroundColor: "#ff3366",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  resendButton: {
    background: "none",
    border: "none",
    color: "#ff3366",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default ResetPasswordOtp;
