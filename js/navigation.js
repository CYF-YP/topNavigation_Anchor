// ;防止跟其他js压缩时报错
; (function (window, document) {
    // 开启严格模式
    "use strict";

    function navigation(options) {
        var self = this;
        if (!options) {
            throw new Error("请传入配置参数");
        }
        self = Object.assign(self, options);
        self.nav_bar = document.querySelector(self.nav_bar) || document.querySelectorAll(self.nav_bar);
        self.container = document.querySelector(self.container) || document.querySelectorAll(self.container);
        self.ele_width = self.ele_width;

        self.setAnchorPoint(self.nav_bar, self.container);
        self.onScrollVertical(self.nav_bar, self.container, self.ele_width, window);
        self.navClick(self.nav_bar, self.ele_width, window);
    }

    // 原型链上提供的方法
    navigation.prototype = {
        // 设置锚点
        setAnchorPoint: function (ele_nav, ele_container) {
            // 导航栏初始设置
            $(ele_container).find('div[data-anchor="true"]').each(function (index, element) {
                $(element).attr('id', 'nav_link_' + index);
                $(element).addClass('hidden_nav');
            });
            // 锚点对上偏移导航高度
            var nav_height = $(ele_nav).outerHeight();
            $('.hidden_nav').each(function () {
                $(this).css({ 'top': -nav_height });
            });
            // 遍历导航栏按钮,并添加锚链接,index
            $(ele_nav).children().eq(0).find('.nav_bar_item').each(function (index, element) {
                $(element).attr('href', '#nav_link_' + index);
                $(element).attr('data-navIndex', index);
            });
        },
        // 导航栏水平滑动
        onScrollLevel: function (ele_nav, ele_width) {
            self.activityIndex = null;
            self.activityIndex = Number($('.linkActive').eq(0).attr('data-navIndex')) + 1;
            if (activityIndex != null) {
                // $(ele_nav).children().eq(0).scrollLeft((self.activityIndex - 1) * ele_width);
                var timer = setTimeout(function () {
                    $(ele_nav).children().eq(0).stop().animate({
                        scrollLeft: (self.activityIndex - 1) * ele_width + 'px'
                    }, 'fast', 'linear');
                    clearTimeout(timer);
                }, 100);
            }
        },
        // 内容竖直方向滑动
        onScrollVertical: function (ele_nav, ele_container, ele_width, window) {
            var _this = this;
            $(window).scroll(function () {
                _this.onScrollLevel(ele_nav, ele_width);
                var top = $(window).scrollTop();
                self.temlist = [];
                if (top >= ($(ele_nav).prev().outerHeight() + $(ele_nav).prev().offset().top)) {
                    $(ele_nav).css({ 'position': 'fixed', 'top': '0', 'z-index': 99 });
                    $(ele_container).find('div[data-anchor="true"]').each(function (index, element) {
                        self.temlist.push($(element).offset().top);
                    });
                    self.temlist.map(function (value, index, arr) {
                        if (value <= top + $(ele_nav).outerHeight()) {
                            if (index != arr.length - 1) {
                                if (self.temlist[index + 1] > top + $(ele_nav).outerHeight()) {
                                    $($(ele_nav).children().eq(0).find('.nav_bar_item')[index]).addClass('linkActive').siblings().removeClass('linkActive');
                                }
                            } else {
                                $($(ele_nav).children().eq(0).find('.nav_bar_item')[index]).addClass('linkActive').siblings().removeClass('linkActive');
                            }
                        }
                    });
                } else {
                    $(ele_nav).css({ 'position': 'relative', 'top': 'auto', 'z-index': 9 });
                    $($(ele_nav).children().eq(0).find('.nav_bar_item')[0]).addClass('linkActive').siblings().removeClass('linkActive');
                }
            });
        },
        // 导航栏按钮点击事件
        navClick: function (ele_nav, ele_width, window) {
            var _this = this;
            $(ele_nav).children().eq(0).find('.nav_bar_item').on('click', function () {
                var obj = $(this);
                obj.addClass('linkActive').siblings().removeClass('linkActive');
                if (obj.attr('data-navIndex') == 0) {
                    $(ele_nav).css({ 'position': 'relative', 'top': 'auto', 'z-index': 9 });
                    var timer = setTimeout(function () {
                        $(window).scrollTop(0);
                        clearTimeout(timer);
                    }, 100);
                } else {
                    $(ele_nav).css({ 'position': 'fixed', 'top': '0', 'z-index': 99 });
                }
                _this.onScrollLevel(ele_nav, ele_width);
            });
        }
    }

    // 兼容CommonJs规范
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = navigation;
    };

    // 兼容AMD/CMD规范
    if (typeof define === 'function') define(function () {
        return navigation;
    });

    // 注册全局变量,兼容使用script标签引入插件
    window.navigation = navigation;
})(window, document);