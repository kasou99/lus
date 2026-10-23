window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T04:20:20.949Z",
  "items": [
    {
      "time": "13:05",
      "title": "作家・村上龍さん死去 74歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599801?source=rss",
      "publishedAt": "2026-10-23T04:05:37.000Z",
      "xQuery": "作家・村上龍さん死去 74歳"
    },
    {
      "time": "10:45",
      "title": "台風30号 26日に九州上陸の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599784?source=rss",
      "publishedAt": "2026-10-23T01:45:54.000Z",
      "xQuery": "台風30号 26日に九州上陸の恐れ"
    },
    {
      "time": "11:41",
      "title": "復興相 事務所数を巡り報告書訂正",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599788?source=rss",
      "publishedAt": "2026-10-23T02:41:20.000Z",
      "xQuery": "復興相 事務所数を巡り報告書訂正"
    },
    {
      "time": "10:24",
      "title": "体一部ないシカ死骸4体 人為的か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599783?source=rss",
      "publishedAt": "2026-10-23T01:24:07.000Z",
      "xQuery": "体一部ないシカ死骸4体 人為的か"
    },
    {
      "time": "10:37",
      "title": "笹かまメーカー相次ぐ倒産 背景",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599782?source=rss",
      "publishedAt": "2026-10-23T01:37:44.000Z",
      "xQuery": "笹かまメーカー相次ぐ倒産 背景"
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
