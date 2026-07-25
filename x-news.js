window.LUS_X_NEWS = {
  "updatedAt": "2026-07-25T11:57:38.635Z",
  "items": [
    {
      "time": "16:45",
      "title": "国会 政府提出法案の成立率100%",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589269?source=rss",
      "publishedAt": "2026-07-25T07:45:40.000Z",
      "xQuery": "国会 政府提出法案の成立率100%"
    },
    {
      "time": "19:27",
      "title": "中道 内閣不信任案の提出を見送り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589288?source=rss",
      "publishedAt": "2026-07-25T10:27:51.000Z",
      "xQuery": "中道 内閣不信任案の提出を見送り"
    },
    {
      "time": "20:41",
      "title": "副首都 大阪・福岡・愛知が名乗り",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589298?source=rss",
      "publishedAt": "2026-07-25T11:41:38.000Z",
      "xQuery": "副首都 大阪・福岡・愛知が名乗り"
    },
    {
      "time": "18:31",
      "title": "切断遺体 事件後にノコギリ出品か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589285?source=rss",
      "publishedAt": "2026-07-25T09:31:22.000Z",
      "xQuery": "切断遺体 事件後にノコギリ出品か"
    },
    {
      "time": "19:53",
      "title": "海で80歳死亡 孫らと訪れ溺れたか",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589291?source=rss",
      "publishedAt": "2026-07-25T10:53:25.000Z",
      "xQuery": "海で80歳死亡 孫らと訪れ溺れたか"
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
