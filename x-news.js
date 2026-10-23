window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T08:23:46.841Z",
  "items": [
    {
      "time": "16:12",
      "title": "佐川急便で情報流出 最大5323万件",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599819?source=rss",
      "publishedAt": "2026-10-23T07:12:30.000Z",
      "xQuery": "佐川急便で情報流出 最大5323万件"
    },
    {
      "time": "15:15",
      "title": "リニア静岡工区 年内着工は困難か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599808?source=rss",
      "publishedAt": "2026-10-23T06:15:57.000Z",
      "xQuery": "リニア静岡工区 年内着工は困難か"
    },
    {
      "time": "15:21",
      "title": "暴徒化 仏デモ参加者が嘆く理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599811?source=rss",
      "publishedAt": "2026-10-23T06:21:02.000Z",
      "xQuery": "暴徒化 仏デモ参加者が嘆く理由"
    },
    {
      "time": "16:59",
      "title": "パーク24 流出の146万人に見舞金",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599823?source=rss",
      "publishedAt": "2026-10-23T07:59:33.000Z",
      "xQuery": "パーク24 流出の146万人に見舞金"
    },
    {
      "time": "16:33",
      "title": "閉館の大阪松竹座 11月から解体",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599822?source=rss",
      "publishedAt": "2026-10-23T07:33:06.000Z",
      "xQuery": "閉館の大阪松竹座 11月から解体"
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
