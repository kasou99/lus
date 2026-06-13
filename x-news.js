window.LUS_X_NEWS = {
  "updatedAt": "2026-06-13T06:51:03.444Z",
  "items": [
    {
      "time": "15:32",
      "title": "米軍 ベネズエラ犯罪組織幹部殺害",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584082?source=rss",
      "publishedAt": "2026-06-13T06:32:30.000Z",
      "xQuery": "米軍 ベネズエラ犯罪組織幹部殺害"
    },
    {
      "time": "14:22",
      "title": "異常現象 北大西洋「冷たい斑点」",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584076?source=rss",
      "publishedAt": "2026-06-13T05:22:14.000Z",
      "xQuery": "異常現象 北大西洋「冷たい斑点」"
    },
    {
      "time": "15:27",
      "title": "街頭インタ動画で中傷被害 提訴",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584083?source=rss",
      "publishedAt": "2026-06-13T06:27:53.000Z",
      "xQuery": "街頭インタ動画で中傷被害 提訴"
    },
    {
      "time": "14:32",
      "title": "物件高×金利高 ローンの地殻変動",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584079?source=rss",
      "publishedAt": "2026-06-13T05:32:11.000Z",
      "xQuery": "物件高×金利高 ローンの地殻変動"
    },
    {
      "time": "15:11",
      "title": "「中本」のため退職 毎日通う56歳",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6584081?source=rss",
      "publishedAt": "2026-06-13T06:11:23.000Z",
      "xQuery": "「中本」のため退職 毎日通う56歳"
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
