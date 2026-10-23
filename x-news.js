window.LUS_X_NEWS = {
  "updatedAt": "2026-10-23T06:57:45.862Z",
  "items": [
    {
      "time": "13:33",
      "title": "台風接近 沖縄～関東は大雨の恐れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599802?source=rss",
      "publishedAt": "2026-10-23T04:33:56.000Z",
      "xQuery": "台風接近 沖縄～関東は大雨の恐れ"
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
      "time": "13:14",
      "title": "マンション修繕会議 業者潜入発覚",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599799?source=rss",
      "publishedAt": "2026-10-23T04:14:19.000Z",
      "xQuery": "マンション修繕会議 業者潜入発覚"
    },
    {
      "time": "14:54",
      "title": "本当の理由言わず退職 なぜ深刻か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599809?source=rss",
      "publishedAt": "2026-10-23T05:54:32.000Z",
      "xQuery": "本当の理由言わず退職 なぜ深刻か"
    },
    {
      "time": "11:39",
      "title": "NYセントラルパークの馬車廃止へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6599787?source=rss",
      "publishedAt": "2026-10-23T02:39:24.000Z",
      "xQuery": "NYセントラルパークの馬車廃止へ"
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
