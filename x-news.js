window.LUS_X_NEWS = {
  "updatedAt": "2026-06-22T08:35:31.495Z",
  "items": [
    {
      "time": "15:27",
      "title": "消費減税「2年期限」首相が明言",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585200?source=rss",
      "publishedAt": "2026-06-22T06:27:51.000Z",
      "xQuery": "消費減税「2年期限」首相が明言"
    },
    {
      "time": "16:51",
      "title": "沖縄戦 子どもに語れなかった母親",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585218?source=rss",
      "publishedAt": "2026-06-22T07:51:01.000Z",
      "xQuery": "沖縄戦 子どもに語れなかった母親"
    },
    {
      "time": "16:25",
      "title": "内田被告の裁判 男侵入して暴れる",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585213?source=rss",
      "publishedAt": "2026-06-22T07:25:30.000Z",
      "xQuery": "内田被告の裁判 男侵入して暴れる"
    },
    {
      "time": "17:05",
      "title": "首相の専用車 センチュリーSUVに",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585219?source=rss",
      "publishedAt": "2026-06-22T08:05:34.000Z",
      "xQuery": "首相の専用車 センチュリーSUVに"
    },
    {
      "time": "16:35",
      "title": "34歳で乳がん 人工乳房製作の道へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585214?source=rss",
      "publishedAt": "2026-06-22T07:35:04.000Z",
      "xQuery": "34歳で乳がん 人工乳房製作の道へ"
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
