(function(scope) {

	var constructor,
		waitForWebfont,
		loadedFonts=[];

	/**
	 * Check font loading status.
	 * If font is loaded will call callback(true).
	 * If font not loaded will call callback(false).
	 * @param font {string} Font name
	 * @param callback {Function} Callback
	 */
	waitForWebfont = function(font, callback)
	{
        var node = document.createElement('span'),
        	width, timer, loops=200, checkFont;

        // Characters that vary significantly among different fonts
        node.innerHTML = 'giItT1WQy@!-/#';
        // Visible - so we can measure it - but not on the screen
        node.style.position      = 'absolute';
        node.style.left          = '-10000px';
        node.style.top           = '-10000px';
        // Large font size makes even subtle changes obvious
        node.style.fontSize      = '300px';
        // Reset any font properties
        node.style.fontFamily    = 'sans-serif';
        node.style.fontVariant   = 'normal';
        node.style.fontStyle     = 'normal';
        node.style.fontWeight    = 'normal';
        node.style.letterSpacing = '0';
        document.body.appendChild(node);

        // Remember width with no applied web font
        width = node.offsetWidth;

        node.style.fontFamily = font;

        checkFont = function checkFont()
        {
            // Compare current width with original width
            if (node && node.offsetWidth != width) {
                node.parentNode.removeChild(node);
                node = null;

            	// If all fonts have been loaded
                if (timer) {
                    clearTimeout(timer);
                }

                if (callback instanceof Function) {
                	callback(true);
                }
        	} else if (loops>0) {
        		timer = setTimeout(checkFont, 50);
        		loops--;
        	} else {
        		if (callback instanceof Function) {
                	callback(false);
                }
        	}
        };

		checkFont();
    };

	/**
	 * Constructor of class.
	 * @class Fontx
	 */
	Fontx = function(name, src)
	{
		this.src = src;
		this.name = name;
	};

	/**
	 * Class property.
	 * @class Fontx
	 * @property src {string} 
	 */
	Fontx.prototype.src = null;
	
	/**
	 * Class property.
	 * @class Fontx
	 * @property name {string} 
	 */
	Fontx.prototype.name = null;

	/**
	 * Class property.
	 * @class Fontx
	 * @property onload {Function} 
	 */
	Fontx.prototype.onload = null;
	
	/**
	 * Class property.
	 * @class Fontx
	 * @property onerror {Function} 
	 */
	Fontx.prototype.onerror = null;

	/**
	 * Start font loading.
	 * @class Fontx
	 */
	Fontx.prototype.load = function()
	{
		var me=this,
			fontFace, newStyle;

		fontFace = [
			"@font-face {",
				"\tfont-family: \"" + this.name + "\";",
				"\tsrc: local('☺'), url('" + this.src + "') format('truetype');",
			"}"
		].join("\n");

		newStyle = document.createElement('style');
		newStyle.appendChild(document.createTextNode(fontFace));
		document.head.appendChild(newStyle);
		
		waitForWebfont(this.name, function(isSuccess) {
			if (isSuccess) {
				if (me.onload instanceof Function) {
					me.onload();
				}
			} else {
				if (me.onerror instanceof Function) {
					me.onerror();
				}
			}
		});
	};

	// export to global scope
	scope.Fontx = Fontx;

})(window);