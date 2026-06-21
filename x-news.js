window.LUS_X_NEWS = {
  "updatedAt": "2026-06-21T01:21:30.217Z",
  "items": [
    {
      "time": "09:31",
      "title": "米がイランの海峡再封鎖否定 報道",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585049?source=rss",
      "publishedAt": "2026-06-21T00:31:38.000Z",
      "xQuery": "米がイランの海峡再封鎖否定 報道"
    },
    {
      "time": "08:21",
      "title": "中傷動画疑惑 野党が追及加速へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585040?source=rss",
      "publishedAt": "2026-06-20T23:21:57.000Z",
      "xQuery": "中傷動画疑惑 野党が追及加速へ"
    },
    {
      "time": "07:39",
      "title": "公園でランニング中 男性刺される",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585034?source=rss",
      "publishedAt": "2026-06-20T22:39:13.000Z",
      "xQuery": "公園でランニング中 男性刺される"
    },
    {
      "time": "09:48",
      "title": "麻薬捜査中にピカソ作品発見 仏",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585056?source=rss",
      "publishedAt": "2026-06-21T00:48:17.000Z",
      "xQuery": "麻薬捜査中にピカソ作品発見 仏"
    },
    {
      "time": "08:50",
      "title": "ナポレオンジャケット 再ブームか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6585044?source=rss",
      "publishedAt": "2026-06-20T23:50:43.000Z",
      "xQuery": "ナポレオンジャケット 再ブームか"
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
