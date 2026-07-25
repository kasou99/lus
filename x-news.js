window.LUS_X_NEWS = {
  "updatedAt": "2026-07-25T10:34:36.927Z",
  "items": [
    {
      "time": "15:55",
      "title": "夕食会再び開催 トランプ氏が演説",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589262?source=rss",
      "publishedAt": "2026-07-25T06:55:29.000Z",
      "xQuery": "夕食会再び開催 トランプ氏が演説"
    },
    {
      "time": "17:47",
      "title": "最賃で競争「チキンレース」の声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589279?source=rss",
      "publishedAt": "2026-07-25T08:47:05.000Z",
      "xQuery": "最賃で競争「チキンレース」の声"
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
      "time": "17:57",
      "title": "ジャングリア売上100億円超見通し",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589278?source=rss",
      "publishedAt": "2026-07-25T08:57:45.000Z",
      "xQuery": "ジャングリア売上100億円超見通し"
    },
    {
      "time": "15:34",
      "title": "商社→タクシー運転手 給料倍以上",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6589261?source=rss",
      "publishedAt": "2026-07-25T06:34:28.000Z",
      "xQuery": "商社→タクシー運転手 給料倍以上"
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
