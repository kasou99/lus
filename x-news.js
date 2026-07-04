window.LUS_X_NEWS = {
  "updatedAt": "2026-07-04T12:34:30.494Z",
  "items": [
    {
      "time": "19:18",
      "title": "露のキーウ攻撃 甚大な被害の理由",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586726?source=rss",
      "publishedAt": "2026-07-04T10:18:53.000Z",
      "xQuery": "露のキーウ攻撃 甚大な被害の理由"
    },
    {
      "time": "17:37",
      "title": "ハメネイ師の国葬 2000万人参列か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586716?source=rss",
      "publishedAt": "2026-07-04T08:37:42.000Z",
      "xQuery": "ハメネイ師の国葬 2000万人参列か"
    },
    {
      "time": "15:29",
      "title": "不明の10歳死亡 父が声震わせ訴え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586704?source=rss",
      "publishedAt": "2026-07-04T06:29:41.000Z",
      "xQuery": "不明の10歳死亡 父が声震わせ訴え"
    },
    {
      "time": "19:54",
      "title": "症状認めたくない 男性更年期障害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586731?source=rss",
      "publishedAt": "2026-07-04T10:54:05.000Z",
      "xQuery": "症状認めたくない 男性更年期障害"
    },
    {
      "time": "18:31",
      "title": "「仮面夫婦」会話ほぼゼロの男性",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586723?source=rss",
      "publishedAt": "2026-07-04T09:31:39.000Z",
      "xQuery": "「仮面夫婦」会話ほぼゼロの男性"
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
