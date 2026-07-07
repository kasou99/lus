window.LUS_X_NEWS = {
  "updatedAt": "2026-07-07T12:21:07.731Z",
  "items": [
    {
      "time": "20:41",
      "title": "自維 定数削減法案成立見送り確認",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587097?source=rss",
      "publishedAt": "2026-07-07T11:41:33.000Z",
      "xQuery": "自維 定数削減法案成立見送り確認"
    },
    {
      "time": "18:12",
      "title": "西太平洋展開する艦艇 中国正当化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587073?source=rss",
      "publishedAt": "2026-07-07T09:12:01.000Z",
      "xQuery": "西太平洋展開する艦艇 中国正当化"
    },
    {
      "time": "18:58",
      "title": "立花孝志被告の保釈 地裁が認めず",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587083?source=rss",
      "publishedAt": "2026-07-07T09:58:31.000Z",
      "xQuery": "立花孝志被告の保釈 地裁が認めず"
    },
    {
      "time": "20:01",
      "title": "全東信破産 融資焦げ付きの恐れも",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587090?source=rss",
      "publishedAt": "2026-07-07T11:01:10.000Z",
      "xQuery": "全東信破産 融資焦げ付きの恐れも"
    },
    {
      "time": "20:48",
      "title": "ぐんまパスポート申請殺到 抽選に",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6587098?source=rss",
      "publishedAt": "2026-07-07T11:48:31.000Z",
      "xQuery": "ぐんまパスポート申請殺到 抽選に"
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
