Fontx
=====

Fontx - JavaScript library for dynamic font loading / initializing with onload / onerror hendlers support.

Example
=======

<pre>
// Font name
var name = 'Helvetica';

// TTF file URL
var src = 'http://example.com/Helvetica.ttf';

var font = new Fontx(name, src);

// Success
font.onload = function() {
	alert('Font ' + this.name  + ' loaded.');
};

// Error
font.onerror = function(err) {
	alert('Font ' + this.name  + ' NOT loaded.');
};

font.load();
</pre>
