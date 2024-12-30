const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar las vistas
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile); // Si usas HTML puro
app.set('view engine', 'html');

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const routes = {
    '/': 'index.html',
    '/alquilar': 'alquilar.html',
    '/comprar': 'comprar.html',
    '/login': 'login.html',
    '/register': 'register.html',
    '/favoritos': 'favoritos.html',
    '/terms': 'terms.html',
    '/post1': 'post-1.html',
    '/post2': 'post-2.html',
    '/post3': 'post-3.html',
    '/post4': 'post-4.html',
    '/articulo': 'articulo.html'
};

Object.keys(routes).forEach(route => {
    app.get(route, (req, res) => {
        res.sendFile(path.join(__dirname, 'views', routes[route]));
    });
});



