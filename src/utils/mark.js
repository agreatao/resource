import marked from 'marked';
import hljs from 'highlight.js';

hljs.registerLanguage('shell', require('./languages/shell'));
hljs.registerLanguage('json', require('./languages/json'));

hljs.configure({
    languages: [
        'shell', 'python',
        'css', 'scss', 'less', 'html',
        'javascript', 'java', 'json'
    ]
});

marked.setOptions({
    highlight: (code, lang) => {
        let hl = hljs.highlightAuto(code, [ lang ]);
        return hl.value;
    }
});

export default marked;