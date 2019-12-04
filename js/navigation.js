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
        self.onScrollLevel(self.nav_bar, self.ele_width, window);
        self.onScrollVertical(self.nav_bar, self.container, window);
    }

    // 原型链上提供的方法
    navigation.prototype = {
        // 设置锚点
        setAnchorPoint: function (ele_nav, ele_container) {
            $(ele_container).find('div[data-anchor="true"]').each(function (index, element) {
                $(element).attr('id', 'nav_link_' + index);
                $(element).addClass('hidden_nav');
            });
            // 锚点对上偏移导航高度
            var nav_height = $(ele_nav).outerHeight();
            $('.hidden_nav').each(function () {
                $(this).css({ 'top': -(nav_height * 2 - 5) });
            });
            
            $(ele_nav).children().eq(0).find('.nav_bar_item').each(function (index, element) {
                $(element).attr('href', '#nav_link_' + index);
            });

            $(ele_nav).children().eq(0).find('.nav_bar_item').each(function (index, element) {
                $(this).on('click', function () {
                    var obj = $(this);
                    obj.addClass('linkActive').siblings().removeClass('linkActive');
                    if (index == 0) {
                        $(ele_nav).css({ 'position': 'relative', 'top': 'auto', 'z-index': 9 });
                    } else {
                        $(ele_nav).css({ 'position': 'fixed', 'top': '0', 'z-index': 99 });
                    }
                });
            });
        },
        // 导航栏水平滑动
        onScrollLevel: function (ele_nav, ele_width, window) {
            $(window).scroll(function () {
                var temNavList = [];
                var activityIndex = null;
                $(ele_nav).children().eq(0).find('.nav_bar_item').each(function (index, element) {
                    temNavList.push($(element).width());
                    if ($(this).hasClass('linkActive')) {
                        activityIndex = index + 1;
                    }
                });

                // ele_width是每个元素宽度
                if (activityIndex) {
                    // $(ele_nav).children().eq(0).scrollLeft((activityIndex - 1) * ele_width);
                    var timer = setTimeout(function () {
                        $(ele_nav).children().eq(0).stop().animate({
                            scrollLeft: (activityIndex - 1) * ele_width + 'px'
                        }, 'fast', 'linear');
                        clearTimeout(timer);
                    }, 100);
                }
            });
        },
        // 内容竖直方向滑动
        onScrollVertical: function (ele_nav, ele_container, window) {
            $(window).scroll(function () {
                var top = $(window).scrollTop();
                var temlist = [];
                if (top >= ($(ele_nav).prev().outerHeight() + $(ele_nav).prev().offset().top)) {
                    $(ele_nav).css({ 'position': 'fixed', 'top': '0', 'z-index': 99 });
                    $(ele_container).find('div[data-anchor="true"]').each(function (index, element) {
                        temlist.push($(element).offset().top);
                    });
                    temlist.map(function (value, index, arr) {
                        // 10为设置的多的偏移量,防止刚刚好滑到这个地方时出错
                        if (value <= top + 10) {
                            if (index != arr.length - 1) {
                                if (temlist[index + 1] > top + 10) {
                                    $($(ele_nav).children().eq(0).find('.nav_bar_item')[index]).addClass('linkActive').siblings().removeClass('linkActive');
                                }
                            } else {
                                if (temlist[index] <= top + 10) {
                                    $($(ele_nav).children().eq(0).find('.nav_bar_item')[index]).addClass('linkActive').siblings().removeClass('linkActive');
                                }
                            }
                        }
                    });
                } else {
                    $(ele_nav).css({ 'position': 'relative', 'top': 'auto', 'z-index': 9 });
                    $($(ele_nav).children().eq(0).find('.nav_bar_item')[0]).addClass('linkActive').siblings().removeClass('linkActive');
                }
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