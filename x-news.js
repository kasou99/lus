window.LUS_X_NEWS = {
  "updatedAt": "2026-05-22T11:29:10.661Z",
  "items": [
    {
      "time": "19:57",
      "title": "転覆事故 同志社が再発防止策発表",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581270?source=rss",
      "publishedAt": "2026-05-22T10:57:29.000Z",
      "xQuery": "転覆事故 同志社が再発防止策発表"
    },
    {
      "time": "18:46",
      "title": "首相の国会出席大幅削減を 吉村氏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581261?source=rss",
      "publishedAt": "2026-05-22T09:46:59.000Z",
      "xQuery": "首相の国会出席大幅削減を 吉村氏"
    },
    {
      "time": "19:29",
      "title": "韓国のスターバックスで不買運動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581267?source=rss",
      "publishedAt": "2026-05-22T10:29:26.000Z",
      "xQuery": "韓国のスターバックスで不買運動"
    },
    {
      "time": "17:24",
      "title": "デニム老舗「Lee」売却先が決定",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581246?source=rss",
      "publishedAt": "2026-05-22T08:24:38.000Z",
      "xQuery": "デニム老舗「Lee」売却先が決定"
    },
    {
      "time": "19:56",
      "title": "潜在患者1000万人超 気象病に注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581269?source=rss",
      "publishedAt": "2026-05-22T10:56:01.000Z",
      "xQuery": "潜在患者1000万人超 気象病に注意"
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
