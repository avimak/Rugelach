function replace(el, type, name, key, val) {
    var res = null;
    if (type === 'tag') {
        res = el.getElementsByTagName(name);
    } else if (type === 'class') {
        res = el.getElementsByClassName(name);
    } else {
        throw new Error('unhandled type: ' + type);
    }

    if (res && res.length > 0) {
        if (key) {
            res[0][key] = val;
        }
        else {
            var node = res[0];
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var span = document.createElement('span');
            var snippet = document.createTextNode(val);
            span.appendChild(snippet);
            node.appendChild(span);
        }
    }
}

function getImgSize(el) {
    var img = el.getElementsByTagName('img')[0];
    if (img) {
        var width = img.naturalWidth;
        var height = img.naturalHeight;
        return [width, height];
    }
}

function setImgSize(el, size) {
    var img = el.getElementsByTagName('img')[0];
    if (img) {
        img.style.width = size[0] + 'px';
        img.style.height = size[1] + 'px';
    }
}

[].forEach.call(document.getElementsByTagName("article"), function (el) {
    if (/(rogel alpher|רוגל אלפר)/i.test(el.innerText)) {
        var imgSize = getImgSize(el);

        replace(el, 'tag', 'a', 'href', 'https://www.google.co.il/search?q=Rugelach');
        replace(el, 'tag', 'img', 'src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/%D7%A8%D7%95%D7%92%D7%9C%D7%9A.jpg/320px-%D7%A8%D7%95%D7%92%D7%9C%D7%9A.jpg');
        replace(el, 'tag', 'img', 'data-src', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/%D7%A8%D7%95%D7%92%D7%9C%D7%9A.jpg/320px-%D7%A8%D7%95%D7%92%D7%9C%D7%9A.jpg');
        replace(el, 'tag', 'address', null, 'Rugelach');
        replace(el, 'class', 't-address', null, 'Rugelach');
        replace(el, 'class', 't-zeta', null, 'Yummy!');
        replace(el, 'class', 'mh__teaser__h', null, 'Yummy!');
        replace(el, 'class', 'h-ellipsis t-epsilon--2lines h-mb--xxtight', null, 'Yummy!');

        setImgSize(el, imgSize);
    }
});