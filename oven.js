const lookupWriter = /(rogel alpher|רוגל אלפר)/i;

const altTitle = 'Yummy!';
const altName = 'Rugelach';
const altImg = 'https://github.com/avimak/Rugelach/blob/master/rugelach_sq.jpg?raw=true';
const altLink = 'https://www.google.co.il/search?q=Rugelach';
const altText = 'i\'ve got love in my tummy';

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
    if (lookupWriter.test(el.innerText)) {
        var imgSize = getImgSize(el);

        replace(el, 'tag', 'a', 'href', altLink);
        replace(el, 'tag', 'img', 'src', altImg);
        replace(el, 'tag', 'img', 'data-src', altImg);
        replace(el, 'tag', 'source', 'srcset', altImg);
        replace(el, 'tag', 'address', null, altName);
        replace(el, 'class', 't-address', null, altName);
        replace(el, 'class', 't-zeta', null, altTitle);
        replace(el, 'class', 'mh__teaser__h', null, altTitle);
        replace(el, 'class', 't-epsilon', null, altTitle);
        replace(el, 'class', 't-epsilon--2lines', null, altTitle);
        replace(el, 'class', 't-milli', null, altText);

        setImgSize(el, imgSize);
    }
});

[].forEach.call(document.getElementsByTagName("figure"), function (el) {
    if (lookupWriter.test(el.parentElement.innerText)) {
        replace(el.parentElement, 'class', 't-epsilon', null, altName);

        var imgSize = getImgSize(el);
        replace(el, 'tag', 'img', 'src', altImg);
        setImgSize(el, imgSize);
    }
});