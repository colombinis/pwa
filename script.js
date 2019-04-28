if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => { console.log('se registro sw ok', reg) })
            .catch((err) => { console.warn('Error al registrar sw', err) })
    });
}


if (window.Notification ) {
    debugger
    Notification.requestPermission(status => {
        console.log('requestPermission - status',status);
        const n = new Notification('My Titulo',{
            body:'Sera la notificacion ? :)',
            icon:'./img/ico_36.png'
        });
    });
}