/**
 * Provides parsers for various HTTP headers
 **/

var parse = exports.parse = {};

parse["content-range"] = function(header, pageSize) {
    if (header instanceof ContentRange || !header) return header;
    var parts = header.match(/(.+?) (-?\d+)\-(-?\d+)\/(\d+)/);
    if (!parts) return;
    var range = {};
    range.type = parts[1];
    range.start = parseInt(parts[2], 10);
    range.end = parseInt(parts[3], 10);
    range.total = parseInt(parts[4], 10);
    
    if (!pageSize) return range;
    if (range.start) {
        range.prev = {};
        range.prev.start = range.start - pageSize;
        if (range.prev.start < 0) range.prev.start = 0;
        range.prev.end = range.start - 1;
    }
    if (range.total - range.end > 1) {
        range.next = {};
        range.next.start = range.end + 1;
        range.next.end = range.end + pageSize;
        if (range.next.end >= range.total) range.next.end = range.total - 1;
    }
    return range;
}

function ContentRange() {
    previous: function(pageSize) {
        
    },
    next: function(pageSize) {
        
    },
    toString: function() {
        // roundtrip back to string "items: 0-4/10" form
        var total = this.total >= 0 ? this.total : "*";
        return [this.type, ": ", this.start, "-", this.end, "-", total].join("");
    }
}
