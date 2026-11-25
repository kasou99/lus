window.LUS_X_NEWS = {
  "updatedAt": "2026-11-25T11:36:20.164Z",
  "items": [
    {
      "time": "18:57",
      "title": "国立成育医療研究センターで不正",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603960?source=rss",
      "publishedAt": "2026-11-25T09:57:33.000Z",
      "xQuery": "国立成育医療研究センターで不正"
    },
    {
      "time": "17:04",
      "title": "介護保険料 一部高齢者負担増検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603939?source=rss",
      "publishedAt": "2026-11-25T08:04:47.000Z",
      "xQuery": "介護保険料 一部高齢者負担増検討"
    },
    {
      "time": "20:16",
      "title": "福岡刺殺事件 男に任意で事情聴取",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603969?source=rss",
      "publishedAt": "2026-11-25T11:16:54.000Z",
      "xQuery": "福岡刺殺事件 男に任意で事情聴取"
    },
    {
      "time": "18:36",
      "title": "逮捕の徳島・阿波市長が辞任意向",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603958?source=rss",
      "publishedAt": "2026-11-25T09:36:31.000Z",
      "xQuery": "逮捕の徳島・阿波市長が辞任意向"
    },
    {
      "time": "19:08",
      "title": "トヨタ「新型カムリ」12月に発売",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6603964?source=rss",
      "publishedAt": "2026-11-25T10:08:02.000Z",
      "xQuery": "トヨタ「新型カムリ」12月に発売"
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
