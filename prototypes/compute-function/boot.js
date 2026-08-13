(async () => {
  try {
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
