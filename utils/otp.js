const jwt = require('./jwt');

exports.generateOTP = () => {
	var digits = '0123456789';
	let OTP = '';
	for (let i = 0; i < 6; i++ ) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}

exports.getOtpToken = (otp) => {
    return jwt.generate({otp : otp}, '5m');
}




				
