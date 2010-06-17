exports.fixAccept = function(nextApp) {
    return function(request) {
        if (request.headers["user-agent"] && request.headers["user-agent"].indexOf("MSIE ") >= 0) {
            if (request.headers.accept.indexOf("text/html") < 0) {
                request.headers.accept = "text/html, " + request.headers.accept;
            }
        }
        return nextApp(request);
    };
};
