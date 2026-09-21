window.LUS_X_NEWS = {
  "updatedAt": "2026-09-21T09:25:59.665Z",
  "items": [
    {
      "time": "18:04",
      "title": "台風が関東最接近 夜にかけピーク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596044?source=rss",
      "publishedAt": "2026-09-21T09:04:01.000Z",
      "xQuery": "台風が関東最接近 夜にかけピーク"
    },
    {
      "time": "14:08",
      "title": "台風25号 今後の見通しや最新情報",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596016?source=rss",
      "publishedAt": "2026-09-21T05:08:33.000Z",
      "xQuery": "台風25号 今後の見通しや最新情報"
    },
    {
      "time": "17:29",
      "title": "千葉・君津市の小糸川 氾濫か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596041?source=rss",
      "publishedAt": "2026-09-21T08:29:06.000Z",
      "xQuery": "千葉・君津市の小糸川 氾濫か"
    },
    {
      "time": "17:58",
      "title": "鎌倉で道路が川のように 車水没も",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596043?source=rss",
      "publishedAt": "2026-09-21T08:58:33.000Z",
      "xQuery": "鎌倉で道路が川のように 車水没も"
    },
    {
      "time": "14:19",
      "title": "食事も「キャンセル」若者の実態",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6596013?source=rss",
      "publishedAt": "2026-09-21T05:19:58.000Z",
      "xQuery": "食事も「キャンセル」若者の実態"
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
