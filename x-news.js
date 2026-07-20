window.LUS_X_NEWS = {
  "updatedAt": "2026-07-20T04:45:37.877Z",
  "items": [
    {
      "time": "11:31",
      "title": "東京都心で今年初の猛暑日 警戒を",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588609?source=rss",
      "publishedAt": "2026-07-20T02:31:03.000Z",
      "xQuery": "東京都心で今年初の猛暑日 警戒を"
    },
    {
      "time": "11:15",
      "title": "不法残留の外国人摘発 職員増員へ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588608?source=rss",
      "publishedAt": "2026-07-20T02:15:45.000Z",
      "xQuery": "不法残留の外国人摘発 職員増員へ"
    },
    {
      "time": "12:27",
      "title": "海水浴場で10歳死亡 海中で発見",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588616?source=rss",
      "publishedAt": "2026-07-20T03:27:30.000Z",
      "xQuery": "海水浴場で10歳死亡 海中で発見"
    },
    {
      "time": "12:30",
      "title": "運営もう無理 酷暑で海水浴離れ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588617?source=rss",
      "publishedAt": "2026-07-20T03:30:38.000Z",
      "xQuery": "運営もう無理 酷暑で海水浴離れ"
    },
    {
      "time": "13:10",
      "title": "今年の夏はウナギが値下がり なぜ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6588621?source=rss",
      "publishedAt": "2026-07-20T04:10:20.000Z",
      "xQuery": "今年の夏はウナギが値下がり なぜ"
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
