window.LUS_X_NEWS = {
  "updatedAt": "2026-10-29T23:36:32.839Z",
  "items": [
    {
      "time": "07:29",
      "title": "ガソリン補助金 12月から段階縮小",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600631?source=rss",
      "publishedAt": "2026-10-29T22:29:44.000Z",
      "xQuery": "ガソリン補助金 12月から段階縮小"
    },
    {
      "time": "07:40",
      "title": "NVIDIAトップに中国工作員接近か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600632?source=rss",
      "publishedAt": "2026-10-29T22:40:32.000Z",
      "xQuery": "NVIDIAトップに中国工作員接近か"
    },
    {
      "time": "08:05",
      "title": "名古屋で母娘刺され重傷か 男逃走",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600638?source=rss",
      "publishedAt": "2026-10-29T23:05:54.000Z",
      "xQuery": "名古屋で母娘刺され重傷か 男逃走"
    },
    {
      "time": "06:12",
      "title": "八田與一容疑者の鮮明な写真公開",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600624?source=rss",
      "publishedAt": "2026-10-29T21:12:54.000Z",
      "xQuery": "八田與一容疑者の鮮明な写真公開"
    },
    {
      "time": "07:49",
      "title": "ナップザック 中高生になぜ人気",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600634?source=rss",
      "publishedAt": "2026-10-29T22:49:30.000Z",
      "xQuery": "ナップザック 中高生になぜ人気"
    }
  ]
};

(function renderLusXNews() {
  const data = window.LUS_X_NEWS || { items: [] };

  function escapeX(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => {
      if (char === "&") return "&amp;";
      if (char === "<") return "&lt;";
      if (char === ">") return "&gt;";
      if (char === '"') return "&quot;";
      return "&#039;";
    });
  }

  function xSearchUrl(item) {
    const query = item.xQuery || item.originalTitle || item.title || "";
    return "https://x.com/search?q=" + encodeURIComponent(query + " lang:ja") + "&src=typed_query&f=live";
  }

  function render() {
    const grid = document.querySelector(".news-grid.headline-mode");
    if (!grid) return false;

    let card = document.querySelector("#xTrendCard");
    if (!card) {
      card = document.createElement("article");
      card.className = "headline-card x-trend-card";
      card.id = "xTrendCard";
      grid.prepend(card);
    }

    const items = (data.items || []).slice(0, 5);
    card.innerHTML = `
      <div class="headline-top"><h3>Xで追う人気ニュースTop5</h3><span>新着順</span></div>
      <div id="xTrendHeadlines">
        ${items.length ? items.map((item) => `
          <a class="headline-item" href="${xSearchUrl(item)}" target="_blank" rel="noopener">
            <span class="headline-time">${escapeX(item.time || "速報")}</span>
            <span><strong class="headline-title">${escapeX(item.title)}</strong><span class="headline-source">${item.translated ? "自動翻訳 / " : ""}Xの新着投稿を開く / ${escapeX(item.source || "ニュース")}</span></span>
          </a>
        `).join("") : `<p class="headline-error">Xで追う見出しを準備中です。</p>`}
      </div>
    `;
    return true;
  }

  function scheduleRender() {
    let count = 0;
    const tick = () => {
      render();
      count += 1;
      if (count < 10) setTimeout(tick, 450);
    };
    tick();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleRender);
  } else {
    scheduleRender();
  }

  document.addEventListener("change", (event) => {
    if (event.target && event.target.id === "newsRegionSelect") setTimeout(render, 700);
  });
})();
