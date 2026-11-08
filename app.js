'use strict';
/* ============================================================
   File Studio — image conversion, to-PDF, PDF toolkit, PDF editor
   100% client-side. Libraries: pdf.js, jsPDF, JSZip.
   ============================================================ */
pdfjsLib.GlobalWorkerOptions.workerSrc = 'vendor/pdf.worker.min.js';
const { jsPDF } = window.jspdf;

/* ---------------- i18n ---------------- */
const L = {
  az:{
    sub:'Hər şey brauzerdə — heç bir fayl serverə getmir.',
    tImg:'Şəkil çevir', tToPdf:'PDF-ə çevir', tPdf:'PDF alətləri', tEdit:'PDF redaktor',
    dropB:'Faylları bura at və ya kliklə', dropImg:'PNG, JPG, WEBP, GIF, BMP…',
    dropToPdf:'Şəkillər, TXT, Markdown, HTML, Word (.docx)',
    dropPdf:'PDF faylları və ya şəkillər', dropEdit:'Bir PDF faylı seç',
    imgH:'Şəkil çevirici', imgHint:'İstənilən şəkli başqa formata çevir, ölçüsünü dəyiş, sıx.',
    fmt:'Format', maxw:'Maks. en (px)', qual:'Keyfiyyət', convert:'Çevir', clear:'Təmizlə',
    toPdfH:'PDF-ə çevir', toPdfHint:'Şəkilləri, mətn və Word sənədlərini bir PDF-ə yığ.',
    pageSize:'Səhifə ölçüsü', fitImg:'Şəklə uyğun', orient:'İstiqamət', orAuto:'Avtomatik', orP:'Şaquli', orL:'Üfüqi',
    makePdf:'PDF düzəlt',
    toPdfNote:'Şəkil → PDF və mətn/Word → PDF tam brauzerdə işləyir. Word (.docx) üçün mətn və abzaslar götürülür; mürəkkəb dizayn (cədvəl, şəkil yerləşimi) sadələşə bilər.',
    pdfH:'PDF alətləri', pdfHint:'PDF-ləri birləşdir, səhifə sil/sırala/döndər, sıx, və ya şəkil kimi yadda saxla.',
    selAll:'Hamısını seç', selNone:'Seçimi sil', savePdf:'PDF kimi saxla', saveImgs:'Şəkil kimi saxla',
    quality2:'Keyfiyyət', qHigh:'Yüksək', qMid:'Orta', qLow:'Aşağı (kiçik fayl)', imgFmt2:'Şəkil formatı',
    pdfNote:'Səhifələri klikləyib seç/ləğv et. Birləşdirmək üçün bir neçə fayl at. Nəticə səhifələri yüksək keyfiyyətli şəkil kimi yenidən qurulur (mətn seçilən olmur).',
    editH:'PDF redaktor', editHint:'PDF-in içindəki yazını və ya şəkli ört/sil, üstünə yeni yazı və ya şəkil əlavə et.',
    mErase:'Sil / ört', mText:'Yazı', mImage:'Şəkil', undo:'Geri', clearPage:'Səhifəni təmizlə',
    saveEdit:'PDF yadda saxla', newFile:'Yeni fayl',
    editNote:'Sil rejimi: yazının/şəklin üstündən sürüşdür → seçdiyin rənglə örtülür (ağ = silinmiş kimi). Yazı rejimi: klik et → mətn yaz. Şəkil: şəkli seç, sonra səhifəyə klik et. Nəticə yeni PDF kimi enir.',
    footer:'Pulsuz · açıq mənbə alətlər', busy:'İşlənir…', done:'Hazırdır ✓', err:'Xəta: ',
    nothing:'Fayl əlavə et', page:'Səhifə', pages:'səhifə', placeImg:'İndi şəkli qoymaq üçün səhifəyə klik et',
  },
  en:{
    sub:'Everything in your browser — no file is uploaded.',
    tImg:'Convert image', tToPdf:'To PDF', tPdf:'PDF tools', tEdit:'PDF editor',
    dropB:'Drop files here or click', dropImg:'PNG, JPG, WEBP, GIF, BMP…',
    dropToPdf:'Images, TXT, Markdown, HTML, Word (.docx)',
    dropPdf:'PDF files or images', dropEdit:'Pick a PDF file',
    imgH:'Image converter', imgHint:'Convert any image to another format, resize, compress.',
    fmt:'Format', maxw:'Max width (px)', qual:'Quality', convert:'Convert', clear:'Clear',
    toPdfH:'Convert to PDF', toPdfHint:'Combine images, text and Word documents into one PDF.',
    pageSize:'Page size', fitImg:'Fit to image', orient:'Orientation', orAuto:'Auto', orP:'Portrait', orL:'Landscape',
    makePdf:'Make PDF',
    toPdfNote:'Image → PDF and text/Word → PDF run fully in the browser. For Word (.docx) the text and paragraphs are taken; complex layout (tables, image placement) may be simplified.',
    pdfH:'PDF tools', pdfHint:'Merge PDFs, delete/reorder/rotate pages, compress, or save as images.',
    selAll:'Select all', selNone:'Clear selection', savePdf:'Save as PDF', saveImgs:'Save as images',
    quality2:'Quality', qHigh:'High', qMid:'Medium', qLow:'Low (small file)', imgFmt2:'Image format',
    pdfNote:'Click pages to select/deselect. Drop several files to merge. The result is rebuilt from high-quality page images (text is not selectable).',
    editH:'PDF editor', editHint:'Cover/remove text or images inside a PDF, add new text or images on top.',
    mErase:'Erase / cover', mText:'Text', mImage:'Image', undo:'Undo', clearPage:'Clear page',
    saveEdit:'Save PDF', newFile:'New file',
    editNote:'Erase mode: drag over text/image → covered with the chosen colour (white = erased). Text mode: click → type text. Image: pick an image, then click the page. The result downloads as a new PDF.',
    footer:'free · open-source tools', busy:'Working…', done:'Done ✓', err:'Error: ',
    nothing:'Add a file', page:'Page', pages:'pages', placeImg:'Now click the page to place the image',
  },
  tr:{
    sub:'Her şey tarayıcında — hiçbir dosya sunucuya gitmez.',
    tImg:'Resim çevir', tToPdf:"PDF'e çevir", tPdf:'PDF araçları', tEdit:'PDF düzenle',
    dropB:'Dosyaları buraya bırak veya tıkla', dropImg:'PNG, JPG, WEBP, GIF, BMP…',
    dropToPdf:'Resimler, TXT, Markdown, HTML, Word (.docx)',
    dropPdf:'PDF dosyaları veya resimler', dropEdit:'Bir PDF dosyası seç',
    imgH:'Resim dönüştürücü', imgHint:'Herhangi bir resmi başka formata çevir, boyutlandır, sıkıştır.',
    fmt:'Format', maxw:'Maks. genişlik (px)', qual:'Kalite', convert:'Çevir', clear:'Temizle',
    toPdfH:"PDF'e çevir", toPdfHint:'Resimleri, metni ve Word belgelerini tek PDF yap.',
    pageSize:'Sayfa boyutu', fitImg:'Resme uydur', orient:'Yön', orAuto:'Otomatik', orP:'Dikey', orL:'Yatay',
    makePdf:'PDF oluştur',
    toPdfNote:'Resim → PDF ve metin/Word → PDF tamamen tarayıcıda çalışır. Word (.docx) için metin ve paragraflar alınır; karmaşık düzen (tablo, resim yerleşimi) sadeleşebilir.',
    pdfH:'PDF araçları', pdfHint:'PDF birleştir, sayfa sil/sırala/döndür, sıkıştır veya resim olarak kaydet.',
    selAll:'Tümünü seç', selNone:'Seçimi kaldır', savePdf:'PDF kaydet', saveImgs:'Resim kaydet',
    quality2:'Kalite', qHigh:'Yüksek', qMid:'Orta', qLow:'Düşük (küçük dosya)', imgFmt2:'Resim formatı',
    pdfNote:'Sayfaları tıklayıp seç/kaldır. Birleştirmek için birkaç dosya bırak. Sonuç yüksek kaliteli sayfa resimlerinden yeniden kurulur (metin seçilemez).',
    editH:'PDF düzenleyici', editHint:'PDF içindeki yazıyı/resmi ört/sil, üstüne yeni yazı veya resim ekle.',
    mErase:'Sil / ört', mText:'Yazı', mImage:'Resim', undo:'Geri', clearPage:'Sayfayı temizle',
    saveEdit:'PDF kaydet', newFile:'Yeni dosya',
    editNote:'Sil modu: yazının/resmin üstünde sürükle → seçtiğin renkle örtülür (beyaz = silinmiş). Yazı modu: tıkla → metin yaz. Resim: resmi seç, sonra sayfaya tıkla. Sonuç yeni PDF olarak iner.',
    footer:'ücretsiz · açık kaynak araçlar', busy:'Çalışıyor…', done:'Hazır ✓', err:'Hata: ',
    nothing:'Bir dosya ekle', page:'Sayfa', pages:'sayfa', placeImg:'Şimdi resmi koymak için sayfaya tıkla',
  },
  ru:{
    sub:'Всё в браузере — ни один файл не загружается на сервер.',
    tImg:'Конвертер изображений', tToPdf:'В PDF', tPdf:'PDF-инструменты', tEdit:'Редактор PDF',
    dropB:'Перетащите файлы или нажмите', dropImg:'PNG, JPG, WEBP, GIF, BMP…',
    dropToPdf:'Изображения, TXT, Markdown, HTML, Word (.docx)',
    dropPdf:'PDF-файлы или изображения', dropEdit:'Выберите PDF-файл',
    imgH:'Конвертер изображений', imgHint:'Конвертируйте любое изображение в другой формат, меняйте размер, сжимайте.',
    fmt:'Формат', maxw:'Макс. ширина (px)', qual:'Качество', convert:'Конвертировать', clear:'Очистить',
    toPdfH:'Конвертировать в PDF', toPdfHint:'Объедините изображения, текст и документы Word в один PDF.',
    pageSize:'Размер страницы', fitImg:'По изображению', orient:'Ориентация', orAuto:'Авто', orP:'Книжная', orL:'Альбомная',
    makePdf:'Создать PDF',
    toPdfNote:'Изображение → PDF и текст/Word → PDF работают полностью в браузере. Для Word (.docx) берётся текст и абзацы; сложная вёрстка (таблицы, расположение картинок) может упроститься.',
    pdfH:'PDF-инструменты', pdfHint:'Объединяйте PDF, удаляйте/меняйте порядок/поворачивайте страницы, сжимайте или сохраняйте как изображения.',
    selAll:'Выбрать все', selNone:'Снять выбор', savePdf:'Сохранить PDF', saveImgs:'Сохранить изображения',
    quality2:'Качество', qHigh:'Высокое', qMid:'Среднее', qLow:'Низкое (малый файл)', imgFmt2:'Формат изображения',
    pdfNote:'Нажимайте на страницы, чтобы выбрать/снять. Перетащите несколько файлов для объединения. Результат пересобирается из качественных изображений страниц (текст не выделяется).',
    editH:'Редактор PDF', editHint:'Закройте/удалите текст или изображение в PDF, добавьте новый текст или картинку сверху.',
    mErase:'Стереть / закрыть', mText:'Текст', mImage:'Картинка', undo:'Отмена', clearPage:'Очистить страницу',
    saveEdit:'Сохранить PDF', newFile:'Новый файл',
    editNote:'Режим стирания: проведите по тексту/картинке → закрывается выбранным цветом (белый = стёрто). Режим текста: клик → введите текст. Картинка: выберите изображение, затем кликните по странице. Результат скачивается как новый PDF.',
    footer:'бесплатные инструменты с открытым кодом', busy:'Обработка…', done:'Готово ✓', err:'Ошибка: ',
    nothing:'Добавьте файл', page:'Страница', pages:'стр.', placeImg:'Теперь кликните по странице, чтобы разместить картинку',
  },
};
let LANG = (navigator.language||'az').slice(0,2);
if (!L[LANG]) LANG = 'az';
const t = k => (L[LANG] && L[LANG][k]) || L.az[k] || k;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function applyLang(){
  document.documentElement.lang = LANG;
  $$('[data-t]').forEach(e => { const v = t(e.dataset.t); if (v) e.textContent = v; });
  $$('#langs button').forEach(b => b.classList.toggle('on', b.dataset.l === LANG));
}
$('#langs').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  LANG = b.dataset.l; applyLang();
});

