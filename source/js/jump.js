if (window.location.pathname.substr(-1) === '/') {
    const newUrl = window.location.origin + window.location.pathname.slice(0, -1);
    window.location.replace(newUrl);
  }