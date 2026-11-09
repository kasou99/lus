window.LUS_X_NEWS = {
  "updatedAt": "2026-11-09T05:13:20.496Z",
  "items": [
    {
      "time": "13:58",
      "title": "26年の熊本地震 初の災害関連死",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601907?source=rss",
      "publishedAt": "2026-11-09T04:58:11.000Z",
      "xQuery": "26年の熊本地震 初の災害関連死"
    },
    {
      "time": "12:32",
      "title": "都心は真冬並みの寒さ 寒暖差注意",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601903?source=rss",
      "publishedAt": "2026-11-09T03:32:38.000Z",
      "xQuery": "都心は真冬並みの寒さ 寒暖差注意"
    },
    {
      "time": "13:48",
      "title": "採決直前に退席 石破氏が理由説明",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601906?source=rss",
      "publishedAt": "2026-11-09T04:48:18.000Z",
      "xQuery": "採決直前に退席 石破氏が理由説明"
    },
    {
      "time": "12:05",
      "title": "三井化学がJSR買収 1兆8400億円",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601897?source=rss",
      "publishedAt": "2026-11-09T03:05:24.000Z",
      "xQuery": "三井化学がJSR買収 1兆8400億円"
    },
    {
      "time": "13:19",
      "title": "山林の遺体 監禁後まもなく死亡か",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6601904?source=rss",
      "publishedAt": "2026-11-09T04:19:57.000Z",
      "xQuery": "山林の遺体 監禁後まもなく死亡か"
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
