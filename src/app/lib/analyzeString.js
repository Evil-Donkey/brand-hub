export default function analyzeString(str) {
    // Check for "http://" or "https://"
    const isHttpOrHttps = str.startsWith('http://') || str.startsWith('https://');
  
    // Email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmail = emailPattern.test(str);
  
    return { isHttpOrHttps, isEmail };
}