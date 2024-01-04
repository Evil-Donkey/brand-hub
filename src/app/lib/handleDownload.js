// import { saveAs } from 'file-saver'

// export default function handleDownload(url, filename) {
//     fetch(url)
//         .then(res => res.blob())
//         .then(blob => saveAs(blob, filename))
// }

import { saveAs } from 'file-saver'

export default function handleDownload(url, filename) {
    fetch(url, {
        method: 'GET',
        mode: 'cors', // CORS mode
        // credentials: 'include' // Include credentials for cross-origin requests
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Server responded with ${res.status}: ${res.statusText}`);
        }
        return res.blob();
    })
    .then(blob => saveAs(blob, filename))
    .catch(error => console.error('Download error:', error));
}