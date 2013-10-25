(function($, window, undefined, I){
    var Kreyos = {
        elements: {},

        _bindVendors: function() {
            var self = this;

            // CSS Sliders
            this.elements.sliders.cssSlider();
        },

        _bindEvents: function() {
            var self = this;

            this.featureModesSlider();
            this.buildYourOwn();
            this.smoothScroll();
            this.footerCollapse();

        },

        _getElements: function(){
            this.elements.window = $(window);
            this.elements.pageContainer = $('.page-container');
            this.elements.sliders = $('.css-slider');
            this.elements.smoothLinks = $('.smooth-scroll');

            this.elements.featureModesSection = $('#feature-modes');
            this.elements.bgSlider = this.elements.featureModesSection.find('#bg-slider');
            this.elements.fmContentSlider = this.elements.featureModesSection.find('#fm-content-slider');
            this.elements.fmSliderNavEls = $('#feature-modes-slider-nav a, #fm-content-slider-wrap .slide a');
            this.elements.fmSliderNavPointer = $('#fm-nav-active-pointer');

            this.elements.footer = $('#footer');
            this.elements.footerCollapseWrap = $('#collapsing-footer-lists');
            this.elements.footerCollapseLinks = this.elements.footerCollapseWrap.find('h5');

            this.elements.builder = $('#watch-customizer');
            this.elements.builderTypeButtons = this.elements.builder.find('#pick-a-style li');
            this.elements.builderGenderButtons = this.elements.builder.find('#pick-a-gender li');
            this.elements.builderColorButtons = this.elements.builder.find('#pick-a-color li');
            this.elements.meteorPreview = $('#meteor-preview');
        },

        // Feature Modes slider
        featureModesSlider: function() {
            var self = this;

            this.elements.window.yAxis('attach', function(){
                var padding = 100;
                var offset = self.elements.featureModesSection.offset().top - self.elements.window.height()/2;
                return offset - padding;
            }, function(){
                self.elements.bgSlider.parent().addClass('show');
                self.elements.fmContentSlider.parent().addClass('show');
            });

            self.elements.fmSliderNavEls.on('click', function(e){
                e.preventDefault();
                var index = $(this).data('index');
                self.elements.bgSlider.cssSlider('goTo', index);
                self.elements.fmContentSlider.cssSlider('goTo', index);
                self.elements.bgSlider.cssSlider('autoPlay', false);
                self.elements.fmContentSlider.cssSlider('autoPlay', false);

                self.elements.fmSliderNavEls.removeClass('active');
                self.elements.fmSliderNavEls.filter('[data-index="' + index + '"]').addClass('active');

                self.elements.fmSliderNavPointer.removeClass().addClass( 'active-' + index );
            });

        },

        // Builder/customizer
        buildYourOwn: function() {
            var self = this;
            var color = 'white';
            var gender = 'male';
            var type = 'watch';

            this.elements.builderTypeButtons.on( 'click', function(e) {
                e.preventDefault();
                type = $(this).data('type');
                self.updatePreview(type, gender, color);

                self.elements.builderTypeButtons.removeClass('active');
                $(this).addClass('active');

                if( type == 'watch' ) {
                    $('#pick-a-gender').addClass('draw-line');
                } else {
                    $('#pick-a-gender').removeClass('draw-line');
                }
            });

            this.elements.builderGenderButtons.on( 'click', function(e) {
                e.preventDefault();
                gender = $(this).data('gender');
                self.updatePreview(type, gender, color);

                self.elements.builderGenderButtons.removeClass('active');
                $(this).addClass('active');
            });

            this.elements.builderColorButtons.on( 'click', function(e) {
                e.preventDefault();
                color = $(this).data('color');
                self.updatePreview(type, gender, color);

                self.elements.builderColorButtons.removeClass('active');
                $(this).addClass('active');
            });
        },

        updatePreview: function(type, gender, color) {
            if( type == 'watch' ) {
                var preview = type + '-' + gender + '-' + color + '.jpg';
            } else {
                var preview = type + '-' + color + '.jpg';
            }
            this.elements.meteorPreview.find('img').attr('src', '/assets/home/builder/' + preview);
            this.elements.meteorPreview.removeClass().addClass(type);
        },

        // Adjust the footer for small screens
        footerCollapse: function() {
            var self = this;
            var shouldCollapse = false;

            if(window.innerWidth < 768) {
                shouldCollapse = true;
            }

            this.elements.footerCollapseLinks.on('click', function(e) {
                if( shouldCollapse == false ) {
                    return false;
                }
            });

            $( window ).resize( $.throttle( 250, function() {
                if(window.innerWidth < 768) {
                    shouldCollapse = true;
                } else {
                    shouldCollapse = false;
                    self.elements.footerCollapseWrap.find('.collapse').removeAttr("style");
                }
            } ) );

            $('#collapsing-footer-lists .collapse').on('show', function() {
                $(this).parent().addClass('open');
            });

            $('#collapsing-footer-lists .collapse').on('hide', function() {
                $(this).parent().removeClass('open');
            });
        },

        smoothScroll: function() {
            var self = this;

            this.elements.smoothLinks.on( 'click', function(e){
                e.preventDefault();
                var destination = $( this ).attr( 'href' );
                var target = $( destination ).offset().top;
                var topOffset = 60;
                $( 'html, body' ).animate({ scrollTop: target - topOffset }, 810, 'swing' );
            });
        },

        initialize: function(){
            var self = this;

            this._getElements();
            this._bindVendors();
            this._bindEvents();
        }
    };

    // Send to global namespace
    window.Kreyos = Kreyos;

    // DOM Ready
    $(function(){
        Kreyos.initialize();
    });

    $(window).load(function() {
        $('img[data-original]').each(function(){
            $(this).attr('src', $(this).data('original'));
        });
    }); 

})(jQuery, window, null, Impress);
