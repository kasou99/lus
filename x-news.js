window.LUS_X_NEWS = {
  "updatedAt": "2026-05-23T03:48:20.106Z",
  "items": [
    {
      "time": "10:35",
      "title": "磐越道バス事故 責任能力問えるか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581328?source=rss",
      "publishedAt": "2026-05-23T01:35:24.000Z",
      "xQuery": "磐越道バス事故 責任能力問えるか"
    },
    {
      "time": "12:16",
      "title": "栃木強殺に警視庁を投入 異例対応",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581342?source=rss",
      "publishedAt": "2026-05-23T03:16:02.000Z",
      "xQuery": "栃木強殺に警視庁を投入 異例対応"
    },
    {
      "time": "11:42",
      "title": "妻殺害疑い「異性関係疑われた」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581337?source=rss",
      "publishedAt": "2026-05-23T02:42:42.000Z",
      "xQuery": "妻殺害疑い「異性関係疑われた」"
    },
    {
      "time": "09:09",
      "title": "大学無償化で3浪以上が除外 なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581321?source=rss",
      "publishedAt": "2026-05-23T00:09:33.000Z",
      "xQuery": "大学無償化で3浪以上が除外 なぜ"
    },
    {
      "time": "10:51",
      "title": "「スッパイマン」転機は木村拓哉",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581332?source=rss",
      "publishedAt": "2026-05-23T01:51:58.000Z",
      "xQuery": "「スッパイマン」転機は木村拓哉"
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
