window.LUS_X_NEWS = {
  "updatedAt": "2026-10-12T13:39:54.273Z",
  "items": [
    {
      "time": "20:25",
      "title": "ICC制裁 赤根智子所長がコメント",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598542?source=rss",
      "publishedAt": "2026-10-12T11:25:28.000Z",
      "xQuery": "ICC制裁 赤根智子所長がコメント"
    },
    {
      "time": "20:47",
      "title": "共産党 野党共闘路線を転換方針",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598544?source=rss",
      "publishedAt": "2026-10-12T11:47:02.000Z",
      "xQuery": "共産党 野党共闘路線を転換方針"
    },
    {
      "time": "21:58",
      "title": "木にみこし衝突 中学生ら5人けが",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598550?source=rss",
      "publishedAt": "2026-10-12T12:58:40.000Z",
      "xQuery": "木にみこし衝突 中学生ら5人けが"
    },
    {
      "time": "19:40",
      "title": "だんじり死傷事故 伝統か安全か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598537?source=rss",
      "publishedAt": "2026-10-12T10:40:49.000Z",
      "xQuery": "だんじり死傷事故 伝統か安全か"
    },
    {
      "time": "21:39",
      "title": "setlog流行 日常を切り取るリスク",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6598548?source=rss",
      "publishedAt": "2026-10-12T12:39:11.000Z",
      "xQuery": "setlog流行 日常を切り取るリスク"
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
