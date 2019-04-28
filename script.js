if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then((reg) => { console.log('se registro sw ok', reg) })
        .catch((err) => { console.warn('Error al registrar sw', err) })
}