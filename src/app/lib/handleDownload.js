import { saveAs } from 'file-saver'

export default function handleDownload(url, filename) {
    fetch(url)
        .then(res => res.blob())
        .then(blob => saveAs(blob, filename))
}