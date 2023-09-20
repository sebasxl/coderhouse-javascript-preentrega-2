// NEcesitamos tener la consola abierta solo para ver el menu 
// que se imprime cuando se está realizando el pedido


// Primero necesito un array de objetos para el menu de comidas

const menuComidas = [
    { id: 1, orden: "Pizza de Muzarella", precio: 1200 },
    { id: 2, orden: "Pizza Napolitana", precio: 2900 },
    { id: 3, orden: "Pizza de Fugazeta", precio: 2500 },
    { id: 4, orden: "Pizza jamon y morron", precio: 2700 },
    { id: 5, orden: "Milanesa Napolitana con papas fritas", precio: 4200 },
    { id: 6, orden: "Fideos con Bolognesa", precio: 2900 },
    { id: 7, orden: "Ravioles con estofado", precio: 2700 },
    { id: 8, orden: "Parrillada para 2", precio: 10000 },
    { id: 9, orden: "Pollo al spiedo con fritas", precio: 5000 },
    { id: 10, orden: "Trucha arco iris con ensalada", precio: 4200 },
    { id: 11, orden: "Hamburguesa doble cheddar doble carne", precio: 2500 },
]

// Otro array de objetos para el menu de bebidas
const menuBebidas = [
    { id: 1, orden: "Agua sin gas", precio: 900 },
    { id: 2, orden: "Agua con gas", precio: 900 },
    { id: 3, orden: "Exprimido de naranja", precio: 1200 },
    { id: 4, orden: "Limonada, menta y jengibre en jarra", precio: 2000 },
]


// Otro array de objetos para el menu de postres
const menuPostres = [
    { id: 1, orden: "Flan con dulce de leche", precio: 1400 },
    { id: 2, orden: "Volcan de chocolate", precio: 2000 },
    { id: 3, orden: "Ensalada de frutas", precio: 1500 },
    { id: 4, orden: "Tiramisú", precio: 2900 },
    { id: 5, orden: "Nada", precio: 0 },
]
// Este array va a ir guardando las mesas que se van abriendo
const mesasAbiertas = [];

// Necesito una función para abrir la mesa y ver cuantos comensales son
function abrirMesa() {
    const numeroMesa = parseInt(prompt("Ingrese el número de mesa:"));
    const comensalesPorMesa = parseInt(prompt("Ingrese la cantidad de comensales:"));
    mesasAbiertas.push({ numeroMesa, comensalesPorMesa });
    alert(`Mesa ${numeroMesa} abierta para ${comensalesPorMesa} comensales.`);
}

// Función para tomar un pedido en una mesa
function tomarPedido() {
    const numeroMesa = parseInt(prompt("Ingrese el número de mesa:"));
    const categoria = prompt("Ingrese la categoría del menú (comidas, bebidas, postres):");

    let menuSeleccionado;

    if (categoria === "comidas") {
        menuSeleccionado = menuComidas;
    } else if (categoria === "bebidas") {
        menuSeleccionado = menuBebidas;
    } else if (categoria === "postres") {
        menuSeleccionado = menuPostres;
    } else {
        alert("Categoría de menú no válida.");
        return;
    }

    if (!menuSeleccionado) {
        alert("Categoría de menú no encontrada.");
        return;
    }

    // Voy imprimiendo el menú por consola para saber cuales son los IDs existentes
    console.log(`-- Menú de ${categoria} --`);
    for (let i = 0; i < menuSeleccionado.length; i++) {
        const item = menuSeleccionado[i];
        console.log(`ID: ${item.id}, Orden: ${item.orden}, Precio: $${item.precio}`);
    }
    

    const idOrden = parseInt(prompt("Ingrese el ID del producto del menú:"));
    const cantidad = parseInt(prompt("Ingrese la cantidad:"));

    // Buscar la mesa por su número en mesasAbiertas
    const mesa = buscarMesaPorNumero(numeroMesa);
    if (!mesa) {
        alert("Mesa no encontrada.");
        return;
    }

    // Buscar el elemento en el menú
    let elementoMenu;

    // Como transformo estos tres for en una funcion para no repetir el código?
    // Tarea para la próxima preentrega
    if (categoria === "comidas") {
        for (let i = 0; i < menuComidas.length; i++) {
            const item = menuComidas[i];
            if (item.id === idOrden) {
                elementoMenu = item;
                break;
            }
        }
    } else if (categoria === "bebidas") {
        for (let i = 0; i < menuBebidas.length; i++) {
            const item = menuBebidas[i];
            if (item.id === idOrden) {
                elementoMenu = item;
                break;
            }
        }
    } else if (categoria === "postres") {
        for (let i = 0; i < menuPostres.length; i++) {
            const item = menuPostres[i];
            if (item.id === idOrden) {
                elementoMenu = item;
                break;
            }
        }
    } else {
        alert("Categoría de menú no válida.");
        return;
    }
    if (!elementoMenu) {
        alert("Elemento del menú no encontrado.");
        return;
    }

    if (!mesa.pedido) {
        mesa.pedido = [];
    }
    
    // Agregar el pedido a la mesa si se encuentra en el menú
    mesa.pedido.push({ orden: elementoMenu.orden, cantidad, precio: elementoMenu.precio });
    alert(`Pedido de ${cantidad}x ${elementoMenu.orden} agregado a mesa ${numeroMesa}.`);
}

