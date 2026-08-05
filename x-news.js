window.LUS_X_NEWS = {
  "updatedAt": "2026-08-05T13:06:49.813Z",
  "items": [
    {
      "time": "18:15",
      "title": "被爆時は1歳 家族の証言継ぐ女性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590635?source=rss",
      "publishedAt": "2026-08-05T09:15:08.000Z",
      "xQuery": "被爆時は1歳 家族の証言継ぐ女性"
    },
    {
      "time": "21:55",
      "title": "政府AIを被災自治体に提供 利点は",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590639?source=rss",
      "publishedAt": "2026-08-05T12:55:06.000Z",
      "xQuery": "政府AIを被災自治体に提供 利点は"
    },
    {
      "time": "15:41",
      "title": "8月も高温傾向続く 今後の見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590615?source=rss",
      "publishedAt": "2026-08-05T06:41:18.000Z",
      "xQuery": "8月も高温傾向続く 今後の見通し"
    },
    {
      "time": "20:11",
      "title": "消費減税巡り 野党が一斉に批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590655?source=rss",
      "publishedAt": "2026-08-05T11:11:08.000Z",
      "xQuery": "消費減税巡り 野党が一斉に批判"
    },
    {
      "time": "21:42",
      "title": "職員の性被害巡り NHKが対応謝罪",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6590660?source=rss",
      "publishedAt": "2026-08-05T12:42:13.000Z",
      "xQuery": "職員の性被害巡り NHKが対応謝罪"
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
