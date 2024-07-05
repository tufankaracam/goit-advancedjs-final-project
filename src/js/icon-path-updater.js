export function setIconPaths(container) {
  const isDeployed = window.location.hostname !== 'localhost';
  const basePath = isDeployed ? '/goit-advancedjs-final-project' : '';
  container.querySelectorAll('use[href*="images/icons.svg"]').forEach(icon => {
    const currentHref = icon.getAttribute('href');
    icon.setAttribute('href', `${basePath}${currentHref}`);
  });
}

export function initIconPathObserver() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === 1) {
          setIconPaths(node);
        }
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  setIconPaths(document.body);
}
