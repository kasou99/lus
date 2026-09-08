window.LUS_X_NEWS = {
  "updatedAt": "2026-09-08T08:24:54.796Z",
  "items": [
    {
      "time": "16:56",
      "title": "愛知・岐阜に「線状降水帯」発生",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594660?source=rss",
      "publishedAt": "2026-09-08T07:56:07.000Z",
      "xQuery": "愛知・岐阜に「線状降水帯」発生"
    },
    {
      "time": "16:52",
      "title": "東海道・山陽新幹線 一部見合わせ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594658?source=rss",
      "publishedAt": "2026-09-08T07:52:02.000Z",
      "xQuery": "東海道・山陽新幹線 一部見合わせ"
    },
    {
      "time": "15:41",
      "title": "福岡女性遺体 殺人容疑で3人逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594653?source=rss",
      "publishedAt": "2026-09-08T06:41:15.000Z",
      "xQuery": "福岡女性遺体 殺人容疑で3人逮捕"
    },
    {
      "time": "16:55",
      "title": "園児から「しね」手紙 いじめ相当",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594659?source=rss",
      "publishedAt": "2026-09-08T07:55:40.000Z",
      "xQuery": "園児から「しね」手紙 いじめ相当"
    },
    {
      "time": "15:00",
      "title": "デヴィ夫人に罰金20万円を求刑",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6594649?source=rss",
      "publishedAt": "2026-09-08T06:00:40.000Z",
      "xQuery": "デヴィ夫人に罰金20万円を求刑"
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