/* ---------------- tabs ---------------- */
$('#tabs').addEventListener('click', e => {
  const tb = e.target.closest('.tab'); if (!tb) return;
  $$('.tab').forEach(x => x.classList.toggle('on', x === tb));
  $$('.page').forEach(p => p.classList.toggle('on', p.id === 'p-' + tb.dataset.p));
});

/* ---------------- helpers ---------------- */
const fmtSize = b => b < 1024 ? b + ' B' : b < 1048576 ? (b/1024).toFixed(1)+' KB' : (b/1048576).toFixed(1)+' MB';
function setStatus(el, msg, cls){ el.className = 'status' + (cls ? ' ' + cls : ''); el.innerHTML = msg; }
function busy(el){ setStatus(el, '<span class="spin"></span>' + t('busy'), 'busy'); }
function download(blob, name){
  const u = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href = u; a.download = name; document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(u); a.remove(); }, 1500);
}
function loadImage(src){ return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }); }
function fileToDataURL(f){ return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); }); }
const baseName = n => n.replace(/\.[^.]+$/, '');
function setupDrop(dropEl, inputEl, onFiles){
  dropEl.addEventListener('click', () => inputEl.click());
  inputEl.addEventListener('change', () => { if (inputEl.files.length) onFiles([...inputEl.files]); inputEl.value = ''; });
  ['dragover','dragenter'].forEach(ev => dropEl.addEventListener(ev, e => { e.preventDefault(); dropEl.classList.add('hot'); }));
  ['dragleave','drop'].forEach(ev => dropEl.addEventListener(ev, e => { e.preventDefault(); dropEl.classList.remove('hot'); }));
  dropEl.addEventListener('drop', e => { const f = [...(e.dataTransfer?.files||[])]; if (f.length) onFiles(f); });
}

