window.LUS_X_NEWS = {
  "updatedAt": "2026-06-09T01:08:06.585Z",
  "items": [
    {
      "time": "08:11",
      "title": "3文書改定 非核三原則見直し賛否",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583506?source=rss",
      "publishedAt": "2026-06-08T23:11:13.000Z",
      "xQuery": "3文書改定 非核三原則見直し賛否"
    },
    {
      "time": "08:38",
      "title": "OpenAIがIPO申請 企業価値136兆円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583512?source=rss",
      "publishedAt": "2026-06-08T23:38:39.000Z",
      "xQuery": "OpenAIがIPO申請 企業価値136兆円"
    },
    {
      "time": "07:38",
      "title": "公明政党要件失う可能性 合流検討",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583505?source=rss",
      "publishedAt": "2026-06-08T22:38:42.000Z",
      "xQuery": "公明政党要件失う可能性 合流検討"
    },
    {
      "time": "09:23",
      "title": "G阿部前監督を書類送検 暴行疑い",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583520?source=rss",
      "publishedAt": "2026-06-09T00:23:59.000Z",
      "xQuery": "G阿部前監督を書類送検 暴行疑い"
    },
    {
      "time": "08:59",
      "title": "世界初食道がんウイルス製剤 承認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6583515?source=rss",
      "publishedAt": "2026-06-08T23:59:26.000Z",
      "xQuery": "世界初食道がんウイルス製剤 承認"
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
