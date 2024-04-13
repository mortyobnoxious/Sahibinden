// ==UserScript==
// @name         Sahibinden
// @namespace    Morty
// @version      20240424
// @description  a userscript by Morty
// @author       Morty
// @match        *://*.sahibinden.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sahibinden.com
// @downloadURL  https://github.com/mortyobnoxious/Sahibinden/raw/main/sahibinden.user.js
// @updateURL    https://github.com/mortyobnoxious/Sahibinden/raw/main/sahibinden.user.js
// @require      https://code.jquery.com/jquery-3.7.1.min.js
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @grant        GM.xmlHttpRequest
// ==/UserScript==

(function() {
    'use strict';
GM_addStyle (`
.extrainfo {display: flex;align-items: center;gap: 10px;}
.extrainfo .imgp {display: flex;flex-direction: column;align-items: center;justify-content: center;text-align: center;}
.extrainfo img {width: 70px;}
.shortinfo strong {display: inline-block;min-width: 45px;}
.extrainfo.elinks {gap: 5px;align-items: stretch;}
.extrainfo.elinks a {display: flex;align-items: center;justify-content: center;}
.extrainfo.elinks img {width: 16px;}
.extrainfo.elinks a, .extrainfo.elinks button, .fixedset button {flex:1;padding: 5px 10px;background: transparent;border: 1px solid #dfdfdf;border-radius: 4px;cursor: pointer;box-shadow: none;}
.extrainfo.elinks a:hover, .extrainfo.elinks button:hover, .fixedset button:hover {background: #dfdfdf!important;transition: all .3s !important;text-decoration: none;}
.extrainfo.ph {flex-direction: column;max-height: 200px;overflow-y: scroll;}
.extrainfo.ph > div {display: flex;justify-content: space-between;width: 100%;}
.extrainfo.ph > div > span {flex: 1;text-align: center;}
.extrainfo.ph h3 {display: flex;justify-content: center;align-items: center;width: 100%;}
.extrainfo.ph h3 span {font-size: 11px;margin-left: auto;}
.infdivider {display: block;height: 1px;border: 0;border-top: 1px solid #dfdfdf;margin: 1em 0;padding: 0;}
.infdivider.lp {margin: 5px 0;}
.deleteit {border-color: #BE1E2D!important;outline: 1px solid #BE1E2D;transition: all .3s !important;cursor:pointer;}
.fixedset {position: fixed;left: 45px;bottom: 45px;display: flex;gap: 1rem;}
.faves {width: 100%;display: flex;flex-direction: column;}
.faveitem {display: flex;flex-direction: column-reverse;justify-content: space-between;position:relative;}
.faveitem .extrainfo.elinks {align-items: start;margin-top: 10px;}
.faves .faveit {color: #8798A5;}
.faves .extrainfo.elinks a, .faves .extrainfo.elinks button {border: 1px solid #243447;color: #8798A5;}
.faves .extrainfo.elinks a:hover, .faves .extrainfo.elinks button:hover {background: #243447!important;}
.faves .infdivider {border-top: 1px solid #243447;}
.faveitem::before {content: "";width: 100%;margin: 10px 0;border-top: 1px solid #243447;}
.faves .imgp img {width: 130px;}
.allfaves {position: relative;}
.allfaves::before {content: attr(data-count);position: absolute;right: -5px;top: -10px;background: #BE1E2D;width: 20px;height: 20px;border-radius: 50%;color: white;display: flex;align-items: center;justify-content: center;text-align: center;}
.faves .shortinfo h3 img {width: 16px;}
[data-w="null"] {display:none;}
.outlinemd {outline: 2px dashed #BE1E2D7D;}
.up {rotate: -90deg;color: #BE1E2D;}
.down {rotate: 90deg;color: #80C14B;}
.extrainfo.ph table {width: 100%;text-align: center;}
.extrainfo.ph td {border: 1px solid #dfdfdf;padding: 2px 4px;}

.popupMS { position: fixed; top: 23vh; left: 50%; transform: translate(-50%, 0); background-color: #141D26; border-radius: 5px; box-shadow: 2px 3px 3px rgba(0,0,0,0.52); width: 95vw; max-width: 650px;overflow: hidden;z-index: 9999;color: #8798A5;}
.popup-header { display: flex; align-items: stretch; justify-content: space-between;background: #243447;}
.popup-header h3 { margin: 0; font-size: 1.5em;padding: 3px 10px;color: #8798A5;align-self: center;}
.popup-header .close-button { font-size: 1.5em; font-weight: bold; border: none; background: transparent; cursor: pointer;color: #8798A5;padding: 3px 10px;transition: all .3s !important;user-select: none;height: 100%;align-items: center;display: flex;}
.popup-header .close-button:hover {background: #BE1E2D;}
.popup-content { display: flex; flex-wrap: wrap;padding: 15px;max-height: 400px;overflow-y: auto;}
.popup-buttons {display: flex;align-items: center;gap: 5px;}
.popup-buttons a:hover {color: #5fca5f;transition: all .3s !important;}
.popup-buttons input#searchpopup {padding: .3rem .6rem;margin-left: auto;max-width: 150px;}
.popupMS input, .popupMS select, .popupMS button, .popupMS textarea {background: transparent;color: #8798A5;border: 1px solid #1b2836!important;border-radius: 8px;padding: .7rem 1rem;resize: none;}
.popupMS button:hover {background: #1b2836;cursor: pointer;transition: all .3s;}
.popupMS select {cursor: pointer;}
.popupMS select option {background: #1b2836;}
#sortselect, .sortby, #searchpopup, .updateP {padding: 5px 10px !important;margin: 5px 0;}
.popupMS button:hover, .popupMS input:focus, .popupMS select:focus, .popupMS textarea:focus, .popupMS select:hover {background: #1b2836;transition: all .3s;outline: none;}
#setForm {display: flex;flex-direction: column;gap: 10px;width: 100%;}
#setForm div {display: flex;align-items: center;gap: 10px;}
#setForm div label {width: 10%;}
#setForm div input {width: 90%;}
.pchanged {position: absolute;right: 0;bottom: 45%;font-size: 2rem;text-align: center;justify-content: center;align-items: center;border: 1px solid #243447;border-radius: 8px;display: flex;flex-direction: column;padding: 3px 5px;}
.pchanged .pd {font-size: 12px;}

@keyframes spinner {from {transform: rotate(0turn);} to {transform: rotate(1turn);}}
.vihi {visibility: hidden;opacity: 0;}
.editing {position:relative;pointer-events: none;}
.editing::before {content: "";position: absolute;width: 20px;height: 20px;top: 0;left: 0;right: 0;bottom: 0;margin: auto;border: 2px solid transparent;border-top-color: #A9894F;border-radius: 50%;animation: spinner 1s ease infinite;}
.editing::after {content: attr(data-c);position: absolute;left: 8px;top: 6px;}
`);

const parser = new DOMParser();

function createPopup(title, div, eb="") {
  let popup = document.querySelector('.popupMS');
  if (popup) {
    setTimeout(() => {
      popup.querySelector('.popup-header h3').innerHTML = title;
      popup.querySelector('.popup-content').innerHTML = div;
    }, 1);
    return;
  }
  popup = document.createElement('div');
  popup.classList.add('popupMS');
  popup.innerHTML = `<div class="popup-header"><h3>${title}</h3><span class="popup-buttons">${eb}<span class="close-button">&times;</span></span></div><div class="popup-content">${div}</div>`;
  document.body.appendChild(popup);
  const closeButton = popup.querySelector('.close-button');
  document.addEventListener('click', event => {
    if (!popup.contains(event.target) || event.target === closeButton) {
      popup.remove();
    }
  });
}

// add spinner on clicked button
function spin(el, addRemove=true) {
	if(addRemove) {
		$(el).addClass('editing');
		$(el).find('span').addClass('vihi');
	} else {
		$(el).removeClass('editing');
		$(el).find('span').removeClass('vihi');
	}
}

function getXML(url, rt = false) {
  return new Promise((resolve, reject) => {
    GM.xmlHttpRequest({
      method: "GET",
      url: url,
      onload: function (response) {
        const html = response.responseText;
        const result = rt ? html : parser.parseFromString(html, 'text/html');
        resolve(result);
      },
      onerror: function (error) {
        reject(error);
      }
    });
  });
}

const dD = (date, od=false, h=2) => {
	const units={yıl:31536e3,ay:2592e3,gün:86400,saat:3600,dk:60,sn:1};
	let nd=new Date;od&&(nd=new Date(od));
	let distance = Math.abs(new Date(date) - nd) / 1000;
	let count = 0, retMinus = false, span = "";
	Object.keys(units).forEach((unit) => {
		if (count >= h || (count == 1 && unit == "sn")) {return;}
		const interval = Math.floor(distance / units[unit]);
		let sign = new Date() > new Date(date) && retMinus && count === 0 ? "-" : "";
		if (interval > 0) {span += `${sign}${interval} ${unit} `;count++;}
		distance %= units[unit];
	});
	return span.trim();
};

class TampermonkeyStorage {
	constructor(key) {this.key = key;}
	modify(index, value) {
		let values = this.values;
		index === -1
		? values.push(value)
		: value
		? (values[index] = value)
		: values.splice(index, 1);
		GM_setValue(this.key, values);
	}
	removeAll() {GM_deleteValue(this.key);}
	findIndex(key, value) {return this.values.findIndex(key && value ? obj => obj[key] === value : item => item === key);}
	move(index, direction) {
		const values = this.values;
		const newIndex = (index + direction + values.length) % values.length;
		const [item] = values.splice(index, 1);
		values.splice(newIndex, 0, item);
		GM_setValue(this.key, values);
	}
	get values() {return GM_getValue(this.key) || []}
}

const bookmarksGM = new TampermonkeyStorage('bookmarks');
const settingsGM = new TampermonkeyStorage('settings');

function retIndex(id) {
	return bookmarksGM.findIndex("id", id)
}

function findText(needle) {
  const element = $('.classifiedInfoList strong, td.title').filter(function() {
    return $(this).contents().filter(function() {
      return this.nodeType === 3;
    }).text().trim() === needle;
  }).first();
  return element.next('span, td.value').text().trim() || null;
}

function ryd(y) {
    return new Date().getFullYear() - y
}

function rdy(p, c) {
    return Math.floor(parseFloat(p.replace(/TL|\.|\,/gi, ""))/c).toLocaleString('tr')
}

function rlogo(url) {
    return `<img src="https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${url}&size=32">`
}

async function getDoviz() {
    let ind = settingsGM.findIndex("id", "dövizyakıt");
    let d = settingsGM.values[ind]?.date || false;
    if (d !== false && (new Date().getTime() - d) < (10 * 60 * 60 * 1000)) return;

    let urls = ["https://api.genelpara.com/embed/doviz.json", "https://akaryakit-fiyatlari.vercel.app/api/po/34"];
    try {
        let [dovizResponse, akaryakitResponse] = await Promise.all(urls.map(url => getXML(url, true).then(JSON.parse)));
        let [dolar, euro, gr] = [dovizResponse.USD.satis, dovizResponse.EUR.satis, dovizResponse.GA.satis];

        let {benzin, mazot, lpg} = akaryakitResponse.fiyatlar[1];
        let data = { id: "dövizyakıt", dolar, euro, gr, benzin, mazot, lpg, date: new Date().getTime() };
        settingsGM.modify(ind, data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

getDoviz()

function rpd(a, b) {
    const numA = a.replace(/TL|\.|\,/gi, "");
    const numB = b.replace(/TL|\.|\,/gi, "");
    const result = +numB - +numA;
    return `${result >= 0 ? "+" : "-"}${Math.abs(result).toLocaleString('tr')}`;
}

function getData() {
let [city, district, street] = $(".classifiedInfo h2 a").map(function() {
  const text = $(this).text().trim();
  return text.split(',', 3).map(part => part.trim());
}).get();

let data = {
    id: findText("İlan No") || findText("Ad"),
    phone: $('.pretty-phone-part.show-part > span').attr('data-content') || $('.mobile').next('.pretty-phone-part.show-part').text().trim() || $('.user-info-phones dd').text().trim(),
    title: $('.classifiedDetailTitle h1').text().trim(),
    price: $('.sticky-header-attribute.price').text().trim(),
    img: $('.stdImg').attr('src') || $('meta[property="og:image"]').attr('content') || $('.thmbImg').attr('src'),
    date: findText("İlan Tarihi") || findText("Ad Date"),
    brand: findText("Marka") || findText("Make"),
    seri: findText("Seri") || findText("Series"),
    model: findText("Model"),
    year: findText("Yıl") || findText("Year"),
    fuel: findText("Yakıt") || findText("Fuel"),
    gear: findText("Vites") || findText("Gear"),
    km: findText("KM") || findText("Km"),
    ah: `${findText("Ağır Hasar Kayıtlı")==="Evet"?"Ağır Hasar Kayıtlı":''}`,
    b: $('.car-parts .painted-new').length,
    d: $('.car-parts .changed-new').length,
    hp: findText("Motor Gücü") || findText("Engine Power"),
    cc: findText("Motor Hacmi") || findText("Engine Capacity"),
    si: findText('Şehir içi') || findText('Urban'),
    sd: findText('Şehir dışı') || findText('Extra Urban'),
    ort: findText('Ortalama') || findText('Combined Fuel Consumption'),
    acc: findText('Hızlanma 0-100 km/saat') || findText('Acceleration'),
    city,
    district,
    street,
    history: [{ date: new Date().getTime(), price: null }],
};
data.history[0].price = data.price;
return data
}

function updatePrice(id, p=false) {
    let ind = retIndex(id);
    let data = bookmarksGM.values[ind] || getData();
    let price = p || getData().price;
    if (data.history[data.history.length - 1]?.price !== price) {
        data.history.push({ date: new Date().getTime(), price: price });
        bookmarksGM.modify(ind, data);
    }
}

updatePrice(getData().id)

function deleteRemoved(){
    if($('.no-result-description').length) {
        let id = new URLSearchParams(window.location.search).get('query_text');
        let ind = retIndex(id);
        if (ind == -1) return
        bookmarksGM.modify(ind);
        $('.no-result-description').append(`<div>Favorilerden silindi!</div>`)
    }
}
deleteRemoved()

function fuelPrice(f, p, c) {
   const fuels = {
       'Benzin': 'benzin', 'Gasoline': 'benzin', 'Benzin & LPG': 'benzin','Gas & LPG': 'benzin',
       'Dizel': 'mazot', 'Diesel': 'mazot',
       'Hybrid': 'benzin',
   };
   const fuel = fuels[f];
   const pricePerLiter = Math.round(+p.replace(',','.').replace(' lt','') * c[fuel]);
   return pricePerLiter;
}


function createDivs(data, all=true) {
    let ind = retIndex(data.id);
    let history = bookmarksGM.values[ind]?.history;
    let price = data.history[data.history.length - 1]?.price;
    let indD = settingsGM.findIndex("id", "dövizyakıt")
    let { dolar=0, euro=0, gr=0, benzin=0, mazot=0, lpg=0 } = settingsGM.values[indD] || {};
    if(!data.brand || !data.year) return

return `
<div class="extrainfo elinks">
<button class="${retIndex(data.id)!==-1?`deleteit`:`faveit`}" data-id="${data.id}" title="${retIndex(data.id)!==-1?`Sil`:`Favori`}">${retIndex(data.id)!==-1?`Sil`:`Favori`}</button>
${all?`<button class="copyinf" title="Bilgileri Kopyala">Kopyala</button>`:''}
${!all?`<a href="https://www.sahibinden.com/kelime-ile-arama?query_text=${data.id}" target="_blank" title="İlana Git">İlan</a>`:''}
<a href="http://www.google.com/search?q=${data.brand} ${data.seri} ${data.model} ${data.year}" target="_blank" title="Google">${rlogo('google.com')}</a>
<a href="https://www.youtube.com/results?search_query=${data.brand} ${data.seri} ${data.model} ${data.year}" target="_blank" title="Youtube">${rlogo('youtube.com')}</a>
<a href="https://eksisozluk.com/?q=${data.brand} ${data.seri}" target="_blank" title="Ekşisözlük">${rlogo('eksisozluk.com')}</a>
${data.phone?`<a class="btn btn-flat btn-link" href="https://wa.me/+9${data.phone.replace(/\D/g, "")}" target="_blank" title="Whatsapp">${rlogo('web.whatsapp.com')}</a>`:''}
</div>
${all?`<hr class="infdivider">`:''}
<div class="extrainfo shinfo">
<div class="imgp">
<img src="${all?`https://www.carlogos.org/car-logos/${data.brand.replace('DS Automobiles','DS').replace(' ','-').toLowerCase()}-logo.png`:`${data.img}`}">
<h4>${price}</h4>
<small><strong>$</strong> ${rdy(price, dolar)}</small>
<small><strong>€</strong> ${rdy(price, euro)}</small>
<small title="Bütçen"><strong></strong> ${rpd(price, settingsGM.values[settingsGM.findIndex("id", "settings")].butce||0)}</small>
</div>
<div class="shortinfo">
<div><h3>${!all?`<img src="https://www.carlogos.org/car-logos/${data.brand.toLowerCase()}-logo.png">`:``}${data.brand} ${data.seri} ${data.model}</h3></div>
<div>${data.year} | ${data.fuel} | ${data.gear} | ${data.km} KM${!all?` | ${data.city} | ${data.district} | ${data.street}`:''}</div>
<hr class="infdivider lp">
${!all?`<div><strong>İlan:</strong><span>${data.id}</span></div>`:''}
<div><strong>Yaşı:</strong><span>${ryd(data.year)}</span></div>
<div><strong>Yılda:</strong><span>${Math.floor(data.km/ryd(data.year)*1000).toLocaleString('tr')} KM</span></div>
${(data.b+data.d) !==0?`<div><strong title="Boya/Değişen">B/D:</strong><span>${data.b}/${data.d}</span></div>`:''}
<div data-w="${data.si}"><strong title="100KM Şehir İçi/Şehir Dışı/Ortalama">Yakıt:</strong><span>${data.si} | ${data.sd} | ${data.ort} <small>(${fuelPrice(data.fuel, data.ort||"0", {benzin, mazot, lpg})} TL)</small></span></div>
<div data-w="${data.acc}"><strong>0-100:</strong><span>${data.acc}</span></div>
<div>${data.hp} | ${data.cc}</div>
${data.ah?`<div>${data.ah}</div>`:''}
</div>
</div>
${all && history ? `<hr class="infdivider">
<div class="extrainfo ph">
<h3>Fiyat Geçmişi${history.length>1?`<span>${rpd(history[0].price, price).replace(/^\+0+$/, "0")} TL</span>`:''}</h3>
<table><tbody>${history.reverse().map(entry => {
    const previousEntry = history[history.indexOf(entry) + 1];
    let cl = '';
    if (previousEntry) {cl = entry.price > previousEntry.price ? 'up' : 'down';}
    return `<tr><td><strong>${entry.price}</strong></td><td class="${cl}"><span>➤</span></td><td title="${dD(entry.date)}">${dD(entry.date, false, 1)}</td><td>${new Date(entry.date).toLocaleDateString('tr', {year: 'numeric', month: 'short', day: 'numeric'})}</td></tr>`;
}).join('')}</tbody></table>` : ''}
`
}

function appendThings() {
    $('.extrainfo, .infdivider, .fixedset').remove();
    $('.classifiedOtherBoxesContainer').append(createDivs(getData()));
    $('body').append(`<div class="fixedset"><button class="allfaves" title="Favoriler" data-count="${bookmarksGM.values.length}">🔖</button><button class="fsettings" title="Ayarlar">⚙️</button></div>`)
}
appendThings()

function appendFaves() {
	let divs = "";
	$.each(bookmarksGM.values, function(index, value) {
        let price = value.history[value.history.length - 1]?.price;
		divs += `<div class="faveitem" data-id="${value.id}" data-price="${price}" data-km="${value.km}" data-year="${value.year}" data-date="${value.date}" data-brand="${value.brand}" data-city="${value.city}">${createDivs(value, false)}</div>`
	});
	let faves = `<div class="faves">${divs}</div>`
    let input = `<button class="updateP" title="Fiyatları Güncelle"><span>⟳</span></button>
<select name="sortselect" id="sortselect">
    <option value="">Sırala</option>
    <option value="price">Fiyat</option>
    <option value="km">KM</option>
    <option value="year">Yıl</option>
    <option value="brand">Marka</option>
    <option value="city">Şehir</option>
    <option value="date">Tarih</option></select>
	<button class="sortby" title="Sırala" data-sort="false">◆</button>
<input type="text" id="searchpopup" placeholder="ara..." autocomplete="off"/>`
    createPopup("🔖 Favoriler", faves, input)
}

//
$(document).on('click', '.updateP', function(e){
	e.preventDefault();
    $('#sortselect option:first').prop('selected', true).trigger('change');
	var thisis = $(this);
	spin(thisis);
	var len = $('.faveitem').length;
	$('.faveitem').each(function(i){
		var _this = $(this);
		var id = $(_this).attr('data-id');
		let ind = retIndex(id);
		var a = bookmarksGM.values[ind];
		setTimeout(function(){
			getXML(`https://www.sahibinden.com/ajax/classified/${id}/loadPriceInfoWithHistory`, true).then(function(data) {
                data = JSON.parse(data);
                let p = data.data.realPrice.toLocaleString('tr') + " TL";
                let pd = rpd(a.history[a.history.length - 1].price, p)
                let cl = pd < 0 ? "down" : pd > 0 ? "up" : "";
                let de = data.data.passiveClassifiedInfo ? true : false;
				$(thisis).attr('data-c',++i);
                $(_this).append(`<span class="pchanged${de?' deleteit':''}" data-id="${id}"><span class="${cl}" data-del="${de}">${de?'×':'➤'}</span><span class="pd">${pd.replace(/^\+0+$/, "-")}</span></span>`);
                if (cl !== "") { updatePrice(id, p) }
                console.log(p, pd, cl, de)
                document.querySelector(`.faveitem[data-id="${id}"]`).scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
			});
		}, i*1200);

		if (i == len-1) {
			setTimeout(function(){
				spin(thisis, false);
            },len*1200+1);
        }
	});
});

