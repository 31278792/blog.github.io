document.addEventListener('DOMContentLoaded', ready, false);

const THEME_PREF_STORAGE_KEY = "theme-preference";
const THEME_TO_ICON_CLASS = {
    'dark': 'feather-moon',
    'light':'feather-sun'
};
const THEME_TO_ICON_TEXT_CLASS = {
    'dark': 'Dark mode',
    'light':'Light mode'
};
let toggleIcon = '';
let darkThemeCss = '';

const HEADING_TO_TOC_CLASS = {
    'H1': 'level-1',
    'H2': 'level-2',
    'H3': 'level-3',
    'H4': 'level-4'
}

function ready() {
	!function(){function n(n,e,t){return n.getAttribute(e)||t}function e(n){return document.getElementsByTagName(n)}function t(){var t=e("script"),o=t.length,i=t[o-1];return{l:o,z:n(i,"zIndex",-1),o:n(i,"opacity",.5),c:n(i,"color","0,0,0"),n:n(i,"count",99)}}function o(){a=m.width=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,c=m.height=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight}function i(){r.clearRect(0,0,a,c);var n,e,t,o,m,l;s.forEach(function(i,x){for(i.x+=i.xa,i.y+=i.ya,i.xa*=i.x>a||i.x<0?-1:1,i.ya*=i.y>c||i.y<0?-1:1,r.fillRect(i.x-.5,i.y-.5,1,1),e=x+1;e<u.length;e++)n=u[e],null!==n.x&&null!==n.y&&(o=i.x-n.x,m=i.y-n.y,l=o*o+m*m,l<n.max&&(n===y&&l>=n.max/2&&(i.x-=.03*o,i.y-=.03*m),t=(n.max-l)/n.max,r.beginPath(),r.lineWidth=t/2,r.strokeStyle="rgba("+d.c+","+(t+.2)+")",r.moveTo(i.x,i.y),r.lineTo(n.x,n.y),r.stroke()))}),x(i)}var a,c,u,m=document.createElement("canvas"),d=t(),l="c_n"+d.l,r=m.getContext("2d"),x=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(n){window.setTimeout(n,1e3/45)},w=Math.random,y={x:null,y:null,max:2e4};m.id=l,m.style.cssText="position:fixed;top:0;left:0;z-index:"+d.z+";opacity:"+d.o,e("body")[0].appendChild(m),o(),window.onresize=o,window.onmousemove=function(n){n=n||window.event,y.x=n.clientX,y.y=n.clientY},window.onmouseout=function(){y.x=null,y.y=null};for(var s=[],f=0;d.n>f;f++){var h=w()*a,g=w()*c,v=2*w()-1,p=2*w()-1;s.push({x:h,y:g,xa:v,ya:p,max:6e3})}u=s.concat([y]),setTimeout(function(){i()},100)}();
    feather.replace({ 'stroke-width': 1, width: 20, height: 20 });
    setThemeByUserPref();

    if (document.querySelector('main#content > .container') !== null &&
            document.querySelector('main#content > .container').classList.contains('post')) {
        if (document.getElementById('TableOfContents') !== null) {
            fixTocItemsIndent();
            addSmoothScroll();
            createScrollSpy();
        } else {
            document.querySelector('main#content > .container.post').style.display = "block";
        }
    }

    // Elements to inject
    const svgsToInject = document.querySelectorAll('img.svg-inject');
    // Do the injection
    SVGInjector(svgsToInject);

    document.getElementById('hamburger-menu-toggle').addEventListener('click', () => {
        const hamburgerMenu = document.getElementsByClassName('nav-hamburger-list')[0]
        if (hamburgerMenu.classList.contains('visibility-hidden')) {
            hamburgerMenu.classList.remove('visibility-hidden');
        } else {
            hamburgerMenu.classList.add('visibility-hidden');
        }
    })
}

window.addEventListener('scroll', () => {
    if (window.innerWidth <= 820) {
        // For smaller screen, show shadow earlier
        toggleHeaderShadow(50);
    } else {
        toggleHeaderShadow(100);
    }
});

