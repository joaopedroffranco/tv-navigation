const Track = require('./track');
const Mosaic = require('./mosaic');

/**
 * Navigation class
 * 
 * @param {Object} controls
 */
function Navigation(controls) {
    this.controls = controls;

    /**
     * Set the navigation. Called on didMount screen
     * 
     * @param {Function} onReturn will be called when the user pressed return key.
     * @param {Function} onExit will be called when the user pressed exit key
     */
    this.set = function(onReturn, onExit) {
        this.onReturn = onReturn;
        this.onExit = onExit;
    }

    /**
     * Set the navigation type
     * 
     * @param {Mosaic or Track} type
     */
    this.setType = function(type) {
        this.type = type;
    }
        
    /**
     * Update elements references
     * 
     * @param {Array[Array]} elements
     */
    this.update = function(elements) {
        if (this.type) {
            this.type.update(elements);
        } else {
            console.error('Please, set navigation type');
        }
    }

    /**
     * Check if the current element is the first one
     */
    this.isFirst = function() {
        return this.type && this.type.isFirst();
    }

    /**
     * Check if the current element is the last one
     */
    this.isLast = function() {
        return this.type && this.type.isLast();
    }

    /**
     * Focus something
     */
    this.focus = function() {
        if (this.type) this.type.focus();
    }
        
    /**
     * Called on keydown pressed
     * 
     * @param {Number} keycode get from event listener
     */
    this.move = function(keycode) {
        if (this.type) {
            if (this.type.hasElements()) {
                switch (keycode) {
                case this.controls.left:
                    this.type.left();
                    break;
                case this.controls.up:
                    this.type.up();
                    break;
                case this.controls.down:
                    this.type.down();
                    break;
                case this.controls.right:
                    this.type.right();
                    break;
                case this.controls.return:
                case 8:
                    this.onReturn();
                    break;
                default: break;
                }
                this.focus();
            } else {
                console.error('Please, set navigation type');
            }
        }
    }
}

Navigation.types = {
    verticaltrack: true,
    horizontaltrack: false
}

module.exports = Navigation;