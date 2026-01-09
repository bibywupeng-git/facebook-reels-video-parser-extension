const PLATFORM_NAME = "facebook";
const BUTTON_ATTRIBUTE = "data-grabclip-button";

// Button configuration constants
const PARAMS = {
  NORMAL: {
    size: "36px",
    svgSize: "24px",
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  },
  MINI: {
    size: "24px",
    svgSize: "16px",
    margin: {
      top: "0px",
      right: "8px",
      bottom: "0px",
      left: "16px",
    },
  },
};

// DOM selectors
const SELECTORS = {
  ACTION_BAR_SVG:
    'div[aria-expanded] svg path[d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm9-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"]',
  SLIDER_BAR: 'div[role="slider"][aria-orientation="horizontal"]',
};

class FacebookAnalyzer extends window.BaseAnalyzer {
  constructor() {
    super(PLATFORM_NAME);
    this.observer = null;
  }

  isVideoPage(url) {
    try {
      const supportedDomains = PLATFORM_INFO.domains;
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const pathname = parsedUrl.pathname;

      const isSupported = supportedDomains.some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
      );
      if (!isSupported) {
        return false;
      }

      // Check if URL contains reel or videos path with actual video ID
      const videoRegex = /\/(reel|videos)\/\d+/;
      return videoRegex.test(pathname);
    } catch (error) {
      console.error("Error checking Facebook video page:", error);
      return false;
    }
  }

  extractVideoPageInfo() {
    let curPageUrl = window.location.href;

    // If current URL isn't a video page, try to extract it from page elements
    if (!this.isVideoPage(curPageUrl)) {
      const videoIdElement = document.querySelector("div[data-video-id]");
      if (videoIdElement) {
        curPageUrl = `https://www.facebook.com/reel/${videoIdElement.dataset.videoId}`;
      }
    }

    return {
      platform: PLATFORM_NAME,
      url: curPageUrl,
    };
  }

  addButtonToReelPage() {
    const moreButtons = document.querySelectorAll(SELECTORS.ACTION_BAR_SVG);
    if (!moreButtons.length) {
      return;
    }

    moreButtons.forEach((moreButton) => {
      let container = moreButton.closest("div");

      while (container) {
        if (container.childElementCount > 2) {
          // Check if button already exists
          if (container.querySelector(`button[${BUTTON_ATTRIBUTE}]`)) {
            return;
          }

          // Create normal size button
          const button = this.createGrabClipButton(
            PLATFORM_INFO,
            PARAMS.NORMAL
          );
          // Add button at the first position
          container.insertBefore(button, container.firstChild);
          break;
        }
        container = container.parentElement;
      }
    });
  }

  addButtonToVideoPage() {
    const sliderBar = document.querySelector(SELECTORS.SLIDER_BAR);
    if (!sliderBar) {
      return;
    }

    const sliderBarParent = sliderBar.parentElement;
    if (!sliderBarParent) {
      return;
    }

    // Check if button already exists
    if (sliderBarParent.querySelector(`button[${BUTTON_ATTRIBUTE}]`)) {
      return;
    }

    // Create and add mini GrabClip button after slider bar
    const button = this.createGrabClipButton(PLATFORM_INFO, PARAMS.MINI);
    sliderBarParent.insertBefore(button, sliderBar.nextSibling);
  }

  addGrabClipButton() {
    console.log("FacebookAnalyzer addGrabClipButton");

    try {
      const url = window.location.href;

      if (url.includes("/reel/")) {
        this.addButtonToReelPage();
      } else if (url.includes("/videos/")) {
        this.addButtonToVideoPage();
      }
    } catch (error) {
      console.error("Error adding GrabClip button:", error);
    }
  }

  /**
   * 插入下载按钮
   * @returns {Promise<void>}
   */
  insertDownloadButton() {
    console.log("FacebookAnalyzer insertDownloadButton");

    // 初始添加按钮
    this.addGrabClipButton();

    // 配置观察器，设置需要观察的选择器
    this.configureObserver({
      selectors: [SELECTORS.ACTION_BAR_SVG, SELECTORS.SLIDER_BAR],
    });

    // 初始化MutationObserver以监听异步加载的内容
    this.initMutationObserver();
  }
}

// 导出到全局作用域
const PLATFORM_INFO = {
  name: PLATFORM_NAME,
  displayName: "Facebook",
  domains: ["facebook.com"],
  needCookie: false,
  analyzer: FacebookAnalyzer,
};
window.PLATFORMS = {
  ...window.PLATFORMS,
  [PLATFORM_NAME]: PLATFORM_INFO,
};
