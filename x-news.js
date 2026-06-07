window.LUS_X_NEWS = {
  "updatedAt": "2026-06-07T03:49:41.112Z",
  "items": [
    {
      "time": "10:30",
      "title": "書店1万店割れ ピーク時の4割余り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583271?source=rss",
      "publishedAt": "2026-06-07T01:30:42.000Z",
      "xQuery": "書店1万店割れ ピーク時の4割余り"
    },
    {
      "time": "09:30",
      "title": "ラオス洞窟2人不明 捜索打ち切り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583264?source=rss",
      "publishedAt": "2026-06-07T00:30:02.000Z",
      "xQuery": "ラオス洞窟2人不明 捜索打ち切り"
    },
    {
      "time": "12:03",
      "title": "差別止めようとした弁護士 標的に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583278?source=rss",
      "publishedAt": "2026-06-07T03:03:33.000Z",
      "xQuery": "差別止めようとした弁護士 標的に"
    },
    {
      "time": "11:59",
      "title": "京都で不明の米学生 遺体で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583281?source=rss",
      "publishedAt": "2026-06-07T02:59:07.000Z",
      "xQuery": "京都で不明の米学生 遺体で発見"
    },
    {
      "time": "10:41",
      "title": "就活チョロい AI使い5社内定22歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583273?source=rss",
      "publishedAt": "2026-06-07T01:41:24.000Z",
      "xQuery": "就活チョロい AI使い5社内定22歳"
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
