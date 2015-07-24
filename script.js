/* public/script.js */

window.onload = function() {
    //var converter = new showdown.Converter();
    var marked = require('marked');
    marked.setOptions({ 
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
    });
    
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');
    var noteName = document.getElementById("notename");


    var convertTextAreaToMarkdown = function(){
        var markdownText = pad.value;
        var title = "#" + (document.getElementById('notename')).value + "\n" + "---------------" + "\n";
        var html = marked(title + markdownText);
        markdownArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);
    noteName.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
};