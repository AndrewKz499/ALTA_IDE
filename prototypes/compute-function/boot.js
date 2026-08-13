(async () => {
  try {
    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => reject(new Error('Не удалось загрузить ' + src));
      document.head.appendChild(script);
    });

    window.__ALTA_PAYLOAD = '';

    for (let part = 1; part <= 5; part += 1) {
      await loadScript(`payload-${part}.js?v=project-build-2`);
    }

    const binary = atob(window.__ALTA_PAYLOAD || '');
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    const html = await new Response(stream).text();

    document.open();
    document.write(html);
    document.close();
  } catch (error) {
    document.body.textContent = 'Не удалось открыть прототип: ' + error.message;
    console.error(error);
  }
})();
