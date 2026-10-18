window.LUS_X_NEWS = {
  "updatedAt": "2026-10-18T04:42:34.901Z",
  "items": [
    {
      "time": "12:07",
      "title": "非常に強い台風30号 23日沖縄南に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599221?source=rss",
      "publishedAt": "2026-10-18T03:07:59.000Z",
      "xQuery": "非常に強い台風30号 23日沖縄南に"
    },
    {
      "time": "12:17",
      "title": "群馬母子殺傷 殺人疑いで男再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599223?source=rss",
      "publishedAt": "2026-10-18T03:17:42.000Z",
      "xQuery": "群馬母子殺傷 殺人疑いで男再逮捕"
    },
    {
      "time": "10:16",
      "title": "仏で55万人デモ 市庁舎ほぼ全焼",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599210?source=rss",
      "publishedAt": "2026-10-18T01:16:44.000Z",
      "xQuery": "仏で55万人デモ 市庁舎ほぼ全焼"
    },
    {
      "time": "11:54",
      "title": "軽トラと車に挟まれ女性両足切断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599220?source=rss",
      "publishedAt": "2026-10-18T02:54:44.000Z",
      "xQuery": "軽トラと車に挟まれ女性両足切断"
    },
    {
      "time": "12:49",
      "title": "インド祭典で群衆事故 40人超死傷",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599225?source=rss",
      "publishedAt": "2026-10-18T03:49:28.000Z",
      "xQuery": "インド祭典で群衆事故 40人超死傷"
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
