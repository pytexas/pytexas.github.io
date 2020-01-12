(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('aos'), require('jquery'), require('jquery-countdown'), require('scrollmonitor'), require('flatpickr'), require('flickity'), require('ion-rangeslider'), require('isotope-layout'), require('jarallax'), require('plyr'), require('prismjs'), require('smooth-scroll'), require('@tanem/svg-injector'), require('twitter-fetcher'), require('typed.js'), require('smartwizard')) :
  typeof define === 'function' && define.amd ? define(['exports', 'aos', 'jquery', 'jquery-countdown', 'scrollmonitor', 'flatpickr', 'flickity', 'ion-rangeslider', 'isotope-layout', 'jarallax', 'plyr', 'prismjs', 'smooth-scroll', '@tanem/svg-injector', 'twitter-fetcher', 'typed.js', 'smartwizard'], factory) :
  (global = global || self, factory(global.theme = {}, global.AOS, global.jQuery, null, global.scrollMonitor, global.flatpickr, global.Flickity, null, global.Isotope, global.jarallax, global.Plyr, global.Prism, global.SmoothScroll, global.SVGInjector, global.twitterFetcher, global.Typed));
}(this, function (exports, AOS, jQuery$1, jqueryCountdown, scrollMonitor, flatpickr, Flickity, ionRangeslider, Isotope$1, jarallax, Plyr, Prism, SmoothScroll, svgInjector, twitterFetcher, Typed) { 'use strict';

  (function ($) {
    if ('objectFit' in document.documentElement.style === false) {
      $('.bg-image').each(function attachBg() {
        var img = $(this);
        var src = img.attr('src');
        var classes = img.get(0).classList; // Replaces the default <img.bg-image> element with a <div.bg-image>
        // to attach background using legacy friendly CSS rules

        img.before($("<div class=\"" + classes + "\" style=\"background: url(" + src + "); background-size: cover; background-position: 50% 50%;\"></div>")); // Removes original <img.bg-image> as it is no longer required

        img.remove();
      });
    }
  })(jQuery$1);

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  //

  var mrUtil = function ($) {
    var VERSION = '1.2.0';
    var Tagname = {
      SCRIPT: 'script'
    };
    var Selector = {
      RECAPTCHA: '[data-recaptcha]'
    }; // Activate tooltips

    $('body').tooltip({
      selector: '[data-toggle="tooltip"]',
      container: 'body'
    }); // Activate popovers

    $('body').popover({
      selector: '[data-toggle="popover"]',
      container: 'body'
    }); // Activate toasts

    $('.toast').toast();
    var Util = {
      version: VERSION,
      selector: Selector,
      activateIframeSrc: function activateIframeSrc(iframe) {
        var $iframe = $(iframe);

        if ($iframe.attr('data-src')) {
          $iframe.attr('src', $iframe.attr('data-src'));
        }
      },
      idleIframeSrc: function idleIframeSrc(iframe) {
        var $iframe = $(iframe);
        $iframe.attr('data-src', $iframe.attr('src')).attr('src', '');
      },
      forEach: function forEach(array, callback, scope) {
        if (array) {
          if (array.length) {
            for (var i = 0; i < array.length; i += 1) {
              callback.call(scope, i, array[i]); // passes back stuff we need
            }
          } else if (array[0] || mrUtil.isElement(array)) {
            callback.call(scope, 0, array);
          }
        }
      },
      dedupArray: function dedupArray(arr) {
        return arr.reduce(function (p, c) {
          // create an identifying String from the object values
          var id = JSON.stringify(c); // if the JSON string is not found in the temp array
          // add the object to the output array
          // and add the key to the temp array

          if (p.temp.indexOf(id) === -1) {
            p.out.push(c);
            p.temp.push(id);
          }

          return p; // return the deduped array
        }, {
          temp: [],
          out: []
        }).out;
      },
      isElement: function isElement(obj) {
        return !!(obj && obj.nodeType === 1);
      },
      getFuncFromString: function getFuncFromString(funcName, context) {
        var findFunc = funcName || null; // if already a function, return

        if (typeof findFunc === 'function') return funcName; // if string, try to find function or method of object (of "obj.func" format)

        if (typeof findFunc === 'string') {
          if (!findFunc.length) return null;
          var target = context || window;
          var func = findFunc.split('.');

          while (func.length) {
            var ns = func.shift();
            if (typeof target[ns] === 'undefined') return null;
            target = target[ns];
          }

          if (typeof target === 'function') return target;
        } // return null if could not parse


        return null;
      },
      getScript: function getScript(source, callback) {
        var script = document.createElement(Tagname.SCRIPT);
        var prior = document.getElementsByTagName(Tagname.SCRIPT)[0];
        script.async = 1;
        script.defer = 1;

        script.onreadystatechange = function (_, isAbort) {
          if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
            script.onload = null;
            script.onreadystatechange = null;
            script = undefined;

            if (!isAbort && callback && typeof callback === 'function') {
              callback();
            }
          }
        };

        script.onload = script.onreadystatechange;
        script.src = source;
        prior.parentNode.insertBefore(script, prior);
      },
      isIE: function isIE() {
        var ua = window.navigator.userAgent;
        var isIE = /MSIE|Trident/.test(ua);
        return isIE;
      }
    };
    return Util;
  }(jQuery$1);

  var mrDropdownGrid = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrDropdownGrid';
    var VERSION = '1.0.0';
    var DATA_KEY = 'mr.dropdownGrid';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME]; // KeyboardEvent.which value for Escape (Esc) key

    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for space key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for tab key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for up arrow key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for down arrow key

    var ARROW_DOWN_KEYCODE = 40; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var RIGHT_MOUSE_BUTTON_WHICH = 3;
    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var ClassName = {
      SHOW: 'show'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      RESIZE: "resize" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      MOUSE_ENTER: "mouseenter" + EVENT_KEY,
      MOUSE_LEAVE: "mouseleave" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown-grid"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      CONTAINER: '.dropdown-menu',
      CONTENT: '[data-dropdown-content]',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var Options = {
      HOVER: 'data-hover',
      BODY_HOVER: 'data-dropdown-grid-hover'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var DropdownGrid =
    /*#__PURE__*/
    function () {
      function DropdownGrid(element) {
        this.ticking = false;
        this.isActive = false;
        this.element = element;
        this.getOptions();
        this.parent = DropdownGrid.getParentFromElement(this.element);
        this.menu = this.getMenuElement();
        this.container = this.getContainerElement();
        this.content = this.getContentElement();
        this.isSubmenu = this.hasParentMenu();

        if (this.isSubmenu) {
          this.siblingMenus = this.getSiblingMenus();
        }

        this.submenus = this.getSubmenus();
        this.hover = this.options.hover;
        this.addEventListeners();
        this.setResizeEvent();
      }

      var _proto = DropdownGrid.prototype;

      _proto.getOptions = function getOptions() {
        if (!this.options) {
          this.options = {};
          this.options.hover = (this.element.getAttribute(Options.HOVER) === 'true' || document.body.getAttribute(Options.BODY_HOVER) === 'true') && this.element.getAttribute(Options.HOVER) !== 'false';
        }
      };

      _proto.toggle = function toggle(event) {
        this.getParentMenu();

        if (this.element.disabled || $(this.element).hasClass(ClassName.DISABLED)) {
          return;
        }

        this.isActive = $(this.menu).hasClass(ClassName.SHOW);
        var togglingOff = this.isActive;
        var togglingOn = !this.isActive;

        if (!this.isSubmenu) {
          DropdownGrid.clearMenus();
        }

        if (!this.isSubmenu && togglingOff) {
          return;
        }

        if (!this.isSubmenu && togglingOn && event && event.type === Event.MOUSE_LEAVE) {
          return;
        }

        if (this.isSubmenu && this.isActive) {
          DropdownGrid.clearMenus(null, this.element);
          DropdownGrid.clearMenus(null, this.submenus);
          return;
        }

        if (this.isSubmenu && !this.isActive) {
          DropdownGrid.clearMenus(null, this.siblingMenus);
        }

        var relatedTarget = {
          relatedTarget: this.element
        };
        var showEvent = $.Event(Event.SHOW, relatedTarget);
        $(this.parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $(this.parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        this.element.focus();
        this.element.setAttribute('aria-expanded', true);
        $(this.menu).toggleClass(ClassName.SHOW); // Recalculate positions after applying the shown class
        // This is because jQuery can't measure an invisible element.

        this.updatePosition();
        this.isActive = true;
        $(this.parent).toggleClass(ClassName.SHOW).trigger($.Event(Event.SHOWN, relatedTarget));
      };

      _proto.updatePosition = function updatePosition(winWidth) {
        var windowWidth = winWidth || window.innerWidth;
        var trigger = mrDropdownGrid.getDimensionsFromElement(this.element);
        this.positionContainer(trigger.offsetLeft);
        this.positionContent(windowWidth, trigger.offsetLeft);
      };

      _proto.positionContainer = function positionContainer(offsetLeft) {
        if (this.container) {
          this.container.style.left = "-" + offsetLeft + "px";
        } else {
          throw new TypeError('No element matching .dropdown-menu.container found.');
        }
      };

      _proto.positionContent = function positionContent(windowWidth, offsetLeft) {
        if (this.content) {
          var leftValue; // let topValue;

          var contentRect = mrDropdownGrid.getDimensionsFromElement(this.content);
          var contentWidth = contentRect.width; // If submenu, the left of the content needs to sit to the side of the trigger's content

          if (this.isSubmenu) {
            this.getParentMenu();
            var parentContent = mrDropdownGrid.getDimensionsFromElement(this.parentMenu.content); // Calculate X Offset

            if (parentContent.offsetLeft + parentContent.width + contentWidth <= windowWidth) {
              // Submenu can fit next to parent menu
              leftValue = parentContent.offsetLeft + parentContent.width;
            } else if (parentContent.offsetLeft >= contentWidth) {
              // No room for submenu to fit to the right of parent, sit it to the left instead.
              leftValue = parentContent.offsetLeft - contentWidth;
            } else {
              leftValue = 0;
            } // Calculate Y offset

          } else if (contentWidth + offsetLeft >= windowWidth) {
            // Not a submenu, but if the content won't fit, sit content close to the right boundary
            leftValue = windowWidth - contentWidth;
          } else {
            // Not a submenu, and there is room to fit normally and sit below trigger
            leftValue = offsetLeft;
          }

          var leftString = Math.round(leftValue) + "px";
          this.content.style.left = leftString;
        } else {
          throw new TypeError('No [data-dropdown-content] element was found.');
        }
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this = this;

        $(window).on(Event.RESIZE, function () {
          if (!_this.ticking) {
            window.requestAnimationFrame(function () {
              _this.updatePosition();

              _this.ticking = false;
            });
            _this.ticking = true;
          }
        });
      };

      _proto.getMenuElement = function getMenuElement() {
        if (!this.menu) {
          if (this.parent) {
            this.menu = this.parent.querySelector(Selector.MENU);
          }
        }

        return this.menu;
      };

      _proto.getContainerElement = function getContainerElement() {
        if (!this.container) {
          if (this.parent) {
            this.container = this.parent.querySelector("" + Selector.MENU + Selector.CONTAINER);
          }
        }

        return this.container;
      };

      _proto.getContentElement = function getContentElement() {
        if (!this.content) {
          if (this.parent) {
            this.content = this.container.querySelector(Selector.CONTENT);
          }
        }

        return this.content;
      };

      _proto.hasParentMenu = function hasParentMenu() {
        return $(this.element).closest(Selector.CONTENT).length > 0;
      };

      _proto.getParentMenu = function getParentMenu() {
        if (this.isSubmenu && !this.parentMenu) {
          this.parentMenu = $(this.parent).closest(Selector.MENU).siblings(Selector.DATA_TOGGLE).data(DATA_KEY);
        }
      };

      _proto.getSiblingMenus = function getSiblingMenus() {
        return $(this.element).closest(Selector.CONTENT).get(0).querySelectorAll(Selector.DATA_TOGGLE);
      };

      _proto.getSubmenus = function getSubmenus() {
        var children = this.content.querySelectorAll(Selector.DATA_TOGGLE);
        this.isParent = children.length !== 0;
        return children;
      };

      _proto.addEventListeners = function addEventListeners() {
        var _this2 = this;

        $(this.element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this2.toggle();
        });

        if (this.hover) {
          $(this.parent).on(Event.MOUSE_ENTER + " " + Event.MOUSE_LEAVE, function (event) {
            event.preventDefault();
            event.stopPropagation();

            if ("" + event.type + EVENT_KEY === Event.MOUSE_ENTER && _this2.isActive || "" + event.type + EVENT_KEY === Event.MOUSE_LEAVE && !_this2.isActive) {
              return;
            }

            _this2.toggle(event);
          });
        }
      };

      DropdownGrid.getDimensionsFromElement = function getDimensionsFromElement(element) {
        if (element && mrUtil.isElement(element)) {
          var rect = element.getBoundingClientRect();
          rect.offsetLeft = Math.round(rect.left + window.pageXOffset - document.documentElement.clientLeft);
          return rect;
        } // If not an element, throw an error


        throw new TypeError('Can\'t get a measurement from a non-element');
      };

      DropdownGrid.getParentFromElement = function getParentFromElement(element) {
        return element.parentNode;
      };

      DropdownGrid.clearMenus = function clearMenus(event, specificToggle) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup') && event.which !== TAB_KEYCODE) {
          return;
        }

        var toggles;

        if (specificToggle && typeof specificToggle === 'object') {
          toggles = specificToggle;
        } else {
          toggles = document.querySelectorAll(Selector.DATA_TOGGLE);
        }

        mrUtil.forEach(toggles, function (index, toggle) {
          var parent = DropdownGrid.getParentFromElement(toggle);
          var context = $(toggle).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggle
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            return;
          }

          var dropdownMenu = context.menu;

          if (!$(parent).hasClass(ClassName.SHOW)) {
            return;
          }

          if (event) {
            if ((event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
              return;
            }
          }

          if (event) {
            if (event.type === 'click' && ($.contains(context.content, event.target) || context.content.isSameNode(event.target))) {
              return;
            }
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            return;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $(document.body).children().off('mouseover', null, $.noop);
          }

          toggle.setAttribute('aria-expanded', 'false');
          context.isActive = false;
          $(dropdownMenu).removeClass(ClassName.SHOW);
          $(parent).removeClass(ClassName.SHOW).trigger($.Event(Event.HIDDEN, relatedTarget));
        });
      };

      DropdownGrid.jQueryInterface = function jQueryInterface(config) {
        return this.each(function jqEachDropdownGrid() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new DropdownGrid(this);
            $element.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      } // eslint-disable-next-line complexity
      ;

      DropdownGrid.dataApiKeydownHandler = function dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? (event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE) && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = DropdownGrid.getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index -= 1;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index += 1;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(DropdownGrid, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return DropdownGrid;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, DropdownGrid.dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, DropdownGrid.dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, DropdownGrid.clearMenus).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */

    $(document).ready(function () {
      var dropdownGridElements = $.makeArray($(Selector.DATA_TOGGLE));
      /* eslint-disable no-plusplus */

      for (var i = dropdownGridElements.length; i--;) {
        var $dropdownGrid = $(dropdownGridElements[i]);
        DropdownGrid.jQueryInterface.call($dropdownGrid, $dropdownGrid.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = DropdownGrid.jQueryInterface;
    $.fn[NAME].Constructor = DropdownGrid;

    $.fn[NAME].noConflict = function DropdownGridNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return DropdownGrid.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return DropdownGrid;
  }(jQuery$1);

  //
  //
  //  fade-page.js
  //
  //
  // Page Transition to fade out when clicking a link which has opted in using class 'fade-page'
  (function () {
    var ATTR_HREF = 'href';
    var EVENT_CLICK = 'click';
    var SELECTOR_FADE = 'fade-page';
    var EFFECT_DELAY = 500;
    var fadePage = document.getElementsByClassName(SELECTOR_FADE);

    function fadePageFunction(event) {
      if (!(event.ctrlKey || event.shiftKey || event.metaKey || event.button && event.button === 1)) {
        event.preventDefault();
        event.stopPropagation();
        document.body.classList.add(SELECTOR_FADE);
        var href = this.getAttribute(ATTR_HREF);
        setTimeout(function () {
          if (href !== '' && href !== '#') {
            window.location.href = href;
          }
        }, EFFECT_DELAY);
      }
    } // Bind click event


    for (var i = 0; i < fadePage.length; i += 1) {
      fadePage[i].addEventListener(EVENT_CLICK, fadePageFunction, false);
    }
  })();

  //

  (function () {
    $(document).on('shown.bs.modal layoutComplete', function (e) {
      var flickityInstance = $(e.target).find('[data-flickity]');
      flickityInstance.each(function (index, instance) {
        var $instance = $(instance);

        if ($instance.data().flickity.isInitActivated) {
          $instance.flickity('resize');
        }
      });
    });
  })();

  //

  var mrOverlayNav = function ($) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'mrOverlayNav';
    var VERSION = '1.1.0';
    var DATA_KEY = 'mr.overlayNav';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var Event = {
      RESIZE: "resize" + EVENT_KEY,
      RESIZED: "resized" + EVENT_KEY,
      IMAGE_LOAD: 'load',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDDEN: 'hidden.bs.collapse',
      NOTIFICATION_CLOSE: '',
      ALERT_CLOSE: 'close.bs.alert'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      OVERLAY_NAV: 'body > div.navbar-container > nav[data-overlay]',
      NAV: 'nav',
      OVERLAY_SECTION: '[data-overlay]',
      IMAGE: 'img',
      NAV_TOGGLED: 'navbar-toggled-show'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var OverlayNav =
    /*#__PURE__*/
    function () {
      function OverlayNav(element) {
        this.ticking = false; // Used to debounce resize event

        this.element = element;
        this.navHeight = this.getNavHeight();
        this.navToggled = false;
        this.container = OverlayNav.getContainerElement();
        this.overlayElement = OverlayNav.getFirstOverlayElement();
        this.setImageLoadEvent();
        this.updateValues();
        this.setResizeEvent();
        this.setNavToggleEvents();
      } // getters


      var _proto = OverlayNav.prototype;

      _proto.getNavHeight = function getNavHeight() {
        this.navHeight = this.element.getBoundingClientRect().height;
      };

      _proto.updateValues = function updateValues() {
        this.getNavHeight();
        this.updateContainer();
        this.updateOverlayElement();
        $(this.element).trigger($.Event(Event.RESIZED));
      };

      _proto.updateContainer = function updateContainer() {
        // Don't update min height on the container if the nav is toggled/open.
        if (!this.container || this.navToggled) {
          return;
        }

        this.container.style.minHeight = this.navHeight + "px";
        this.container.style.marginBottom = "-" + this.navHeight + "px";
      };

      _proto.updateOverlayElement = function updateOverlayElement() {
        if (!this.overlayElement || this.navToggled) {
          return;
        }

        this.overlayElement.style.setProperty('padding-top', this.navHeight + "px", 'important');
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this = this;

        $(window).on(Event.RESIZE + " " + Event.ALERT_CLOSE, function () {
          if (!_this.ticking) {
            window.requestAnimationFrame(function () {
              _this.updateValues();

              _this.ticking = false;
            });
            _this.ticking = true;
          }
        });
      };

      _proto.setNavToggleEvents = function setNavToggleEvents() {
        var _this2 = this;

        $(this.element).on("" + Event.TOGGLE_SHOW, function () {
          _this2.navToggled = true;
        }); // navHeight should only be recalculated when the nav is not open/toggled
        // Don't allow the navHeight to be recalculated until the nav is fully hidden

        $(this.element).on("" + Event.TOGGLE_HIDDEN, function () {
          _this2.navToggled = false;
        });
      };

      _proto.setImageLoadEvent = function setImageLoadEvent() {
        var _this3 = this;

        var images = this.container.querySelectorAll(Selector.IMAGE);
        mrUtil.forEach(images, function (index, image) {
          image.addEventListener(Event.IMAGE_LOAD, function () {
            return _this3.updateValues();
          });
        });
      };

      OverlayNav.getContainerElement = function getContainerElement() {
        if (!this.container) {
          this.container = document.querySelector(Selector.CONTAINER);
        }

        return this.container;
      };

      OverlayNav.getFirstOverlayElement = function getFirstOverlayElement() {
        return document.querySelector(Selector.OVERLAY_SECTION + ":not(" + Selector.NAV + ")");
      };

      OverlayNav.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachoverlayNav() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new OverlayNav(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(OverlayNav, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return OverlayNav;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(document).ready(function () {
      var overlayNavElements = $.makeArray($(Selector.OVERLAY_NAV));
      /* eslint-disable no-plusplus */

      for (var i = overlayNavElements.length; i--;) {
        var $overlayNav = $(overlayNavElements[i]);
        OverlayNav.jQueryInterface.call($overlayNav, $overlayNav.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = OverlayNav.jQueryInterface;
    $.fn[NAME].Constructor = OverlayNav;

    $.fn[NAME].noConflict = function overlayNavNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return OverlayNav.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return OverlayNav;
  }(jQuery$1);

  //

  (function ($) {
    var Event = {
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDE: 'hide.bs.collapse'
    };
    var Selector = {
      CONTAINER: 'body > div.navbar-container',
      NAV: '.navbar-container > .navbar'
    };
    var ClassName = {
      TOGGLED_SHOW: 'navbar-toggled-show'
    };
    var container = document.querySelector(Selector.CONTAINER);
    var nav = document.querySelector(Selector.NAV);
    $(container).on(Event.TOGGLE_SHOW + " " + Event.TOGGLE_HIDE, function (evt) {
      var action = evt.type + "." + evt.namespace === Event.TOGGLE_SHOW ? 'add' : 'remove';
      nav.classList[action](ClassName.TOGGLED_SHOW);
    });
  })(jQuery$1);

  //

  (function ($) {
    $(document).on('hide.bs.tab', function (evt) {
      $($(evt.target).attr('href')).find('[data-toggle="popover"]').popover('hide');
    });
    $(document).on('hide.bs.collapse', function (evt) {
      $(evt.target).find('[data-toggle="popover"]').popover('hide');
    });
  })(jQuery$1);

  //

  var mrSticky = function ($) {
    /**
     * Check for scrollMonitor dependency
     * scrollMonitor - https://github.com/stutrek/scrollMonitor
     */
    if (typeof scrollMonitor === 'undefined') {
      throw new Error('mrSticky requires scrollMonitor.js (https://github.com/stutrek/scrollMonitor)');
    }
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */


    var NAME = 'mrSticky';
    var VERSION = '1.4.0';
    var DATA_KEY = 'mr.sticky';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $.fn[NAME];
    var NO_OFFSET = 0;
    var ClassName = {
      FIXED_TOP: 'position-fixed',
      ABSOLUTE_BOTTOM: 'sticky-bottom',
      FIXED_BOTTOM: 'sticky-viewport-bottom',
      SCROLLED: 'scrolled'
    };
    var Css = {
      HEIGHT: 'min-height',
      WIDTH: 'max-width',
      SPACE_TOP: 'top',
      SPACE_BOTTOM: 'bottom'
    };
    var Event = {
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      WINDOW_RESIZE: 'resize',
      ALERT_CLOSED: 'closed.bs.alert',
      TOGGLE_SHOW: 'show.bs.collapse',
      TOGGLE_HIDDEN: 'hidden.bs.collapse'
    };
    var Options = {
      BELOW_NAV: 'below-nav',
      TOP: 'top',
      BOTTOM: 'bottom'
    };
    var Selector = {
      DATA_ATTR: 'sticky',
      DATA_STICKY: '[data-sticky]',
      NAV_STICKY: 'body > div.navbar-container [data-sticky="top"]',
      ALERT: '.alert-dismissible'
    };
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

    var Sticky =
    /*#__PURE__*/
    function () {
      function Sticky(element) {
        var $element = $(element);
        var stickyData = $element.data(Selector.DATA_ATTR);
        var stickyUntil = $element.closest('section') || null;
        this.element = element;
        this.stickBelowNav = stickyData === Options.BELOW_NAV;
        this.stickBottom = stickyData === Options.BOTTOM;
        this.stickyUntil = stickyUntil;
        this.navToggled = false;
        this.updateNavProperties();
        this.isNavElement = $element.is(this.navElement);
        this.initWatcher($element);
        this.updateCss();
        this.setResizeEvent(); // Run a calculation immediately to show sticky elements if page starts
        // at a half-scrolled position

        this.onWatcherChange($element);
        this.ticking = false; // for debouncing resize event with RequestAnimationFrame

        if (this.isNavElement) {
          this.setNavToggleEvents();
        }
      } // getters


      var _proto = Sticky.prototype;

      _proto.initWatcher = function initWatcher(element) {
        var _this = this;

        var $element = $(element);
        var notNavElement = !this.isNavElement;
        var offset = this.stickBelowNav && this.navIsSticky && notNavElement ? {
          top: this.navHeight
        } : NO_OFFSET;
        offset = this.stickBottom && notNavElement ? {
          bottom: -$element.outerHeight
        } : offset;
        var watcher = scrollMonitor.create(element, offset); // ensure that we're always watching the place the element originally was

        watcher.lock();
        var untilWatcher = this.stickyUntil !== null ? scrollMonitor.create(this.stickyUntil, {
          bottom: -(watcher.height + offset.top)
        }) : null;
        this.watcher = watcher;
        this.untilWatcher = untilWatcher;
        this.navHeight = this.navHeight; // For navs that start at top, stick them immediately to avoid a jump

        if (this.isNavElement && watcher.top === 0 && !this.navIsAbsolute) {
          $element.addClass(ClassName.FIXED_TOP);
        }

        watcher.stateChange(function () {
          _this.onWatcherChange($element);
        });

        if (untilWatcher !== null) {
          untilWatcher.exitViewport(function () {
            // If the element is in a section, it will scroll up with the section
            $element.addClass(ClassName.ABSOLUTE_BOTTOM);
          });
          untilWatcher.enterViewport(function () {
            $element.removeClass(ClassName.ABSOLUTE_BOTTOM);
          });
        }
      };

      _proto.onWatcherChange = function onWatcherChange($element) {
        // Add fixed when element leaves via top of viewport or if nav is sitting at top
        $element.toggleClass(ClassName.FIXED_TOP, this.watcher.isAboveViewport || !this.navIsAbsolute && !this.stickBottom && this.isNavElement && this.watcher.top === 0); // Used to apply styles to the nav based on "scrolled" class
        // independedly of position-fixed because that class is used for more practical reasons
        // such as avoiding a jump on first scroll etc.

        $element.toggleClass(ClassName.SCROLLED, this.watcher.isAboveViewport && this.isNavElement && !this.stickBottom); // Fix to bottom when element enters via bottom of viewport and has data-sticky="bottom"

        $element.toggleClass(ClassName.FIXED_BOTTOM, (this.watcher.isFullyInViewport || this.watcher.isAboveViewport) && this.stickBottom);

        if (!this.stickBottom) {
          $element.css(Css.SPACE_TOP, this.watcher.isAboveViewport && this.navIsSticky && this.stickBelowNav ? this.navHeight : NO_OFFSET);
        }
      };

      _proto.setResizeEvent = function setResizeEvent() {
        var _this2 = this;

        // Closing any alerts above the nav will mean we need to recalculate position.
        $(Selector.ALERT).on(Event.ALERT_CLOSED, function () {
          // An alert above the nav will cause odd sticky behaviour if
          // the alert is dismissed and nav position is not recalculated,
          // as scrollMonitor has locked the position of the watcher.
          // Unlock and recalculate if the nav is in the viewport during alert close event.
          if (_this2.watcher.isInViewport) {
            _this2.watcher.unlock();

            _this2.watcher.recalculateLocation();

            _this2.watcher.lock();
          }

          _this2.onResize();
        });
        $(window).on(Event.WINDOW_RESIZE, function () {
          _this2.onResize();
        });
      };

      _proto.onResize = function onResize() {
        var _this3 = this;

        if (!this.ticking) {
          window.requestAnimationFrame(function () {
            _this3.updateCss();

            _this3.ticking = false;
          });
          this.ticking = true;
        }
      };

      _proto.setNavToggleEvents = function setNavToggleEvents() {
        var _this4 = this;

        $(this.element).on("" + Event.TOGGLE_SHOW, function () {
          _this4.navToggled = true;
        }); // navHeight should only be recalculated when the nav is not open/toggled
        // Don't allow the navHeight to be recalculated until the nav is fully hidden

        $(this.element).on("" + Event.TOGGLE_HIDDEN, function () {
          _this4.navToggled = false;
        });
      };

      _proto.updateCss = function updateCss() {
        var $element = $(this.element); // Fix width by getting parent's width to avoid element spilling out when pos-fixed

        $element.css(Css.WIDTH, $element.parent().width());
        this.updateNavProperties();
        var elemHeight = $element.outerHeight();
        var notNavElement = !this.isNavElement; // Set a min-height to prevent "jumping" when sticking to top
        // but not applied to the nav element itself unless it is overlay (absolute) nav

        if (!this.navIsAbsolute && this.isNavElement || notNavElement) {
          // navHeight should only be recalculated when the nav is not open/toggled
          // Don't allow the navHeight to be set until the nav is fully hidden
          if (!this.navToggled) {
            $element.parent().css(Css.HEIGHT, elemHeight);
          }
        }

        if (this.navIsSticky && notNavElement) {
          $element.css(Css.HEIGHT, elemHeight);
        }
      };

      _proto.updateNavProperties = function updateNavProperties() {
        var $navElement = this.navElement || $(Selector.NAV_STICKY).first();
        this.navElement = $navElement;
        this.navHeight = $navElement.outerHeight();
        this.navIsAbsolute = $navElement.css('position') === 'absolute';
        this.navIsSticky = $navElement.length > 0;
      };

      Sticky.jQueryInterface = function jQueryInterface() {
        return this.each(function jqEachSticky() {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Sticky(this);
            $element.data(DATA_KEY, data);
          }
        });
      };

      _createClass(Sticky, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Sticky;
    }();
    /**
     * ------------------------------------------------------------------------
     * Initialise by data attribute
     * ------------------------------------------------------------------------
     */


    $(window).on(Event.LOAD_DATA_API, function () {
      var stickyElements = $.makeArray($(Selector.DATA_STICKY));
      /* eslint-disable no-plusplus */

      for (var i = stickyElements.length; i--;) {
        var $sticky = $(stickyElements[i]);
        Sticky.jQueryInterface.call($sticky, $sticky.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    /* eslint-disable no-param-reassign */

    $.fn[NAME] = Sticky.jQueryInterface;
    $.fn[NAME].Constructor = Sticky;

    $.fn[NAME].noConflict = function StickyNoConflict() {
      $.fn[NAME] = JQUERY_NO_CONFLICT;
      return Sticky.jQueryInterface;
    };
    /* eslint-enable no-param-reassign */


    return Sticky;
  }(jQuery$1);

  //

  var ceil = Math.ceil;
  var floor = Math.floor;

  // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger
  var toInteger = function (argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function (it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  // `String.prototype.{ codePointAt, at }` methods implementation
  var createMethod = function (CONVERT_TO_STRING) {
    return function ($this, pos) {
      var S = String(requireObjectCoercible($this));
      var position = toInteger(pos);
      var size = S.length;
      var first, second;
      if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
      first = S.charCodeAt(position);
      return first < 0xD800 || first > 0xDBFF || position + 1 === size
        || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
          ? CONVERT_TO_STRING ? S.charAt(position) : first
          : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
    };
  };

  var stringMultibyte = {
    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    codeAt: createMethod(false),
    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    charAt: createMethod(true)
  };

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var O = 'object';
  var check = function (it) {
    return it && it.Math == Math && it;
  };

  // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  var global_1 =
    // eslint-disable-next-line no-undef
    check(typeof globalThis == O && globalThis) ||
    check(typeof window == O && window) ||
    check(typeof self == O && self) ||
    check(typeof commonjsGlobal == O && commonjsGlobal) ||
    // eslint-disable-next-line no-new-func
    Function('return this')();

  var fails = function (exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var document$1 = global_1.document;
  // typeof document.createElement is 'object' in old IE
  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function (it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  // Thank's IE8 for his funny defineProperty
  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function () { return 7; }
    }).a != 7;
  });

  var anObject = function (it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    } return it;
  };

  // `ToPrimitive` abstract operation
  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var toPrimitive = function (input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var nativeDefineProperty = Object.defineProperty;

  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  var f = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var objectDefineProperty = {
  	f: f
  };

  var createPropertyDescriptor = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function (key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    } return value;
  };

  var shared = createCommonjsModule(function (module) {
  var SHARED = '__core-js_shared__';
  var store = global_1[SHARED] || setGlobal(SHARED, {});

  (module.exports = function (key, value) {
    return store[key] || (store[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.2.1',
    mode:  'global',
  });
  });

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global_1.WeakMap;

  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var id = 0;
  var postfix = Math.random();

  var uid = function (key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function (key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function (it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function (TYPE) {
    return function (it) {
      var state;
      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      } return state;
    };
  };

  if (nativeWeakMap) {
    var store = new WeakMap$1();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;
    set = function (it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };
    get = function (it) {
      return wmget.call(store, it) || {};
    };
    has$1 = function (it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;
    set = function (it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };
    get = function (it) {
      return has(it, STATE) ? it[STATE] : {};
    };
    has$1 = function (it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // Nashorn ~ JDK8 bug
  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

  // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
  var f$1 = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;

  var objectPropertyIsEnumerable = {
  	f: f$1
  };

  var toString = {}.toString;

  var classofRaw = function (it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split;

  // fallback for non-array-like ES3 and non-enumerable old V8 strings
  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // toObject with fallback for non-array-like ES3 strings



  var toIndexedObject = function (it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
  var f$2 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) { /* empty */ }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };

  var objectGetOwnPropertyDescriptor = {
  	f: f$2
  };

  var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');

  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });

  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;
    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
    if (O === global_1) {
      if (simple) O[key] = value;
      else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }
    if (simple) O[key] = value;
    else hide(O, key, value);
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
  });

  var path = global_1;

  var aFunction = function (variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function (namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
      : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var min = Math.min;

  // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength
  var toLength = function (argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min;

  // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
  var toAbsoluteIndex = function (index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  // `Array.prototype.{ indexOf, includes }` methods implementation
  var createMethod$1 = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod$1(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod$1(false)
  };

  var indexOf = arrayIncludes.indexOf;


  var objectKeysInternal = function (object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = [
    'constructor',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable',
    'toLocaleString',
    'toString',
    'valueOf'
  ];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
  	f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;

  var objectGetOwnPropertySymbols = {
  	f: f$4
  };

  // all object keys, includes non-enumerable and symbols
  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function (target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function (feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true
      : value == NATIVE ? false
      : typeof detection == 'function' ? fails(detection)
      : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';

  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */
  var _export = function (options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;
    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }
    if (target) for (key in source) {
      sourceProperty = source[key];
      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];
      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
      // contained in target
      if (!FORCED && targetProperty !== undefined) {
        if (typeof sourceProperty === typeof targetProperty) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      }
      // add a flag to not completely full polyfills
      if (options.sham || (targetProperty && targetProperty.sham)) {
        hide(sourceProperty, 'sham', true);
      }
      // extend global
      redefine(target, key, sourceProperty, options);
    }
  };

  // `ToObject` abstract operation
  // https://tc39.github.io/ecma262/#sec-toobject
  var toObject = function (argument) {
    return Object(requireObjectCoercible(argument));
  };

  var correctPrototypeGetter = !fails(function () {
    function F() { /* empty */ }
    F.prototype.constructor = null;
    return Object.getPrototypeOf(new F()) !== F.prototype;
  });

  var IE_PROTO = sharedKey('IE_PROTO');
  var ObjectPrototype = Object.prototype;

  // `Object.getPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.getprototypeof
  var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
    O = toObject(O);
    if (has(O, IE_PROTO)) return O[IE_PROTO];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectPrototype : null;
  };

  var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
    // Chrome 38 Symbol has incorrect toString conversion
    // eslint-disable-next-line no-undef
    return !String(Symbol());
  });

  var Symbol$1 = global_1.Symbol;
  var store$1 = shared('wks');

  var wellKnownSymbol = function (name) {
    return store$1[name] || (store$1[name] = nativeSymbol && Symbol$1[name]
      || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
  };

  var ITERATOR = wellKnownSymbol('iterator');
  var BUGGY_SAFARI_ITERATORS = false;

  var returnThis = function () { return this; };

  // `%IteratorPrototype%` object
  // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
  var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  if ([].keys) {
    arrayIterator = [].keys();
    // Safari 8 has buggy iterators w/o `next`
    if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
    else {
      PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
      if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
    }
  }

  if (IteratorPrototype == undefined) IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  if ( !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);

  var iteratorsCore = {
    IteratorPrototype: IteratorPrototype,
    BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  };

  // `Object.keys` method
  // https://tc39.github.io/ecma262/#sec-object.keys
  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    anObject(O);
    var keys = objectKeys(Properties);
    var length = keys.length;
    var index = 0;
    var key;
    while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
    return O;
  };

  var html = getBuiltIn('document', 'documentElement');

  var IE_PROTO$1 = sharedKey('IE_PROTO');

  var PROTOTYPE = 'prototype';
  var Empty = function () { /* empty */ };

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = documentCreateElement('iframe');
    var length = enumBugKeys.length;
    var lt = '<';
    var script = 'script';
    var gt = '>';
    var js = 'java' + script + ':';
    var iframeDocument;
    iframe.style.display = 'none';
    html.appendChild(iframe);
    iframe.src = String(js);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];
    return createDict();
  };

  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  var objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE] = anObject(O);
      result = new Empty();
      Empty[PROTOTYPE] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : objectDefineProperties(result, Properties);
  };

  hiddenKeys[IE_PROTO$1] = true;

  var defineProperty = objectDefineProperty.f;



  var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  var setToStringTag = function (it, TAG, STATIC) {
    if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
      defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
    }
  };

  var iterators = {};

  var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





  var returnThis$1 = function () { return this; };

  var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
    var TO_STRING_TAG = NAME + ' Iterator';
    IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
    setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
    iterators[TO_STRING_TAG] = returnThis$1;
    return IteratorConstructor;
  };

  var aPossiblePrototype = function (it) {
    if (!isObject(it) && it !== null) {
      throw TypeError("Can't set " + String(it) + ' as a prototype');
    } return it;
  };

  // `Object.setPrototypeOf` method
  // https://tc39.github.io/ecma262/#sec-object.setprototypeof
  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */
  var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
    var CORRECT_SETTER = false;
    var test = {};
    var setter;
    try {
      setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
      setter.call(test, []);
      CORRECT_SETTER = test instanceof Array;
    } catch (error) { /* empty */ }
    return function setPrototypeOf(O, proto) {
      anObject(O);
      aPossiblePrototype(proto);
      if (CORRECT_SETTER) setter.call(O, proto);
      else O.__proto__ = proto;
      return O;
    };
  }() : undefined);

  var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
  var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
  var ITERATOR$1 = wellKnownSymbol('iterator');
  var KEYS = 'keys';
  var VALUES = 'values';
  var ENTRIES = 'entries';

  var returnThis$2 = function () { return this; };

  var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
    createIteratorConstructor(IteratorConstructor, NAME, next);

    var getIterationMethod = function (KIND) {
      if (KIND === DEFAULT && defaultIterator) return defaultIterator;
      if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
      switch (KIND) {
        case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
        case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
        case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
      } return function () { return new IteratorConstructor(this); };
    };

    var TO_STRING_TAG = NAME + ' Iterator';
    var INCORRECT_VALUES_NAME = false;
    var IterablePrototype = Iterable.prototype;
    var nativeIterator = IterablePrototype[ITERATOR$1]
      || IterablePrototype['@@iterator']
      || DEFAULT && IterablePrototype[DEFAULT];
    var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
    var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
    var CurrentIteratorPrototype, methods, KEY;

    // fix native
    if (anyNativeIterator) {
      CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
      if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
        if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
          if (objectSetPrototypeOf) {
            objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
          } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
            hide(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
          }
        }
        // Set @@toStringTag to native iterators
        setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
      }
    }

    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return nativeIterator.call(this); };
    }

    // define iterator
    if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
      hide(IterablePrototype, ITERATOR$1, defaultIterator);
    }
    iterators[NAME] = defaultIterator;

    // export additional methods
    if (DEFAULT) {
      methods = {
        values: getIterationMethod(VALUES),
        keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
        entries: getIterationMethod(ENTRIES)
      };
      if (FORCED) for (KEY in methods) {
        if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
          redefine(IterablePrototype, KEY, methods[KEY]);
        }
      } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
    }

    return methods;
  };

  var charAt = stringMultibyte.charAt;



  var STRING_ITERATOR = 'String Iterator';
  var setInternalState = internalState.set;
  var getInternalState = internalState.getterFor(STRING_ITERATOR);

  // `String.prototype[@@iterator]` method
  // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
  defineIterator(String, 'String', function (iterated) {
    setInternalState(this, {
      type: STRING_ITERATOR,
      string: String(iterated),
      index: 0
    });
  // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
  }, function next() {
    var state = getInternalState(this);
    var string = state.string;
    var index = state.index;
    var point;
    if (index >= string.length) return { value: undefined, done: true };
    point = charAt(string, index);
    state.index += point.length;
    return { value: point, done: false };
  });

  var aFunction$1 = function (it) {
    if (typeof it != 'function') {
      throw TypeError(String(it) + ' is not a function');
    } return it;
  };

  // optional / simple context binding
  var bindContext = function (fn, that, length) {
    aFunction$1(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 0: return function () {
        return fn.call(that);
      };
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  // call something on iterator step with safe closing on error
  var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
    try {
      return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
    } catch (error) {
      var returnMethod = iterator['return'];
      if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
      throw error;
    }
  };

  var ITERATOR$2 = wellKnownSymbol('iterator');
  var ArrayPrototype = Array.prototype;

  // check on default Array iterator
  var isArrayIteratorMethod = function (it) {
    return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR$2] === it);
  };

  var createProperty = function (object, key, value) {
    var propertyKey = toPrimitive(key);
    if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
    else object[propertyKey] = value;
  };

  var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
  // ES3 wrong here
  var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (error) { /* empty */ }
  };

  // getting tag from ES6+ `Object.prototype.toString`
  var classof = function (it) {
    var O, tag, result;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
      // @@toStringTag case
      : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag
      // builtinTag case
      : CORRECT_ARGUMENTS ? classofRaw(O)
      // ES3 arguments fallback
      : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
  };

  var ITERATOR$3 = wellKnownSymbol('iterator');

  var getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
      || it['@@iterator']
      || iterators[classof(it)];
  };

  // `Array.from` method implementation
  // https://tc39.github.io/ecma262/#sec-array.from
  var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var argumentsLength = arguments.length;
    var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iteratorMethod = getIteratorMethod(O);
    var length, result, step, iterator;
    if (mapping) mapfn = bindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
    // if the target is not iterable or it's an array with the default iterator - use a simple case
    if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
      iterator = iteratorMethod.call(O);
      result = new C();
      for (;!(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping
          ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
          : step.value
        );
      }
    } else {
      length = toLength(O.length);
      result = new C(length);
      for (;length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  };

  var ITERATOR$4 = wellKnownSymbol('iterator');
  var SAFE_CLOSING = false;

  try {
    var called = 0;
    var iteratorWithReturn = {
      next: function () {
        return { done: !!called++ };
      },
      'return': function () {
        SAFE_CLOSING = true;
      }
    };
    iteratorWithReturn[ITERATOR$4] = function () {
      return this;
    };
    // eslint-disable-next-line no-throw-literal
    Array.from(iteratorWithReturn, function () { throw 2; });
  } catch (error) { /* empty */ }

  var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
    if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
    var ITERATION_SUPPORT = false;
    try {
      var object = {};
      object[ITERATOR$4] = function () {
        return {
          next: function () {
            return { done: ITERATION_SUPPORT = true };
          }
        };
      };
      exec(object);
    } catch (error) { /* empty */ }
    return ITERATION_SUPPORT;
  };

  var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
    Array.from(iterable);
  });

  // `Array.from` method
  // https://tc39.github.io/ecma262/#sec-array.from
  _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
    from: arrayFrom
  });

  var from_1 = path.Array.from;

  //

  if (mrUtil.isIE()) {
    window.addEventListener('load', function () {
      svgInjector.SVGInjector(document.querySelectorAll('[class][data-inject-svg]'));
    });
    svgInjector.SVGInjector(document.querySelectorAll('[data-inject-svg]'));
  } else {
    svgInjector.SVGInjector(document.querySelectorAll('[data-inject-svg]'));
  }

  //

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=theme.js.map
