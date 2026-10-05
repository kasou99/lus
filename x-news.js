window.LUS_X_NEWS = {
  "updatedAt": "2026-10-05T22:39:20.180Z",
  "items": [
    {
      "time": "22:18",
      "title": "首相所信表明 野党から批判相次ぐ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597677?source=rss",
      "publishedAt": "2026-10-05T13:18:57.000Z",
      "xQuery": "首相所信表明 野党から批判相次ぐ"
    },
    {
      "time": "20:58",
      "title": "フジパン熊本工場 生産再開を断念",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597666?source=rss",
      "publishedAt": "2026-10-05T11:58:26.000Z",
      "xQuery": "フジパン熊本工場 生産再開を断念"
    },
    {
      "time": "06:45",
      "title": "米兵逮捕 米メディアも相次ぎ報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597691?source=rss",
      "publishedAt": "2026-10-05T21:45:07.000Z",
      "xQuery": "米兵逮捕 米メディアも相次ぎ報道"
    },
    {
      "time": "07:23",
      "title": "NY州で緊急事態宣言 はしか増加",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597694?source=rss",
      "publishedAt": "2026-10-05T22:23:55.000Z",
      "xQuery": "NY州で緊急事態宣言 はしか増加"
    },
    {
      "time": "06:30",
      "title": "露のペスト研究所員死亡 米が注視",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6597690?source=rss",
      "publishedAt": "2026-10-05T21:30:32.000Z",
      "xQuery": "露のペスト研究所員死亡 米が注視"
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