function sortBy(sortel) {
  let faveitem = $(`.faveitem`);
  let sortToggle = $('.sortby').attr('data-sort') === 'true';
  sortToggle = !sortToggle;
  $('.sortby').attr('data-sort', sortToggle);
  $('.sortby').text(`${sortToggle ? '▼' : '▲'}`);
  faveitem.sort((a, b) => {
    let ratingA = $(a).attr(`data-${sortel}`);
    let ratingB = $(b).attr(`data-${sortel}`);
    return sortToggle ? ratingB.localeCompare(ratingA, 'en', { numeric: true }) : ratingA.localeCompare(ratingB, 'en', { numeric: true });
  }).each((index, element) => $(element).css('order', index + 1));
}


$(document).on('change', '#sortselect', function(e) {
  e.preventDefault();
  let sortel = $(this).val();
  if (!sortel) {
	  $(`.faveitem`).removeAttr('style');
	  return;
  }
  sortBy(sortel);
});

$(document).on('click', '.sortby', function(e) {
  e.preventDefault();
  let sortel = $(this).prev('#sortselect').val();
  if (!sortel) return;
  sortBy(sortel);
});

$(document).on('input', '#searchpopup', function(e){
  let searchedText = $(this).val().toLowerCase();
  $(".faves > .faveitem").hide().filter(function() {
    return $(this).text().toLowerCase().includes(searchedText);
  }).show();
});

