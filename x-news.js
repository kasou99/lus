window.LUS_X_NEWS = {
  "updatedAt": "2026-06-12T07:52:16.005Z",
  "items": [
    {
      "time": "15:30",
      "title": "再審見直し法案 衆院委員会で可決",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583965?source=rss",
      "publishedAt": "2026-06-12T06:30:47.000Z",
      "xQuery": "再審見直し法案 衆院委員会で可決"
    },
    {
      "time": "16:09",
      "title": "JAL飲酒CA問題 国交省が厳重注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583969?source=rss",
      "publishedAt": "2026-06-12T07:09:18.000Z",
      "xQuery": "JAL飲酒CA問題 国交省が厳重注意"
    },
    {
      "time": "16:15",
      "title": "H3飛行中に物体落下確認 調査へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583970?source=rss",
      "publishedAt": "2026-06-12T07:15:58.000Z",
      "xQuery": "H3飛行中に物体落下確認 調査へ"
    },
    {
      "time": "15:36",
      "title": "女性用トイレ行列 国交省が初指針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583966?source=rss",
      "publishedAt": "2026-06-12T06:36:56.000Z",
      "xQuery": "女性用トイレ行列 国交省が初指針"
    },
    {
      "time": "16:07",
      "title": "「黒字リストラ」退職 57歳の現実",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583971?source=rss",
      "publishedAt": "2026-06-12T07:07:53.000Z",
      "xQuery": "「黒字リストラ」退職 57歳の現実"
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