function fixTocItemsIndent() {
    document.querySelectorAll('#TableOfContents a').forEach($tocItem => {
      const itemId = $tocItem.getAttribute("href").substring(1)
      $tocItem.classList.add(HEADING_TO_TOC_CLASS[document.getElementById(itemId).tagName]);
    });
}

function addSmoothScroll() {
    document.querySelectorAll('#toc a').forEach($anchor => {
        $anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.getElementById(this.getAttribute('href').substring(1)).scrollIntoView({
                behavior: 'smooth',
                block: 'start' //scroll to top of the target element
            });
        });
    });
}

function createScrollSpy() {
    var elements = document.querySelectorAll('#toc a');
    document.addEventListener('scroll', function () {
        elements.forEach(function (element) {
          const boundingRect = document.getElementById(element.getAttribute('href').substring(1)).getBoundingClientRect();
          if (boundingRect.top <= 55 && boundingRect.bottom >= 0) {
            elements.forEach(function (elem) {
              elem.classList.remove('active');
            });
            element.classList.add('active');
          }
        });
    });
}

function toggleHeaderShadow(scrollY) {
    if (window.scrollY > scrollY) {
        document.querySelectorAll('.header').forEach(function(item) {
            item.classList.add('header-shadow')
        })
    } else {
        document.querySelectorAll('.header').forEach(function(item) {
            item.classList.remove('header-shadow')
        })
    }
}

let tororo = 'tororo/assets/tororo.model.json';
let hijiki = 'hijiki/assets/hijiki.model.json';
let config = {
	model: {
		jsonPath: '' // 加载模型的json路径
	},
	display: {
		superSample: 1, // 超采样等级
		width: 175, // canvas的宽度
		height: 200, // canvas的高度
		position: 'left', // 显示位置：左或右
		hOffset: 0, // canvas水平偏移
		vOffset: 202, // canvas垂直偏移
	},
	mobile: {
		show: false, // 是否在移动设备上显示
		cale: 1, // 移动设备上的缩放
		motion: true, // 移动设备是否开启重力感应
	},
	react: {
		opacityDefault: 1, // 默认透明度
		opacityOnHover: 1 // 鼠标移上透明度
	}
}
function live2d(path){
	config.model.jsonPath = path;
	L2Dwidget.init(config);
}
window.onload = function(){
	if(localStorage.getItem(THEME_PREF_STORAGE_KEY)==='light'){
		live2d(hijiki);
	}
	else if(localStorage.getItem(THEME_PREF_STORAGE_KEY)==='dark'){
		live2d(tororo);
		snow=new Snowy(20, true, 10, "white");
	}
}

function setThemeByUserPref() {
    darkThemeCss = document.getElementById("dark-theme");
    const savedTheme = localStorage.getItem(THEME_PREF_STORAGE_KEY) ||
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark': 'light');
    const darkThemeToggles = document.querySelectorAll('.dark-theme-toggle');
    setTheme(savedTheme, darkThemeToggles);
	let snow;
    darkThemeToggles.forEach(el => el.addEventListener('click', (event) => {
        toggleIcon = event.currentTarget.querySelector("a svg.feather");
        if (toggleIcon.classList[1] === THEME_TO_ICON_CLASS.dark) {
            setTheme('light', [event.currentTarget]);
			live2d(hijiki);
			snow.clean_snow();
        } else if (toggleIcon.classList[1] === THEME_TO_ICON_CLASS.light) {
            setTheme('dark', [event.currentTarget]);
			snow=new Snowy(20, true, 10, "white");
			live2d(tororo);
        }
    }));
}

function setTheme(themeToSet, targets) {
    localStorage.setItem(THEME_PREF_STORAGE_KEY, themeToSet);
    darkThemeCss.disabled = themeToSet === 'light';
    targets.forEach((target) => {
        target.querySelector('a').innerHTML = feather.icons[THEME_TO_ICON_CLASS[themeToSet].split('-')[1]].toSvg();
        target.querySelector("#dark-theme-toggle-screen-reader-target").textContent = [THEME_TO_ICON_TEXT_CLASS[themeToSet]];
    });
}
