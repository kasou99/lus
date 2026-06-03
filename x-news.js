window.LUS_X_NEWS = {
  "updatedAt": "2026-06-03T05:47:57.522Z",
  "items": [
    {
      "time": "11:52",
      "title": "台風6号 関東は夕方まで風ピーク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582765?source=rss",
      "publishedAt": "2026-06-03T02:52:00.000Z",
      "xQuery": "台風6号 関東は夕方まで風ピーク"
    },
    {
      "time": "14:28",
      "title": "25年出生数67万人 10年連続で最少",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582782?source=rss",
      "publishedAt": "2026-06-03T05:28:40.000Z",
      "xQuery": "25年出生数67万人 10年連続で最少"
    },
    {
      "time": "13:42",
      "title": "一時1ドル160円台 1カ月ぶり水準",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582776?source=rss",
      "publishedAt": "2026-06-03T04:42:27.000Z",
      "xQuery": "一時1ドル160円台 1カ月ぶり水準"
    },
    {
      "time": "14:05",
      "title": "特別警報の町 浸水で「別世界」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582781?source=rss",
      "publishedAt": "2026-06-03T05:05:34.000Z",
      "xQuery": "特別警報の町 浸水で「別世界」"
    },
    {
      "time": "13:20",
      "title": "旭川17歳殺害 腹立っていたと被告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582769?source=rss",
      "publishedAt": "2026-06-03T04:20:07.000Z",
      "xQuery": "旭川17歳殺害 腹立っていたと被告"
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
