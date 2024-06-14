export const formatReportText = (text) => {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<br><strong>$1</strong>')
        .replace(/#### (.*?):/g, '<h3 class="text-xl font-semibold mt-2">$1</h3>')
        .replace(/### (.*?):/g, '<h2 class="text-2xl font-semibold mt-2">$1</h2>')
        .replace(/\\n-/g, ' ')
        .replace(/\\n/g, ' ')
        .replace(/\\ \\n###/g, '')
        .replace(/\\ \\n###/g, '')
        .replace(/\\"/g, '');
};
