class AdminValidator {
  // Method to validate the request data for creating an admin
  static validateAdminRegister(req, res, next) {
    const { name, email, password } = req.body;

    // Define regex patterns for validation
    const nameRegex = /^[a-zA-Z\s]{2,50}$/; // Only letters and spaces, 2-50 characters
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // Minimum 8 characters, at least 1 letter and 1 number

    // Validate name (between 2-50 characters, alphabetic and spaces only)
    if (!name || !nameRegex.test(name)) {
      return res.status(400).json({
        success: false,
        message: 'Name must be alphabetic and 2-50 characters long',
      });
    }

    // Validate email (proper email format)
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Validate password (at least 8 characters, containing at least one letter and one number)
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long, containing at least one letter and one number',
      });
    }

    // If validation passes, move to the next middleware or controller
    next();
  }
}

export default AdminValidator;
