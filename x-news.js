window.LUS_X_NEWS = {
  "updatedAt": "2026-06-24T12:19:03.640Z",
  "items": [
    {
      "time": "18:55",
      "title": "九州〜関東 警報級の大雨続く恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585509?source=rss",
      "publishedAt": "2026-06-24T09:55:09.000Z",
      "xQuery": "九州〜関東 警報級の大雨続く恐れ"
    },
    {
      "time": "20:25",
      "title": "雨で浸水相次ぐ ボートで住民救助",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585517?source=rss",
      "publishedAt": "2026-06-24T11:25:51.000Z",
      "xQuery": "雨で浸水相次ぐ ボートで住民救助"
    },
    {
      "time": "20:41",
      "title": "弁護側 内田梨瑚被告は判決に納得",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585518?source=rss",
      "publishedAt": "2026-06-24T11:41:28.000Z",
      "xQuery": "弁護側 内田梨瑚被告は判決に納得"
    },
    {
      "time": "21:11",
      "title": "高崎の殺人事件 被害者は28歳女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585520?source=rss",
      "publishedAt": "2026-06-24T12:11:23.000Z",
      "xQuery": "高崎の殺人事件 被害者は28歳女性"
    },
    {
      "time": "16:54",
      "title": "自転車追い抜き 新規定で別の違反",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585491?source=rss",
      "publishedAt": "2026-06-24T07:54:37.000Z",
      "xQuery": "自転車追い抜き 新規定で別の違反"
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
