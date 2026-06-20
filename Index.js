(function () {
  const card = document.getElementById("articleCard");
  const shareToggle = document.getElementById("shareToggle");
  const sharePopover = document.getElementById("sharePopover");
  const mobileShareBar = document.getElementById("mobileShareBar");
  const mobileClose = document.getElementById("mobileShareClose");

  function closeShare() {
    card.classList.remove("share-active");
    sharePopover.classList.remove("open");
    shareToggle.classList.remove("active");
    mobileShareBar.classList.remove("active");
  }

  function toggleShare(e) {
    e.stopPropagation();
    const isActive = card.classList.contains("share-active");

    if (isActive) {
      closeShare();
    } else {
      card.classList.add("share-active");

      if (window.innerWidth >= 640) {
        sharePopover.classList.add("open");
        shareToggle.classList.add("active");
      } else {
        mobileShareBar.classList.add("active");
      }
    }
  }

  shareToggle.addEventListener("click", toggleShare);
  mobileClose.addEventListener("click", function (e) {
    e.stopPropagation();
    closeShare();
  });

  document.addEventListener("click", function (e) {
    if (card.contains(e.target)) return;
    if (card.classList.contains("share-active")) {
      closeShare();
    }
  });

  window.addEventListener("resize", function () {
    const isActive = card.classList.contains("share-active");
    if (!isActive) return;

    if (window.innerWidth >= 640) {
      mobileShareBar.classList.remove("active");
      sharePopover.classList.add("open");
      shareToggle.classList.add("active");
    } else {
      sharePopover.classList.remove("open");
      shareToggle.classList.remove("active");
      mobileShareBar.classList.add("active");
    }
  });

  //close popover when social links are clicked.
  document
    .querySelectorAll(".share-links a, .share-popover a")
    .forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        closeShare();
      });
    });

  //Initial state: If mobile, ensure popover hidden
  if (window.innerWidth < 640) {
    sharePopover.classList.remove("open");
    shareToggle.classList.remove("active");
  }
})();
