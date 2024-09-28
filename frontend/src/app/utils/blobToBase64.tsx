type Base64Callback = (base64data: string) => void;

const blobToBase64 = (blob: Blob, callback: Base64Callback): void => {
    const reader = new FileReader();
    reader.onload = function(this: FileReader, /*event: ProgressEvent<FileReader>*/) {
        const result = this.result;
        if (typeof result === 'string') {
            const base64data = result.split(",")[1];
            callback(base64data);
        } else {
            console.error('FileReader result is not a string');
        }
    };
    reader.readAsDataURL(blob);
};

export { blobToBase64 };