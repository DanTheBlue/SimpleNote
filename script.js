/* public/script.js */

window.onload = function() {
    //var converter = new showdown.Converter();
    var highlighter = require('highlight.js');
    highlighter.initHighlightingOnLoad();
    var marked = require('marked');
    marked.setOptions({ 
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        highlight: function (code, lang) {
            return highlighter.highlightAuto(code).value;
        }
    });

    
    var pad = document.getElementById('pad');
    var markdownArea = document.getElementById('markdown');
    var noteName = document.getElementById("notename");


    var convertTextAreaToMarkdown = function(){
        //allert the controller the file may have been changed
        var markdownText = pad.value;
        var title = "#" + (document.getElementById('notename')).value + "\n" + "---------------" + "\n";
        var html = marked(title + markdownText);
        markdownArea.innerHTML = html;
    };

    pad.addEventListener('input', convertTextAreaToMarkdown);
    noteName.addEventListener('input', convertTextAreaToMarkdown);

    convertTextAreaToMarkdown();
};