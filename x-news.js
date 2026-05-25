window.LUS_X_NEWS = {
  "updatedAt": "2026-05-25T11:30:39.914Z",
  "items": [
    {
      "time": "19:34",
      "title": "首相 電気ガス代5千円支援の考え",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581663?source=rss",
      "publishedAt": "2026-05-25T10:34:27.000Z",
      "xQuery": "首相 電気ガス代5千円支援の考え"
    },
    {
      "time": "17:10",
      "title": "今週 雨でも真夏日の蒸し暑さ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581636?source=rss",
      "publishedAt": "2026-05-25T08:10:31.000Z",
      "xQuery": "今週 雨でも真夏日の蒸し暑さ"
    },
    {
      "time": "19:34",
      "title": "大学生集団暴行 法廷で暴行の音声",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581662?source=rss",
      "publishedAt": "2026-05-25T10:34:08.000Z",
      "xQuery": "大学生集団暴行 法廷で暴行の音声"
    },
    {
      "time": "20:09",
      "title": "「出ないとやばい」銀座異臭騒ぎ",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581667?source=rss",
      "publishedAt": "2026-05-25T11:09:37.000Z",
      "xQuery": "「出ないとやばい」銀座異臭騒ぎ"
    },
    {
      "time": "19:39",
      "title": "三重の女性殺害疑い 義弟を逮捕",
      "source": "Yahoo!ニュース",
      "url": "https://news.yahoo.co.jp/pickup/6581658?source=rss",
      "publishedAt": "2026-05-25T10:39:32.000Z",
      "xQuery": "三重の女性殺害疑い 義弟を逮捕"
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
