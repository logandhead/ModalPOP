    var modalPop = (function () {
        //array to keep all active modal objects
        var currentModals = [];
        //ModalPop
        var ModalPop = function (opts) {
            var mod = function (opts) {
                var $modal, calculateToBottom, currentWidth, height, isOpen, options, width;
                height = opts.height || $(opts.element).height();
                width = opts.width || $(opts.element).width();
                options = $.extend({
                    element: null, //modal element
                    opened: false, //show modal on init
                    position: "center", //position //todo need to allow for different positions
                    cssClass: "",//css class of modal
                    css: {
                        "z-index": 1000,
                        position: "fixed",
                        height: height,
                        width: width,
                        left: ($(document).width() / 2) - (width / 2) + "px",
                        top: 50 + "px"
                    }
                }, opts || {});

                //append modal
                $modal = $("<div>").append($(options.element)).addClass(options.cssClass).css(options.css);
                isOpen = options.opened;
                currentWidth = 0;
                $(options.element).remove();
                //append to body hidden or visible depending on options.opened state
                $("body").append($modal);
                if (options.opened) {
                    $modal.show();
                } else {
                    $modal.hide();
                }
                //calculations for cenrtering modal
                calculateToBottom = function () {
                    var vp_h;
                    if ($(window).width() <= opts.width + 40) {
                        currentWidth = $(window).width() - 40;
                        options.css.left = "0";
                        options.css.width = "100%";
                        $modal.css(options.css);
                    } else {
                        vp_h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        options.css.left = ($(document).width() / 2) - (width / 2) + "px";
                        options.css.width = currentWidth || opts.width;
                        options.css.top = ((vp_h / 2) / 2) + "px";
                        $modal.css(options.css);
                    }
                };
                return {
                    open: function () {

                        //recalculate
                        calculateToBottom();
                        //determine if any modals are open
                        $.each(currentModals, function (m) {
                            var mo;
                            mo = this;
                            if (mo.opened() === true) {
                                //close active modal
                                mo.close();
                            }
                        });
                        //show requested modal
                        console.log($modal)
                        $modal.fadeIn();
                        //set to open state
                        isOpen = true;
                    },
                    close: function () {
                        //recalculate
                        calculateToBottom();
                        //fadeOut Modal
                        $modal.fadeOut();
                        //not open
                        isOpen = false;
                    },
                    //calculates the neccesary measurements for modal to be centered
                    reLayout: calculateToBottom,
                    //determines if modal is open
                    opened: function () {
                        return isOpen;
                    }


                };
            }
            var newMod = new mod(opts);
            currentModals.push(newMod);
            return newMod;
        };

        return ModalPop;
    })();