// Función para cerrar una mesa y calcular la cuenta
function cerrarMesa() {
    const numeroMesa = parseInt(prompt("Ingrese el número de mesa:"));
    const mesa = buscarMesaPorNumero(numeroMesa);

    if (!mesa) {
        alert("Mesa no encontrada.");
        return;
    }

    const total = calcularTotalMesa(mesa);
    mesasAbiertas.splice(mesasAbiertas.indexOf(mesa), 1); // Eliminar la mesa de mesasAbiertas
    alert(`Mesa ${numeroMesa} cerrada. Total a pagar: $${total}.`);
}

// Función para buscar una mesa por número en el array de mesas abiertas
function buscarMesaPorNumero(numero) {
    for (let i = 0; i < mesasAbiertas.length; i++) {
        const mesa = mesasAbiertas[i];
        if (mesa.numeroMesa === numero) {
            return mesa; // Devuelve la mesa si se encuentra
        }
    }
    return null;
}

// Función para calcular el total de una mesa
function calcularTotalMesa(mesa) {
    let total = 0;
    for (let i = 0; i < mesa.pedido.length; i++) {
        const pedidoItem = mesa.pedido[i];
        total += pedidoItem.precio * pedidoItem.cantidad;
    }
    return total;
}


// Esta función muestra las mesas abiertas. 
function verMesasAbiertas() {
    // Quería usar if(!mesasAbiertas) pero no se como usarlo, aún no me funciona
    if (mesasAbiertas.length === 0) {
        alert("No hay mesas abiertas.");
        return;
    }

    for (let i = 0; i < mesasAbiertas.length; i++) {
        const mesa = mesasAbiertas[i];
        let mensaje = `Mesa ${mesa.numeroMesa}:`;
        if (mesa.pedido.length === 0) {
            mensaje += " Sin pedidos";
        } else {
            for (let j = 0; j < mesa.pedido.length; j++) {
                const pedidoItem = mesa.pedido[j];
                mensaje += `\n  - ${pedidoItem.cantidad}x ${pedidoItem.orden}`;
            }
        }
        alert(mensaje);
    }
}

// Finalmente, el menú principal
let salir = false;
while (!salir) {
    const opcion = parseInt(prompt("Seleccione una opción:\n1. Abrir mesa\n2. Tomar pedido\n3. Cerrar mesa\n4. Ver mesas abiertas\n5. Salir"));

    if (opcion === 1) {
        abrirMesa();
    } else if (opcion === 2) {
        tomarPedido();
    } else if (opcion === 3) {
        cerrarMesa();
    } else if (opcion === 4) {
        verMesasAbiertas();
    } else if (opcion === 5) {
        alert("Saliendo del sistema.");
        salir = true;
    } else {
        alert("Opción no válida. Por favor, elija una opción válida.");
    }
}