/* ============================================================
   1) IMAGE CONVERTER
   ============================================================ */
let imgFiles = [];
const imgList = $('#imgList'), imgStatus = $('#imgStatus');
$('#imgQ').addEventListener('input', e => $('#imgQv').textContent = e.target.value + '%');
setupDrop($('#imgDrop'), $('#imgIn'), fs => { imgFiles.push(...fs.filter(f => f.type.startsWith('image/'))); renderImgList(); });
function renderImgList(){
  imgList.innerHTML = '';
  imgFiles.forEach((f, i) => {
    const row = document.createElement('div'); row.className = 'frow';
    const u = URL.createObjectURL(f);
    row.innerHTML = `<img src="${u}"><div class="fn"><b></b><span>${fmtSize(f.size)}</span></div><button class="x" data-i="${i}">×</button>`;
    row.querySelector('b').textContent = f.name;
    imgList.appendChild(row);
  });
  $('#imgGo').disabled = imgFiles.length === 0;
}
imgList.addEventListener('click', e => { const b = e.target.closest('.x'); if (b) { imgFiles.splice(+b.dataset.i, 1); renderImgList(); } });
$('#imgClear').addEventListener('click', () => { imgFiles = []; renderImgList(); setStatus(imgStatus, ''); });
$('#imgGo').addEventListener('click', async () => {
  if (!imgFiles.length) return;
  busy(imgStatus);
  const fmt = $('#imgFmt').value, mime = 'image/' + fmt;
  const q = (+$('#imgQ').value) / 100, maxW = parseInt($('#imgMaxW').value) || 0;
  try {
    const out = [];
    for (const f of imgFiles) {
      const img = await loadImage(URL.createObjectURL(f));
      let w = img.naturalWidth, h = img.naturalHeight;
      if (maxW && w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
      const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
      const ctx = cv.getContext('2d');
      if (fmt === 'jpeg') { ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      const blob = await new Promise(r => cv.toBlob(r, mime, q));
      out.push({ name: baseName(f.name) + '.' + (fmt === 'jpeg' ? 'jpg' : fmt), blob });
    }
    if (out.length === 1) download(out[0].blob, out[0].name);
    else {
      const zip = new JSZip(); out.forEach(o => zip.file(o.name, o.blob));
      download(await zip.generateAsync({ type: 'blob' }), 'images.zip');
    }
    setStatus(imgStatus, t('done') + ' (' + out.length + ')', 'ok');
  } catch (e) { setStatus(imgStatus, t('err') + e.message, 'err'); }
});

/* ============================================================
   2) TO PDF  (images / txt / md / html / docx)
   ============================================================ */
let toPdfFiles = [];
const toPdfList = $('#toPdfList'), toPdfStatus = $('#toPdfStatus');
setupDrop($('#pdfDrop'), $('#toPdfIn'), fs => { toPdfFiles.push(...fs); renderToPdfList(); });
function renderToPdfList(){
  toPdfList.innerHTML = '';
  toPdfFiles.forEach((f, i) => {
    const row = document.createElement('div'); row.className = 'frow';
    const isImg = f.type.startsWith('image/');
    const thumb = isImg ? `<img src="${URL.createObjectURL(f)}">` : `<div class="fi">${(f.name.split('.').pop()||'').toUpperCase().slice(0,4)}</div>`;
    row.innerHTML = `${thumb}<div class="fn"><b></b><span>${fmtSize(f.size)}</span></div><button class="x" data-i="${i}">×</button>`;
    row.querySelector('b').textContent = f.name;
    toPdfList.appendChild(row);
  });
  $('#toPdfGo').disabled = toPdfFiles.length === 0;
}
toPdfList.addEventListener('click', e => { const b = e.target.closest('.x'); if (b) { toPdfFiles.splice(+b.dataset.i, 1); renderToPdfList(); } });
$('#toPdfClear').addEventListener('click', () => { toPdfFiles = []; renderToPdfList(); setStatus(toPdfStatus, ''); });

function readText(f){ return new Promise(res => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsText(f); }); }
function htmlToText(h){ const d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; }
function mdToText(m){
  return m.replace(/^#{1,6}\s*/gm, '').replace(/\*\*(.+?)\*\*/g, '$1').replace(/\*(.+?)\*/g, '$1')
          .replace(/`{1,3}([^`]*)`{1,3}/g, '$1').replace(/^\s*[-*+]\s+/gm, '• ').replace(/\[(.+?)\]\((.+?)\)/g, '$1 ($2)');
}
async function docxToText(f){
  const zip = await JSZip.loadAsync(f);
  const docFile = zip.file('word/document.xml'); if (!docFile) return '';
  const xml = await docFile.async('string');
  const paras = xml.split(/<w:p[ >]/).slice(1);
  const out = paras.map(p => {
    const runs = [...p.matchAll(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g)].map(m => m[1]);
    let line = runs.join('');
    line = line.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&apos;/g,"'");
    return line;
  });
  return out.join('\n');
}

$('#toPdfGo').addEventListener('click', async () => {
  if (!toPdfFiles.length) return;
  busy(toPdfStatus);
  try {
    const size = $('#pdfSize').value, orientSel = $('#pdfOrient').value;
    let pdf = null; const margin = 40;
    const addTextPage = (text, doc) => {
      const pw = doc.internal.pageSize.getWidth(), ph = doc.internal.pageSize.getHeight();
      doc.setFont('helvetica', 'normal'); doc.setFontSize(12);
      const lines = doc.splitTextToSize(text || ' ', pw - margin * 2);
      let y = margin; const lh = 16;
      for (const ln of lines) {
        if (y > ph - margin) { doc.addPage(); y = margin; }
        doc.text(ln, margin, y); y += lh;
      }
    };
    const newDoc = (orient, fmt) => new jsPDF({ unit: 'pt', orientation: orient, format: fmt });

    for (const f of toPdfFiles) {
      const ext = (f.name.split('.').pop() || '').toLowerCase();
      const isImg = f.type.startsWith('image/');
      if (isImg) {
        const img = await loadImage(URL.createObjectURL(f));
        const iw = img.naturalWidth, ih = img.naturalHeight;
        if (size === 'fit') {
          const o = iw >= ih ? 'l' : 'p';
          if (!pdf) pdf = newDoc(o, [iw, ih]); else pdf.addPage([iw, ih], o);
          pdf.addImage(img, 'JPEG', 0, 0, iw, ih, undefined, 'FAST');
        } else {
          const o = orientSel === 'auto' ? (iw >= ih ? 'l' : 'p') : (orientSel === 'l' ? 'l' : 'p');
          if (!pdf) pdf = newDoc(o, size); else pdf.addPage(size, o);
          const pw = pdf.internal.pageSize.getWidth(), ph = pdf.internal.pageSize.getHeight();
          const r = Math.min((pw - margin * 2) / iw, (ph - margin * 2) / ih);
          const w = iw * r, h = ih * r;
          pdf.addImage(img, 'JPEG', (pw - w) / 2, (ph - h) / 2, w, h, undefined, 'FAST');
        }
      } else {
        let text = '';
        if (ext === 'docx') text = await docxToText(f);
        else if (ext === 'html' || ext === 'htm') text = htmlToText(await readText(f));
        else if (ext === 'md' || ext === 'markdown') text = mdToText(await readText(f));
        else text = await readText(f);
        const o = orientSel === 'l' ? 'l' : 'p';
        const fmt = size === 'fit' ? 'a4' : size;
        if (!pdf) pdf = newDoc(o, fmt); else pdf.addPage(fmt, o);
        // start text on the freshly added page
        addTextPage(text, pdf);
      }
    }
    pdf.save('document.pdf');
    setStatus(toPdfStatus, t('done'), 'ok');
  } catch (e) { setStatus(toPdfStatus, t('err') + e.message, 'err'); }
});

/* ============================================================
   3) PDF TOOLKIT  (render pages → select/rotate → rebuild)
   ============================================================ */
let tkPages = [];           // {canvas, sel, rot}
const tkThumbs = $('#tkThumbs'), tkStatus = $('#tkStatus');
setupDrop($('#tkDrop'), $('#tkIn'), loadToolkit);

async function renderPdfToCanvases(file, scale){
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  const canvases = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const vp = page.getViewport({ scale });
    const cv = document.createElement('canvas'); cv.width = vp.width; cv.height = vp.height;
    await page.render({ canvasContext: cv.getContext('2d'), viewport: vp }).promise;
    canvases.push(cv);
  }
  return canvases;
}
async function imageToCanvas(file, maxDim){
  const img = await loadImage(URL.createObjectURL(file));
  let w = img.naturalWidth, h = img.naturalHeight;
  const m = Math.max(w, h); if (m > maxDim) { w = Math.round(w * maxDim / m); h = Math.round(h * maxDim / m); }
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d'); ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
  return cv;
}
async function loadToolkit(files){
  busy(tkStatus);
  try {
    for (const f of files) {
      if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
        const cvs = await renderPdfToCanvases(f, 2);
        cvs.forEach(c => tkPages.push({ canvas: c, sel: true, rot: 0 }));
      } else if (f.type.startsWith('image/')) {
        tkPages.push({ canvas: await imageToCanvas(f, 2000), sel: true, rot: 0 });
      }
    }
    renderTk(); setStatus(tkStatus, tkPages.length + ' ' + t('pages'), 'ok');
  } catch (e) { setStatus(tkStatus, t('err') + e.message, 'err'); }
}
function renderTk(){
  tkThumbs.innerHTML = '';
  tkPages.forEach((p, i) => {
    const d = document.createElement('div'); d.className = 'th' + (p.sel ? ' sel' : '');
    const small = document.createElement('canvas');
    const sc = 150 / p.canvas.width; small.width = 150; small.height = Math.round(p.canvas.height * sc);
    const ctx = small.getContext('2d');
    ctx.save(); ctx.translate(small.width/2, small.height/2); ctx.rotate(p.rot * Math.PI/180);
    const rotated = p.rot % 180 !== 0;
    const dw = rotated ? small.height : small.width, dh = rotated ? small.width : small.height;
    ctx.drawImage(p.canvas, -dw/2, -dh/2, dw, dh); ctx.restore();
    d.appendChild(small);
    d.insertAdjacentHTML('beforeend', `<div class="pg">${i+1}</div><div class="mk">✓</div><button class="rot" data-r="${i}">⟳</button>`);
    d.addEventListener('click', e => { if (e.target.closest('.rot')) return; p.sel = !p.sel; d.classList.toggle('sel', p.sel); });
    tkThumbs.appendChild(d);
  });
  tkThumbs.querySelectorAll('.rot').forEach(b => b.addEventListener('click', () => { const p = tkPages[+b.dataset.r]; p.rot = (p.rot + 90) % 360; renderTk(); }));
  const has = tkPages.length > 0;
  $('#tkBar').style.display = has ? 'flex' : 'none';
  $('#tkOpts').style.display = has ? 'flex' : 'none';
}
$('#tkAll').addEventListener('click', () => { tkPages.forEach(p => p.sel = true); renderTk(); });
$('#tkNone').addEventListener('click', () => { tkPages.forEach(p => p.sel = false); renderTk(); });
function rotatedCanvas(p){
  if (!p.rot) return p.canvas;
  const rotated = p.rot % 180 !== 0;
  const cv = document.createElement('canvas');
  cv.width = rotated ? p.canvas.height : p.canvas.width;
  cv.height = rotated ? p.canvas.width : p.canvas.height;
  const ctx = cv.getContext('2d'); ctx.translate(cv.width/2, cv.height/2); ctx.rotate(p.rot*Math.PI/180);
  ctx.drawImage(p.canvas, -p.canvas.width/2, -p.canvas.height/2); return cv;
}
const QSCALE = { high: 1, mid: 0.72, low: 0.5 };
$('#tkPdf').addEventListener('click', async () => {
  const sel = tkPages.filter(p => p.sel); if (!sel.length) return;
  busy(tkStatus);
  try {
    const qk = $('#tkQ').value, jpegQ = qk === 'high' ? 0.92 : qk === 'mid' ? 0.8 : 0.62, scale = QSCALE[qk];
    let pdf = null;
    for (const p of sel) {
      let cv = rotatedCanvas(p);
      if (scale < 1) { const s = document.createElement('canvas'); s.width = Math.round(cv.width*scale); s.height = Math.round(cv.height*scale); s.getContext('2d').drawImage(cv, 0, 0, s.width, s.height); cv = s; }
      const o = cv.width >= cv.height ? 'l' : 'p';
      if (!pdf) pdf = new jsPDF({ unit: 'px', orientation: o, format: [cv.width, cv.height] });
      else pdf.addPage([cv.width, cv.height], o);
      pdf.addImage(cv.toDataURL('image/jpeg', jpegQ), 'JPEG', 0, 0, cv.width, cv.height, undefined, 'FAST');
    }
    pdf.save('merged.pdf');
    setStatus(tkStatus, t('done') + ' (' + sel.length + ' ' + t('pages') + ')', 'ok');
  } catch (e) { setStatus(tkStatus, t('err') + e.message, 'err'); }
});
$('#tkImgs').addEventListener('click', async () => {
  const sel = tkPages.filter(p => p.sel); if (!sel.length) return;
  busy(tkStatus);
  try {
    const fmt = $('#tkImgFmt').value, mime = 'image/' + fmt, ext = fmt === 'jpeg' ? 'jpg' : 'png';
    if (sel.length === 1) {
      const cv = rotatedCanvas(sel[0]);
      download(await new Promise(r => cv.toBlob(r, mime, 0.92)), 'page-1.' + ext);
    } else {
      const zip = new JSZip();
      for (let i = 0; i < sel.length; i++) {
        const cv = rotatedCanvas(sel[i]);
        const blob = await new Promise(r => cv.toBlob(r, mime, 0.92));
        zip.file('page-' + (i+1) + '.' + ext, blob);
      }
      download(await zip.generateAsync({ type: 'blob' }), 'pages.zip');
    }
    setStatus(tkStatus, t('done'), 'ok');
  } catch (e) { setStatus(tkStatus, t('err') + e.message, 'err'); }
});

/* ============================================================
   4) PDF EDITOR  (per-page overlay ops → rebuild)
   ============================================================ */
let edBasePages = [];   // {canvas} rendered at edit scale
let edOps = [];         // array per page: [{type, ...} in page-canvas coords]
let edPage = 0, edMode = 'erase', edScale = 1.5, edPlacingImg = null;
const edCanvas = $('#edCanvas'), ovl = $('#ovl'), edStatus = $('#edStatus');
setupDrop($('#edDrop'), $('#edIn'), fs => loadEditor(fs[0]));
$('#edSize').addEventListener('input', e => $('#edSizeV').textContent = e.target.value + 'px');
$$('.edtools .mode').forEach(m => m.addEventListener('click', () => {
  edMode = m.dataset.m; $$('.edtools .mode').forEach(x => x.classList.toggle('on', x === m));
  if (edMode === 'image') { edPlacingImg = null; $('#edImgIn').click(); }
}));
$('#edImgIn').addEventListener('change', async () => {
  const f = $('#edImgIn').files[0]; $('#edImgIn').value = '';
  if (f) { edPlacingImg = await loadImage(await fileToDataURL(f)); setStatus(edStatus, t('placeImg'), 'busy'); }
});

async function loadEditor(file){
  if (!file) return;
  busy(edStatus);
  try {
    edBasePages = (await renderPdfToCanvases(file, edScale)).map(c => ({ canvas: c }));
    edOps = edBasePages.map(() => []);
    edPage = 0; $('#edWrap').classList.remove('hidden');
    drawPage(); setStatus(edStatus, '', '');
  } catch (e) { setStatus(edStatus, t('err') + e.message, 'err'); }
}
function drawPage(){
  const base = edBasePages[edPage].canvas;
  edCanvas.width = base.width; edCanvas.height = base.height;
  const ctx = edCanvas.getContext('2d');
  ctx.drawImage(base, 0, 0);
  for (const op of edOps[edPage]) paintOp(ctx, op);
  ovl.width = base.width; ovl.height = base.height;
  ovl.getContext('2d').clearRect(0, 0, ovl.width, ovl.height);
  $('#edPageLbl').textContent = (edPage + 1) + ' / ' + edBasePages.length;
}
function paintOp(ctx, op){
  if (op.type === 'rect') { ctx.fillStyle = op.color; ctx.fillRect(op.x, op.y, op.w, op.h); }
  else if (op.type === 'text') { ctx.fillStyle = op.color; ctx.font = op.size + 'px Helvetica, Arial, sans-serif'; ctx.textBaseline = 'top';
    op.text.split('\n').forEach((ln, i) => ctx.fillText(ln, op.x, op.y + i * op.size * 1.2)); }
  else if (op.type === 'image') { ctx.drawImage(op.img, op.x, op.y, op.w, op.h); }
}
function evtPos(e){
  const r = ovl.getBoundingClientRect(); const sx = ovl.width / r.width, sy = ovl.height / r.height;
  const cx = (e.touches ? e.touches[0].clientX : e.clientX), cy = (e.touches ? e.touches[0].clientY : e.clientY);
  return { x: (cx - r.left) * sx, y: (cy - r.top) * sy };
}
let drag = null;
function onDown(e){
  e.preventDefault();
  const p = evtPos(e);
  if (edMode === 'erase') { drag = { x0: p.x, y0: p.y }; }
  else if (edMode === 'text') {
    const txt = prompt(t('mText') + ':'); if (!txt) return;
    edOps[edPage].push({ type: 'text', x: p.x, y: p.y, text: txt, size: (+$('#edSize').value) * edScale, color: $('#edColor').value === '#ffffff' ? '#111111' : $('#edColor').value });
    drawPage();
  } else if (edMode === 'image' && edPlacingImg) {
    const w = Math.min(edPlacingImg.naturalWidth, edCanvas.width * 0.4);
    const h = w * edPlacingImg.naturalHeight / edPlacingImg.naturalWidth;
    edOps[edPage].push({ type: 'image', x: p.x, y: p.y, w, h, img: edPlacingImg });
    edPlacingImg = null; setStatus(edStatus, '', ''); drawPage();
  }
}
function onMove(e){
  if (!drag) return; e.preventDefault();
  const p = evtPos(e); const ctx = ovl.getContext('2d');
  ctx.clearRect(0, 0, ovl.width, ovl.height);
  ctx.fillStyle = $('#edColor').value + '99';
  ctx.fillRect(drag.x0, drag.y0, p.x - drag.x0, p.y - drag.y0);
}
function onUp(e){
  if (!drag) return; const p = evtPos(e);
  const x = Math.min(drag.x0, p.x), y = Math.min(drag.y0, p.y), w = Math.abs(p.x - drag.x0), h = Math.abs(p.y - drag.y0);
  if (w > 3 && h > 3) { edOps[edPage].push({ type: 'rect', x, y, w, h, color: $('#edColor').value }); drawPage(); }
  drag = null;
}
ovl.addEventListener('mousedown', onDown); ovl.addEventListener('mousemove', onMove); window.addEventListener('mouseup', onUp);
ovl.addEventListener('touchstart', onDown, { passive: false }); ovl.addEventListener('touchmove', onMove, { passive: false }); ovl.addEventListener('touchend', onUp);
$('#edPrev').addEventListener('click', () => { if (edPage > 0) { edPage--; drawPage(); } });
$('#edNext').addEventListener('click', () => { if (edPage < edBasePages.length - 1) { edPage++; drawPage(); } });
$('#edUndo').addEventListener('click', () => { edOps[edPage].pop(); drawPage(); });
$('#edClearPage').addEventListener('click', () => { edOps[edPage] = []; drawPage(); });
$('#edReset').addEventListener('click', () => { edBasePages = []; edOps = []; $('#edWrap').classList.add('hidden'); });
$('#edSave').addEventListener('click', async () => {
  busy(edStatus);
  try {
    let pdf = null;
    for (let i = 0; i < edBasePages.length; i++) {
      const base = edBasePages[i].canvas;
      const cv = document.createElement('canvas'); cv.width = base.width; cv.height = base.height;
      const ctx = cv.getContext('2d'); ctx.drawImage(base, 0, 0);
      for (const op of edOps[i]) paintOp(ctx, op);
      const o = cv.width >= cv.height ? 'l' : 'p';
      if (!pdf) pdf = new jsPDF({ unit: 'px', orientation: o, format: [cv.width, cv.height] });
      else pdf.addPage([cv.width, cv.height], o);
      pdf.addImage(cv.toDataURL('image/jpeg', 0.9), 'JPEG', 0, 0, cv.width, cv.height, undefined, 'FAST');
    }
    pdf.save('edited.pdf');
    setStatus(edStatus, t('done'), 'ok');
  } catch (e) { setStatus(edStatus, t('err') + e.message, 'err'); }
});

/* ---------------- init ---------------- */
applyLang();
