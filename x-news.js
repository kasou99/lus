window.LUS_X_NEWS = {
  "updatedAt": "2026-07-05T03:15:20.234Z",
  "items": [
    {
      "time": "11:16",
      "title": "九州北部大雨 昼過ぎまで厳重警戒",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586785?source=rss",
      "publishedAt": "2026-07-05T02:16:20.000Z",
      "xQuery": "九州北部大雨 昼過ぎまで厳重警戒"
    },
    {
      "time": "09:34",
      "title": "「維新2法案」カギ握る首相の判断",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586771?source=rss",
      "publishedAt": "2026-07-05T00:34:34.000Z",
      "xQuery": "「維新2法案」カギ握る首相の判断"
    },
    {
      "time": "11:18",
      "title": "犯罪組織プリンスGの幹部 再逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586784?source=rss",
      "publishedAt": "2026-07-05T02:18:12.000Z",
      "xQuery": "犯罪組織プリンスGの幹部 再逮捕"
    },
    {
      "time": "10:50",
      "title": "歩が死んだ 娘の死知った母の記憶",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586781?source=rss",
      "publishedAt": "2026-07-05T01:50:37.000Z",
      "xQuery": "歩が死んだ 娘の死知った母の記憶"
    },
    {
      "time": "11:46",
      "title": "スクイーズにのめり込み 貯金が底",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6586786?source=rss",
      "publishedAt": "2026-07-05T02:46:16.000Z",
      "xQuery": "スクイーズにのめり込み 貯金が底"
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
