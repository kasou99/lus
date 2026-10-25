window.LUS_X_NEWS = {
  "updatedAt": "2026-10-25T05:16:17.000Z",
  "items": [
    {
      "time": "12:30",
      "title": "10月FOMCは金利据え置きか 焦点",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600038?source=rss",
      "publishedAt": "2026-10-25T03:30:33.000Z",
      "xQuery": "10月FOMCは金利据え置きか 焦点"
    },
    {
      "time": "11:24",
      "title": "オバマ氏 トランプ政権を痛烈批判",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600025?source=rss",
      "publishedAt": "2026-10-25T02:24:45.000Z",
      "xQuery": "オバマ氏 トランプ政権を痛烈批判"
    },
    {
      "time": "12:27",
      "title": "AIに暴言を吐く行為 識者らの見解",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600040?source=rss",
      "publishedAt": "2026-10-25T03:27:26.000Z",
      "xQuery": "AIに暴言を吐く行為 識者らの見解"
    },
    {
      "time": "11:39",
      "title": "美容室の倒産高水準 競争で二極化",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600033?source=rss",
      "publishedAt": "2026-10-25T02:39:16.000Z",
      "xQuery": "美容室の倒産高水準 競争で二極化"
    },
    {
      "time": "13:43",
      "title": "妊娠中にがん宣告 選択迫られた母",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6600042?source=rss",
      "publishedAt": "2026-10-25T04:43:58.000Z",
      "xQuery": "妊娠中にがん宣告 選択迫られた母"
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
