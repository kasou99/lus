window.LUS_X_NEWS = {
  "updatedAt": "2026-05-29T09:23:35.104Z",
  "items": [
    {
      "time": "17:57",
      "title": "台風6号は2日にかけ沖縄接近 警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582199?source=rss",
      "publishedAt": "2026-05-29T08:57:11.000Z",
      "xQuery": "台風6号は2日にかけ沖縄接近 警戒"
    },
    {
      "time": "16:35",
      "title": "衆院選1票の格差 「合憲」10件目",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582188?source=rss",
      "publishedAt": "2026-05-29T07:35:57.000Z",
      "xQuery": "衆院選1票の格差 「合憲」10件目"
    },
    {
      "time": "16:56",
      "title": "17歳殺害 態度イライラしたと被告",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582189?source=rss",
      "publishedAt": "2026-05-29T07:56:35.000Z",
      "xQuery": "17歳殺害 態度イライラしたと被告"
    },
    {
      "time": "18:05",
      "title": "乳児院で横領疑い 被害1.5億円か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582200?source=rss",
      "publishedAt": "2026-05-29T09:05:54.000Z",
      "xQuery": "乳児院で横領疑い 被害1.5億円か"
    },
    {
      "time": "18:06",
      "title": "配管工事中にガス漏れか 心肺停止",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6582201?source=rss",
      "publishedAt": "2026-05-29T09:06:42.000Z",
      "xQuery": "配管工事中にガス漏れか 心肺停止"
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