$(document).on('click', '.faveit', function(e){
    e.preventDefault();
    let data = getData();
    let ind = retIndex(data.id);
    bookmarksGM.modify(ind, data);
    $(this).removeClass('faveit').addClass('deleteit').text('Sil')
    appendThings()
});
$(document).on('click', '.deleteit', function(e){
    e.preventDefault();
    let ind = retIndex($(this).attr('data-id'));
    if (ind == -1) return
    bookmarksGM.modify(ind);
    if(!$('.popupMS').length) {
        appendThings();
        return;
    }
    appendFaves()
});
$(document).on('click', '.copyinf', function(e){
    let inf = `${getData().price}\n\n${$('.shortinfo').text().replace(/:/g, ': ').replace('B/D', 'Boya/Değişen').replace(/^.*null.*$/gm, '').replace(/\n[^\S\n]*\n/g, '\n').trim()}\n\nLink: https://sahibinden.com/${getData().id}`
    navigator.clipboard.writeText(inf)
        .then(() => {
            $('.copyinf').text('Kopyalandı!')
            setTimeout(function(){
                $('.copyinf').text('Kopyala')
            },1500);
        })
        .catch(err => {
            $('.copyinf').text('Hata!')
            setTimeout(function(){
                $('.copyinf').text('Kopyala')
            },1500);
        });
});

