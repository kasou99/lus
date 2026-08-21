window.LUS_X_NEWS = {
  "updatedAt": "2026-08-21T08:48:03.703Z",
  "items": [
    {
      "time": "16:23",
      "title": "不祥事相次ぐ検察 閉ざされた会見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592544?source=rss",
      "publishedAt": "2026-08-21T07:23:02.000Z",
      "xQuery": "不祥事相次ぐ検察 閉ざされた会見"
    },
    {
      "time": "17:14",
      "title": "横浜市主催の会議 市長参加見送り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592554?source=rss",
      "publishedAt": "2026-08-21T08:14:07.000Z",
      "xQuery": "横浜市主催の会議 市長参加見送り"
    },
    {
      "time": "12:56",
      "title": "露戦略会議に変化「戦後」意識?",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592522?source=rss",
      "publishedAt": "2026-08-21T03:56:24.000Z",
      "xQuery": "露戦略会議に変化「戦後」意識?"
    },
    {
      "time": "17:08",
      "title": "病院から姿消した被告 遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592555?source=rss",
      "publishedAt": "2026-08-21T08:08:16.000Z",
      "xQuery": "病院から姿消した被告 遺体で発見"
    },
    {
      "time": "17:26",
      "title": "ゴルフ研修生19歳自殺 両親が提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6592557?source=rss",
      "publishedAt": "2026-08-21T08:26:23.000Z",
      "xQuery": "ゴルフ研修生19歳自殺 両親が提訴"
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
