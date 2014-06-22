    var ModalPop, currentModals = [],modalPop;
    modalPop = (function () {
        var Mod, newMod;
        ModalPop = function (opts) {
            Mod = function (opts) {
                var $modal, calculateToBottom, currentWidth, height, isOpen, options, width;
                height = opts.height || $(opts.element).height();
                width = opts.width || $(opts.element).width();
                options = $.extend({
                    element: null,
                    opened: false,
                    position: "center",
                    cssClass: "",
                    css: {
                        "z-index": 1000,
                        position: "fixed",
                        height: height,
                        width: width,
                        left: ($(document).width() / 2) - (width / 2) + "px",
                        top: 50 + "px"
                    }
                }, opts || {});
                $modal = $("<div>").append($(options.element)).addClass(options.cssClass).css(options.css);
                isOpen = options.opened;
                currentWidth = 0;
                $(options.element).remove();
                $("body").append($modal);
                if (options.opened) {
                    $modal.show();
                }
                else {
                    $modal.hide();
                }
                calculateToBottom = function () {
                    var vp_h;
                    if ($(window).width() <= opts.width + 40) {
                        currentWidth = $(window).width() - 40;
                        options.css.left = "0";
                        options.css.width = "100%";
                        $modal.css(options.css);
                    }
                    else {
                        vp_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        options.css.left = ($(document).width() / 2) - (width / 2) + "px";
                        options.css.width = currentWidth || opts.width;
                        options.css.top = ((vp_h / 2) / 2) + "px";
                        $modal.css(options.css);
                    }
                };
                return {
                    open: function () {
                        calculateToBottom();
                        $.each(currentModals, function () {
                            var mo;
                            mo = this;
                            if (mo.opened() === true) {
                                mo.close();
                            }
                        });
                        $modal.fadeIn();
                        isOpen = true;
                    },
                    close: function () {
                        calculateToBottom();
                        $modal.fadeOut();
                        isOpen = false;
                    },
                    reLayout: calculateToBottom,
                    opened: function () {
                        return isOpen;
                    }
                };
            };
            newMod = new Mod(opts);
            currentModals.push(newMod);
            return newMod;
        };
        return ModalPop;
    }());
