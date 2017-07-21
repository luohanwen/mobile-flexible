/**
 * 提供一些共用的方法
 * @param {Object} win
 * @param {Object} doc
 * @author haven
 */
(function(win, doc) {
	var hvCommon = {
		//图片转化成base64
		//@url 图片路径
		//@callback 转化后的回调函数
		//@outputFormat 转化后的图片格式，默认'image/png'
		convertImgToBase64: function(url, callback, outputFormat) {
			var canvas = doc.createElement('CANVAS'),
				ctx = canvas.getContext('2d'),
				img = new Image;
			img.crossOrigin = 'Anonymous';
			img.onload = function() {
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				var dataURL = canvas.toDataURL(outputFormat || 'image/png');
				callback.call(this, dataURL);
				canvas = null;
			};
			img.src = url;
		},
		//图片自适应
		imgFlexible: {
			/**
			 * 初始化图片尺寸
			 * @param data-src 原始图片路径
			 * @param data-size 指定裁切尺寸（注：如果未指定则按页面样式设定的尺寸裁切）
			 * @param data-defalut 图片加载错误时显示的默认图片路径
			 */
			init: function() {
				var imgSrc, imgSize, imgSizeX, imgSizeY, imgRect, imgWidth, imgHeight, imgMatch, newImgSrc, imgDefault;
				var imgEls = doc.querySelectorAll(".img-flex");
				for(var i = 0; i < imgEls.length; i++) {
					imgSrc = imgEls[i].getAttribute("data-src");
					imgSize = imgEls[i].getAttribute("data-size");
					imgDefault = imgEls[i].getAttribute("data-default");
					imgSize && (imgSizeX = imgSize.split(',')[0], imgSizeY = imgSize.split(',')[1]);
					imgRect = imgEls[i].getBoundingClientRect();
					imgWidth = imgRect.width;
					imgHeight = imgRect.height;
					imgMatch = imgSrc.match(/(.*)(\.[^./]*)$/);
					newImgSrc = [imgMatch[1], (imgSize ? imgSizeX : Math.floor(imgWidth)) || "-", (imgSize ? imgSizeY : Math.floor(imgHeight)) || "-"].join("_") + imgMatch[2];
					imgEls[i].setAttribute("src", newImgSrc);
					if(imgDefault) {
						imgEls[i].onerror = function() {
							this.setAttribute("src", imgDefault);
						}
					}
				}
			},
			/*
			 * 根据对象宽度获取自适应图片路径
			 * @el 参考对象（js对象）
			 * @param src 原始图片路径
			 * @param type 计算图片路径的方式（'all':根据对象宽高，'width':根据对象宽度，'height':根据对象高度）
			 */
			getSrc: function(el, src, type) {
				var imgWidth, imgHeight, imgRect, imgMatch, newImgSrc;
				imgRect = el.getBoundingClientRect();
				switch(type) {
					case "all":
						imgWidth = imgRect.width;
						imgHeight = imgRect.height;
						break;
					case "width":
						imgWidth = imgRect.width;
						imgHeight = '-';
						break;
					case "height":
						imgWidth = '-';
						imgHeight = imgRect.height;
						break;
				}
				imgMatch = src.match(/(.*)(\.[^./]*)$/);
				newImgSrc = [imgMatch[1], Math.floor(imgWidth) || "-", Math.floor(imgHeight) || "-"].join("_") + imgMatch[2];
				return newImgSrc;
			}
		}
	};
	win['hvCommon'] = hvCommon;
})(window, document)