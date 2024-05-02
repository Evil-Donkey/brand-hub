export default function analyzeString(str) {
    // Check for "http://" or "https://"
    const isHttpOrHttps = str.startsWith('http://') || str.startsWith('https://');
  
    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailPattern.test(str);

    // Phone number validation pattern (flexible for international formats)
    const phonePattern = /^\+?\d{1,3}\s*(\(\d+\))?(\s*\(\d+\))?\s*\d+(\s*\d+)*$/;
    const isPhoneNumber = phonePattern.test(str);
  
    return { isHttpOrHttps, isEmail, isPhoneNumber };
}