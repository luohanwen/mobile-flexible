/**
 * 提供一些共用的方法
 * 支持 CommonJs(nodejs) amd(require.js) cmd(seajs) 浏览器全局变量(window)
 * @author haven
 */
(function (root, factory) {
    //CommonJs  代表服务器端node.js
    if (typeof exports === "object" && module === "object") {
        module.exports = factory();
    }
    //amd 代表客户端 require.js
    else if (typeof define === "function" && define.amd) {
        define([], factory);
    }
    //cmd 代表客户端 seajs
    else if (typeof define === "function") {
        define(function () {
            return factory();
        });
    }
    //浏览器本地环境 window
    else {
        root["hvCommon"] = factory();
    }
})(this, function () {
    var doc = document;
    var hvCommon = {
        validate: {
            //只能是汉字
            isChinese: function (obj) {
                return /^[\u4E00-\u9FA5]+$/.test(obj);
            },
            //只能是英文字母
            isEnglishLetter: function (obj) {
                return /^[a-zA-Z]*$/.test(obj);
            },
            //只能是数字
            isNumber: function (obj) {
                return /^[0-9]+$/.test(obj);
            },
            //只能是数字或英文字母
            isNumberOrLetter: function (obj) {
                return /^[0-9a-zA-Z]*$/.test(obj);
            },
            isEmail: function (obj) {
                return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
                    obj
                );
            },
            //是否是手机号码
            isTel: function (obj) {
                return /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(
                    obj
                );
            }
        },
        //数据类型
        dataType: {
            isArray: function (value) {
                return (
                    Object.prototype.toString.call(value) === "[object Array]"
                );
            }
        },
        //除
        accDiv: function (arg1, arg2) {
            var t1 = 0,
                t2 = 0,
                r1,
                r2;
            try {
                t1 = arg1.toString().split(".")[1].length;
            } catch (e) { }
            try {
                t2 = arg2.toString().split(".")[1].length;
            } catch (e) { }
            with (Math) {
                r1 = Number(arg1.toString().replace(".", ""));
                r2 = Number(arg2.toString().replace(".", ""));
                return accMul(r1 / r2, pow(10, t2 - t1));
            }
        },
        //乘法
        accMul: function (arg1, arg2) {
            var m = 0,
                s1 = arg1.toString(),
                s2 = arg2.toString();
            try {
                m += s1.split(".")[1].length;
            } catch (e) { }
            try {
                m += s2.split(".")[1].length;
            } catch (e) { }
            return (
                (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
                Math.pow(10, m)
            );
        },
        //加法
        accAdd: function (arg1, arg2) {
            var r1, r2, m;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            return (arg1 * m + arg2 * m) / m;
        },
        //减法
        subtr: function (arg1, arg2) {
            var r1, r2, m, n;
            try {
                r1 = arg1.toString().split(".")[1].length;
            } catch (e) {
                r1 = 0;
            }
            try {
                r2 = arg2.toString().split(".")[1].length;
            } catch (e) {
                r2 = 0;
            }
            m = Math.pow(10, Math.max(r1, r2));
            n = r1 >= r2 ? r1 : r2;
            return ((arg1 * m - arg2 * m) / m).toFixed(n);
        },
        //获取url参数
        getQueryString: function (name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        clone: function (obj) {
            // if (typeof obj === "object" && !!obj) {
            //     if (obj instanceof Array) {
            //         var newArr = [];
            //         for (var i = 0; i < obj.length; i++) {
            //             newArr.push(this.clone(obj[i]));
            //         }
            //         return newArr;
            //     } else {
            //         var newObj = {};
            //         for (var key in obj) {
            //             newObj[key] = this.clone(obj[key]);
            //         }
            //         return newObj;
            //     }
            // } else {
            //     return obj;
            // }
            var isObject = typeof obj === "object" && obj;
            return isObject ? JSON.parse(JSON.stringify(obj)) : obj;
        },
        /**
         * 日期格式化
         * @param  timestr [单位为秒]
         * @param  {[String]} format  [如 y-m-d h:i:s]
         */
        timeFormat: function (timestr, format) {
            var time = timestr * 1000;
            time = time || 0;
            var date = new Date();
            date.setTime(time);
            var Y = date.getFullYear(),
                M = date.getMonth() + 1,
                D = date.getDate(),
                H = date.getHours(),
                I = date.getMinutes(),
                S = date.getSeconds();

            M = M < 10 ? "0" + M : M;
            D = D < 10 ? "0" + D : D;
            H = H < 10 ? "0" + H : H;
            I = I < 10 ? "0" + I : I;
            S = S < 10 ? "0" + S : S;

            format = format || "";

            var formated = format
                .replace(/y/g, Y)
                .replace(/m/g, M)
                .replace(/d/g, D)
                .replace(/h/g, H)
                .replace(/i/g, I)
                .replace(/s/g, S);
            return formated;
        },
        //判断平台
        platform: {
            isIos: function () {
                return /iP(ad|hone|od)/i.test(navigator.userAgent);
            },

            isAndroid: function () {
                return /Android/i.test(navigator.userAgent);
            },
            isMobile: function () {
                // return /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent);
                return /mobile/i.test(navigator.userAgent);
            },
            isWeixin: function () {
                var ua = navigator.userAgent.toLowerCase();
                if (ua.match(/MicroMessenger/i) == "micromessenger") {
                    return true;
                } else {
                    return false;
                }
            }
        },
        //设置页面标题
        setDocumentTitle(title) {
            var doc = window.document,
                isIos = /iPad|iPhone|iPod/i.test(navigator.userAgent);
            doc.title = title;
            if (isIos) {
                var i = doc.createElement("iframe");
                i.src = "/favicon.ico";
                i.style.display = "none";
                i.onload = function () {
                    setTimeout(function () {
                        i.remove();
                        i = null;
                    }, 9);
                };
                doc.body.appendChild(i);
            }
        },
        //图片转化成base64
        //@url 图片路径
        //@callback 转化后的回调函数
        //@outputFormat 转化后的图片格式，默认'image/png'
        convertImgToBase64: function (url, callback, outputFormat) {
            var canvas = doc.createElement("CANVAS"),
                ctx = canvas.getContext("2d"),
                img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = function () {
                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                var dataURL = canvas.toDataURL(outputFormat || "image/png");
                callback.call(this, dataURL);
                canvas = null;
            };
            img.src = url;
        },
        loadScript: function (url, callBack) {
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readystate) {
                script.onreadystatechange = function () {
                    if (
                        script.readyState == "loaded" ||
                        script.readyState == "complete"
                    ) {
                        callBack();
                        script.onreadystatechange = null;
                    }
                };
            } else {
                script.onload = function (e) {
                    callBack();
                };
            }
            script.src = url;
            document.body.appendChild(script);
        }
    };
    return hvCommon;
});