$(document).on('click', '.allfaves', function(e){
    appendFaves()
});
$(document).on('click', '.fsettings', function(e){
    let ind = settingsGM.findIndex("id", "settings")
    let { butce, deneme, diger} = settingsGM.values[ind] || {};

 let div = `
<form id="setForm" class="inputs">
<div><label for="butce">Bütçe</label><input id="butce" name="butce" type="number" value="${butce || ''}" placeholder="Bütçeni gir"></div>
<div><label for="deneme">Deneme</label><input id="deneme" name="deneme" type="text" value="${deneme || ''}" placeholder="Deneme"></div>
<div><label for="diger">Diğer</label><input id="diger" name="diger" type="text" value="${diger || ''}" placeholder="Diğer"></div>
</form>
 `
 createPopup("⚙️ Ayarlar", div)
});

$(document).on('input', '#setForm input', function(e){
  let formData = $('#setForm').serializeArray();
  let data = {id: "settings"};
  formData.forEach(function(input) {
    data[input.name] = input.value;
  });
  let ind = settingsGM.findIndex("id", "settings");
  settingsGM.modify(ind, data);
});

$(document).on('mousedown', '.faveitem .extrainfo', function(e){
	if (event.which == 1) {
		$('.outlinemd').removeClass('outlinemd');
		$(this).addClass('outlinemd');
	}
});

})();
